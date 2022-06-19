import heatmap from './heatmap.js'

const visualize = (o, callback) => {

    if (o.worker.changed) {

        // Sort the alphabet
        const sorted = new Map([...o.worker.alphabet.entries()].sort((a, b) => b[1] - a[1]));

        let i = 0

        const maxToVisualize = 200

        if (sorted.length > maxToVisualize) console.warn(`Only visualizing ${maxToVisualize}/${sorted.length} patterns`)
        
        sorted.forEach((count, identifier) => {

            if (i < maxToVisualize){
            o.createContainer(i) // Create display container
            const boxInfo =  o.worker.alphabetData.get(identifier)
            heatmap(o.containers[i], o.worker.frequencies, o.worker.duration, boxInfo);
            o.containers[i].count.innerHTML = `${count}`

            const freq = document.createElement('p')
            freq.innerHTML = `<b>Bin ${boxInfo.bin}:</b> (${boxInfo.frequencies[0].toFixed(0)} to ${boxInfo.frequencies[1].toFixed(0)} hz)`

            const header = document.createElement('small')
            header.innerHTML = '<b>Click to Show Times</b>'
            const list = document.createElement('ol')

            header.onclick = ()=>{
                if (list.style.display==="none") {
                    list.style.display = ""
                    header.innerHTML = '<b>Click to Hide Times</b>'
                }
                else {
                    list.style.display = "none"
                    header.innerHTML = '<b>Click to Show Times</b>'
                }
            }

            list.style.display = 'none'
            boxInfo.times.forEach(o => {
                const li = document.createElement('li')
                li.innerHTML = `${o.t.toFixed(4)}s`
                list.appendChild(li)
            })

            o.containers[i].readout.appendChild(freq)
            o.containers[i].readout.appendChild(header)
            o.containers[i].readout.appendChild(document.createElement('br'))
            o.containers[i].readout.appendChild(document.createElement('br'))
            o.containers[i].readout.appendChild(list)

            i++
            if (callback instanceof Function) callback((i+1)/sorted.size)
        }
        })
    }
  }


  export default visualize