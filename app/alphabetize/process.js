import workerInfo from './worker.js'

// const overlap = 0 // Percentage
const worker = new Worker(workerInfo);
let resolver = null
let workerCallback = null

worker.onmessage = function(e) {
    const [msg, ...data] = e.data
    if (msg === 'done' && resolver instanceof Function) {
        resolver(data)
        resolver = null
        workerCallback = null
    }
    else {
        if (workerCallback instanceof Function) workerCallback(msg, ...data)
    }
}


const processWithWorker = async (arr, info, callback) => {

    const workerOutput = await (new Promise((resolve, reject) => {
        resolver = resolve
        workerCallback = callback
        worker.postMessage(['process', arr, info.worker])
    }))

    if (workerOutput[0]) info.worker = workerOutput[0]

   return info
}



export default processWithWorker