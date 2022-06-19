import info from "./info"

const init = () => {

    info.worker.alphabet = new Map()
    info.worker.alphabetData = new Map()
    info.worker.patterns = {}
    info.worker.history = [[]]
    info.worker.frequencies = 0
    info.worker.n = 0

    for (let key in info.containers) info.containers[key].container.remove()
    info.containers = {}

    return info
}

export default init