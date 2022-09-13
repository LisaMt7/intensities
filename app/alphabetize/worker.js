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

const getAverageDistance = (box1, box2) => {
    const distance1 =distance.getAverage(box1[0], box2[0])
    const distance2 = distance.getAverage(box1[1], box2[1])
    const aveDist = (distance1 + distance2) / 2
    return aveDist
}


const createInfo = (data, {
    id,
    time,
    timeInSeconds,
    i,
    bin,
    instances,
    history,
    start,
    end,
    features
} = {}) => {

    time = time ?? {
        t: timeInSeconds,
        i,
    }


    const pattern = {
        id: id ?? Math.floor(100000*Math.random()),
        time,
        instances,
        bin,
        data,
        original: data,
        history: history ?? [],
        start,
        end,
        features: features ?? data
    }

    if (!instances) pattern.instances = [{info: pattern}]
    if(pattern.history.length === 0) pattern.history.push(data)
    return pattern

}

const getUpdate = (base, patterns, {
    maxDist,
    freqBin,
    startTime,
    bin,
    start,
    end
}) => {


    let features = base?.features ?? base?.slice ?? base
    if (base.slice) base = base.slice
    const original = base
    const hasInfo = !!original.data
    if (base.data) base = base.data

    const timeInSeconds = (Date.now() - startTime)/1000 // TODO: Why use this time?

    // Match All Patterns
    const matches = []
    const leftover = patterns.filter((o) => {

        if (!o.data) o = createInfo(o.slice ?? o, {
            i: o?.bin,
            start,
            end,
            bin: freqBin,
            features: o?.features
        }) // transform to pattern

        const dist = getAverageDistance(features, o.features)

        // console.log('Dist', dist, distNorm)

        if (dist < maxDist) {
            matches.push({
                distance: dist,
                info: o
            })
        } else return true
    })

    const pattern = (hasInfo) ? original : createInfo(base, {
        timeInSeconds,
        i: bin,
        bin: freqBin,
        start,
        end,
        features
    })

    if (matches.length > 0) pattern.instances.push(...matches.map(o => o.info.instances).flat())

    return {
        pattern,
        leftover
    }

}


const getFeatures = (data) => {
// -------- Background Subtraction ------------
const mapped = data.map(o => o.slice)

// let mean = []
// let stdev = []
// let min = []
// let max = []

// for (let person = 0; person < mapped[0].length; person++){
//     let datapoints = []
//     for (let i = 0; i < mapped.length; i++) {
//         mapped[i][person].forEach((data, freqBin) => {
//             if (!datapoints[freqBin]) datapoints[freqBin] = []
//             datapoints[freqBin].push(...data)
//         })
//     }

//     const bgValue = datapoints.map(bin => bin.reduce((a,b) => a+b, 0)/bin.length)
//     const stdevVal = datapoints.map((bin, i) => Math.sqrt(bin.reduce((a,b) => a+Math.pow((b - bgValue[i]),2), 0)/bin.length))

//     mean.push(bgValue)
//     stdev.push(stdevVal)
//     min.push(datapoints.map((bin, i) => Math.min(...bin) - bgValue[i]))
//     max.push(datapoints.map((bin, i) => Math.max(...bin) - bgValue[i]))
// }

// console.log('Background', mean)
// console.log('Stdev', stdev)
// console.log('Min', min)
// console.log('Max', max)

// const norms = []
// const standards = []

// const features = mapped.map((people) => {
//     return people.map((frequencies, person) => {
//         return frequencies.map((data, freqBin) => {
//                 const minVal = min[person][freqBin]
//                 const maxVal = max[person][freqBin]
//                 return data.map((x) => {
//                     const norm = ((x - mean[person][freqBin]) - minVal) / (maxVal - minVal)
//                     // const standard = ((x - mean[person][freqBin])) / stdev[person][freqBin]
//                    return norm
//                  }) // abstract across time bins
//             })
//         })
// })

// console.log('Normalized Features', features)

const features = mapped
return features

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


    if (info.shuffle) historySlices = shuffle(historySlices) // shuffle to remove temporal bias

    // Derive Patterns
    // const allZeros = Array.from({ length: info.duration * info.freqWindow * people }, e => 0).join(',')

    // console.log('Freq', info.freqWindow, info.frequencies)
    const freqBins = (info.freqWindow) ? Array.from({length: Math.ceil(info.frequencies / info.freqWindow)}, (e,i) => i*info.freqWindow) : [0]
    
    
    // Compare bins in parallel
    const promises = freqBins.forEach((freqBin, i) => {


        const start = freqBin
        let end = freqBin + (info.freqWindow ?? info.frequencies) // might change to be smaller

        if (end > info.frequencies) end = info.frequencies
        // if (end < info.frequencies){

        const compareSelf = (array) => {

            let patterns = []

            const get = (arr) => {
                const o = arr[0]
                return getUpdate(o, arr.slice(1), {
                    maxDist: info.distanceMax,
                    freqBin,
                    startTime: info.startTime,
                    bin: o.bin,
                    start,
                    end
                })
            }


            // Recursively Iterate over the Leftover Array
            let leftover = array
            do {
                const tic = performance.now()

                const update = get(leftover)
                if (update.pattern) patterns.push(update.pattern)
                leftover = update.leftover
                const toc = performance.now()
                const ratio = (array.length - leftover.length)/array.length
                postMessage(['progress', ratio, toc-tic, patterns.length])
            } while (leftover.length > 0)

            return patterns
            }


            const match = (array) => {
                const matches = compareSelf(array)

                // Update Average and History
                return matches.map((o) => {
                    if (o.instances.length > 1){
                        o.data = matrix.average(...o.instances.map(o => o.info.data))
                        o.features = matrix.average(...o.instances.map(o => o.info.features))
                        o.history.push(o.data) // push new to history
                    }
                    return o
                })
            }


            let toCompare = historySlices.map((slice, i) => {
                return {
                    slice: Array.from({length: people}).map((_, i) => slice[i].map(xSlice => Array.from(xSlice).slice(start, end))),
                    bin: i
                }
            })
            console.log('toCompare', toCompare)

            const features = getFeatures(toCompare)
            features.forEach((o, i) => toCompare[i].features = o)

            let prevMatchCount = null
            do {
                prevMatchCount = toCompare.length
                toCompare = match(toCompare)
            } while (toCompare.length != prevMatchCount)
            
            const finalMatches = toCompare

            console.log('Final Matches', finalMatches, finalMatches.reduce((a,b) => a + b.instances.length, 0))

            // Register Matches
            finalMatches.forEach(o => {
                // if (biggerThan && !alphabetTooSmall) info.alphabet.delete(minKey)

                if (!info.alphabet.has(o.id)) patterns++

                info.alphabet.set(o.id, o.instances.length)
                info.alphabetData.set(o.id, o)

                info.changed = true

            })
        })

        // console.log('outer promises', promises)
        // await Promise.allSettled(promises)

    return info
}