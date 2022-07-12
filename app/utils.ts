import * as controls from './controls'

export var freqToBin = (freq, hzPerBin) => Math.ceil((freq) / hzPerBin)



export const getFFTSubset = (baseFFTs, info) => {
    const maxFreqBin = freqToBin(info.worker.maxFreq, controls.hzPerBin())
    const minFreqBin = freqToBin(info.worker.minFreq, controls.hzPerBin())

    // console.log('maxFreqBin', maxFreqBin, info.worker, info.worker.maxFreq)

    const ffts = Object.assign({}, baseFFTs)
    const len = (ffts[0].length - 1)
    let maxFFTs = info.worker.maximumFFTs ?? len // Set as length when undefined

    for (let key in ffts) {

        // Slice the Data
        ffts[key] = ffts[key].slice(0, maxFFTs) // length
        if (maxFreqBin) ffts[key] = ffts[key].map(arr => arr.slice(0, maxFreqBin)) // max freq
        if (minFreqBin) ffts[key] = ffts[key].map(arr => arr.slice(minFreqBin)) // min freq
    }

    return ffts
}