import * as controls from './controls'
import * as alphabetize from "./alphabetize"


const fileFFTs = {}

var binToFreq = (bin, hzPerBin) => ((bin) * hzPerBin) // Lower frequency of bin
var freqToBin = (freq, hzPerBin) => Math.ceil((freq) / hzPerBin) // TODO: Check


const getFileFFT = (file) => {

    const type = file.type.split('/')[0]

    if (fileFFTs[file.name]) return fileFFTs[file.name]
    else {
        
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
    
        reader.onload = (ev) => {
        controls.overlay.open = true
    
          controls.overlayDiv.innerHTML = `<h3>Decoding audio data from ${type} file...</h3>`
          controls.audio.context.decodeAudioData(ev.target.result, (data) => {
    
            controls.overlayDiv.innerHTML = '<h3>Getting FFTs...</h3>'
            controls.audio.fft(data, null, async (o) => {
                fileFFTs[file.name] = {
                    ffts: o,
                    data
                }
                resolve(fileFFTs[file.name])
            })

        })
    }

    function handleEvent(event) {
        console.log(`${event.type}: ${event.loaded} bytes transferred\n`, event)
    
        if (event.type === "error") {
            reject(event)
            // preview.src = reader.result;
        }
    }
    

    // reader.addEventListener('loadstart', handleEvent);
    // reader.addEventListener('load', handleEvent);
    // reader.addEventListener('loadend', handleEvent);
    // reader.addEventListener('progress', handleEvent);
    reader.addEventListener('error', handleEvent);
    // reader.addEventListener('abort', handleEvent);

    reader.readAsArrayBuffer(file);

    })
}
}

const ripThroughFile = async (file) => {

    const type = file.type.split('/')[0]


    const alreadyPlotted = !!fileFFTs[file.name]
    const fftInfo = await getFileFFT(file)
    controls.overlay.open = true


            let info = alphabetize.init()
            const hzPerBin = (controls.audio.context.sampleRate) / (2 * controls.audio.analyser.frequencyBinCount);
            const fftWindowWidth = controls.audio.analyser.fftSize
            info.secondsPerBin = (fftWindowWidth)/fftInfo.data.sampleRate 
            info.updateLabels() // displaying seconds on duration control

            const maxFreqBin = freqToBin(info.worker.maxFreq, hzPerBin)
            const minFreqBin = freqToBin(info.worker.minFreq, hzPerBin)

            // console.log('maxFreqBin', maxFreqBin, info.worker, info.worker.maxFreq)

            const ffts = Object.assign({}, fftInfo.ffts)
            const len = (ffts[0].length - 1)

            let filePct = 0
            let fileLength = 0
            let maxFFTs = info.worker.maximumFFTs ?? len // Set as length when undefined

            console.log('info.worker.maximumFFTs', maxFFTs, len)

            for (let key in ffts) {
                
                // Get Data Slice Info
                filePct = maxFFTs / len
                console.log('filePct', filePct)

                fileLength = (len * fftWindowWidth)/fftInfo.data.sampleRate

                // Slice the Data
                ffts[key] = ffts[key].slice(0, maxFFTs) // length
                if (maxFreqBin) ffts[key] = ffts[key].map(arr => arr.slice(0, maxFreqBin)) // max freq
                if (minFreqBin) ffts[key] = ffts[key].map(arr => arr.slice(minFreqBin)) // min freq
            }


            // Get the Alphabet
            const arrInput = []
            const averageOver = 20
            const performanceArr = []

            for (let key in fftInfo.ffts) arrInput.push({frequencies: ffts[key]})

            const setOverlay = (ratio=0, performanceAverage=0, patterns=0) => {
                controls.overlayDiv.innerHTML = `
                    <div>
                        <h3>Deriving an alphabet <small>${(100*ratio).toFixed(2)}%</small></h3>
                        <small>${maxFFTs} FFTs | ${(fileLength*filePct).toFixed(1)}s of the file</small>
                        <p><b>Unique Patterns Found:</b> ${patterns}</p>
                        <p><b>Comparison Time per Duration:</b> ${performanceAverage.toFixed(0)}ms</p>
                    </div>
                `
            }

            setOverlay()

            const tic = Date.now()
            console.log('Passing', arrInput, info)
            info = await alphabetize.process(arrInput, info, (msg, ratio, performance, patterns) => {
                if (msg === 'progress') {
                    performanceArr.push(performance)
                    if (performanceArr.length > averageOver) performanceArr.shift(performance)
                    const performanceAverage = performanceArr.reduce((a,b) => a + b, 0) / performanceArr.length
                    setOverlay(ratio, performanceAverage, patterns)
                }
            })

            const toc = Date.now()



            console.log(`Got Alphabet in ${((toc-tic)/1000).toFixed(2)}s`, info.worker)

            // ------------------- Map Values to Meaningful File Info -------------------

            info.worker.alphabetData.forEach(o => {

                // Map to video time
                o.times = o.times.map(obj => {
                    obj.t = obj.i * info.secondsPerBin * info.worker.duration
                    return obj
                })

                // Map Bin to Frequency
                const firstFreq = binToFreq(minFreqBin + o.bin, hzPerBin)
                o.frequencies = [firstFreq, binToFreq(
                    minFreqBin + o.bin + info.worker.freqWindow, // Add one to get the top frequency
                    hzPerBin
                    )]
            })

            alphabetize.visualize(info, (ratio) => {
                controls.overlayDiv.innerHTML = `<h3>Visualizing the alphabet</h3> - ${(100*ratio).toFixed(2)}%`
            })
            
            console.log('FFTs', ffts)
             if (!alreadyPlotted) await controls.plotData(ffts)
            
              controls.overlay.open = false
              
              if (type === 'audio'){
                const source = controls.audio.context.createBufferSource(); // Get audio to play in the AudioContext
                source.buffer = data;
                return source
              } else return
    };


export default ripThroughFile