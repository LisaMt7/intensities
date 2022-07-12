import * as distance from './distance'
import * as matrix from './matrix'
import shuffle from './shuffle'

onmessage = async function (e) {
    const [msg, ...args] = e.data
    let res;
    if (msg === 'process'){
        res = await process(...args)
    } else {
        console.error('Unrecognized message in worker', msg)
    }

    postMessage(['done', res]);
}

async function process(arr, info) {

    if (!info.startTime) info.startTime = Date.now()
    info.changed = false // track changes

    const people = arr.length
    let patterns = 0

    const isArrays = !!arr[0].frequencies[0]?.length // Multiple frequency samples...

    // Nest frequencies into an array
    if (!isArrays) arr.forEach(o => o.frequencies = [o.frequencies])

    const firstPersonFreqs = arr[0].frequencies
    info.frequencies = firstPersonFreqs[0].length // Add frequency length

    // Organize history slices
    let historySlices = []
    firstPersonFreqs.forEach((_, i) => {
        if (info.history[0].length === info.duration) {
            historySlices.push(Object.assign({}, info.history))
            // info.history.forEach(histArr => histArr.shift()) // All overlap
            info.history = info.history.map(_ => []) // No overlap
        }

        arr.map(o => o.frequencies[i]).forEach((frequencies, person) => {
            if (!info.history[person]) info.history[person] = []
            info.history[person].push(frequencies)
        })
    })


    if (info.shuffle) historySlices = shuffle(historySlices)

    // Derive Patterns
    const promises = historySlices.forEach(async (historySlice, i) => {

            const tic = performance.now()
            // const allZeros = Array.from({ length: info.duration * info.freqWindow * people }, e => 0).join(',')

            console.log('Freq', info.freqWindow, info.frequencies)
            const freqBins = (info.freqWindow) ? Array.from({length: Math.ceil(info.frequencies / info.freqWindow)}, (e,i) => i*info.freqWindow) : [0]
            
            // Compare bins in parallel
            const promises = freqBins.forEach(async freqBin => {

                const start = freqBin
                let end = freqBin + (info.freqWindow ?? info.frequencies) // might change to be smaller

                if (!info.patterns[start]) info.patterns[start] = []
                const freqPatterns = info.patterns[start]

                if (end > info.frequencies) end = info.frequencies
                // if (end < info.frequencies){

                    let informativeBox = []

                    for (let i = 0; i < people; i++){
                        let infoBox = historySlice[i].map(xSlice => Array.from(xSlice).slice(start, end))
                        informativeBox.push(infoBox)
                    }

                    // if (allZeros !== informativeBox.flat().join(',')) {

                        const timeInSeconds = (Date.now() - info.startTime)/1000

                        let matches = false
                        // Match Patterns
                        freqPatterns.forEach(o => {
                            const averagePattern = o.average
                            const distance1 = distance.getAverage(informativeBox[0], averagePattern[0])
                            const distance2 = distance.getAverage(informativeBox[1], averagePattern[1])
                            const aveDist = (distance1 + distance2) / 2
                            if (aveDist < info.distanceMax) {
                                if (!matches) matches = [o]
                                else matches.push(o)
                            }
                        })

                        const noMatches = !matches
                        // if (matches.length > 1) console.log('More than one match!', matches)
                        if (noMatches) {
                            const pattern = {
                                id: Math.floor(100000*Math.random()),
                                times: [{
                                    t: timeInSeconds,
                                    i,
                                    // original: informativeBox
                                }],
                                bin: freqBin,
                                average: informativeBox
                            }
                            matches = [pattern]
                            freqPatterns.push(pattern)
                        } else {

                            matches.forEach(o => {
                                o.times.push({t: timeInSeconds, i, original: informativeBox})
                                o.average[0] = matrix.average(o.average[0], informativeBox[0])
                                o.average[1] = matrix.average(o.average[1], informativeBox[1])
                            })
                        }

                        matches.forEach(o => {

                        const len = o.times.length
                        // const values = Array.from(info.alphabet.values())
                        // const keys = Array.from(info.alphabet.keys())

                        // const min = Math.min(...values)
                        // const index = values.indexOf(min);
                        // const minKey = keys[index]

                        const alphabetTooSmall = true // info.alphabet.size < info.n
                        const biggerThan = true //len > min

                        if (
                            (len > 1) && ((alphabetTooSmall) || biggerThan)// || min === Infinity) // Must have more than one match
                        ) {

                            // if (biggerThan && !alphabetTooSmall) info.alphabet.delete(minKey)

                            if (!info.alphabet.has(o.id)) patterns++

                            info.alphabet.set(o.id, len)
                            info.alphabetData.set(o.id, {
                                average: o.average,
                                start,
                                end,
                                times: o.times,
                                bin: o.bin
                            })

                            info.changed = true

                        }
                    })
                    // }
                // }
                
            })

            // await Promise.allSettled(promises)
            const toc = performance.now()
            const ratio = (i + 1)/historySlices.length
            postMessage(['progress', ratio, toc-tic, patterns])
        })

        // console.log('outer promises', promises)
        // await Promise.allSettled(promises)

    return info
}