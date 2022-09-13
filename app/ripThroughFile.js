import * as controls from './controls'
import * as alphabetize from "./alphabetize"
import { getFFTSubset } from './utils'


const fileFFTs = {}

var binToFreq = (bin, hzPerBin) => ((bin) * hzPerBin) // Lower frequency of bin


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
            info.secondsPerBin = fftInfo.data.duration / fftInfo.ffts[0].length
            info.updateLabels() // displaying seconds on duration control

            const len = (fftInfo.ffts[0].length - 1)
            let filePct = 0
            let fileLength = 0
            fileLength = fftInfo.data.duration
            let maxFFTs = info.worker.maximumFFTs ?? len // Set as length when undefined
            filePct = maxFFTs / len 
            
            const ffts = getFFTSubset(fftInfo.ffts, info)
            info.ffts = ffts[0].length // corrected length

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
                        <p><b>Last Comparison Time:</b> ${performanceAverage.toFixed(0)}ms</p>
                    </div>
                `
            }

            setOverlay()

            const tic = Date.now()
            delete info.startTime
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
                o.instances = o.instances.map(obj => {
                    obj.info.time.t = obj.info.time.i * info.secondsPerBin * info.worker.duration
                    return obj
                })

                // Map Bin to Frequency
                const freqInc = info.worker.freqWindow ?? info.worker.frequencies
                const firstFreq = info.worker.minFreq + binToFreq(o.bin, controls.hzPerBin())
                o.frequencies = [firstFreq, info.worker.minFreq + binToFreq(
                    o.bin + freqInc, // Add one to get the top frequency
                    controls.hzPerBin()
                )]
            })

            console.log('FFTs', ffts)
            if (!alreadyPlotted) await controls.plotData(ffts)

            alphabetize.visualize(info, (ratio) => {
                controls.overlayDiv.innerHTML = `<h3>Visualizing the alphabet</h3> - ${(100*ratio).toFixed(2)}%`
            })
                        
              controls.overlay.open = false
              
              if (type === 'audio'){
                const source = controls.audio.context.createBufferSource(); // Get audio to play in the AudioContext
                source.buffer = fftInfo.data;
                return source
              } else return
    };


export default ripThroughFile