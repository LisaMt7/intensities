import heatmap from './heatmap.js'
import { spectrogram } from '../controls.js';

const visualize = (o, callback) => {

    if (o.worker.changed) {

        // Sort the alphabet
        const sorted = new Map([...o.worker.alphabet.entries()].sort((a, b) => b[1] - a[1]));

        let i = 0

        const maxToVisualize = 200

        if (sorted.length > maxToVisualize) console.warn(`Only visualizing ${maxToVisualize}/${sorted.length} patterns`)
        
        const shapes = []

        sorted.forEach((count, identifier) => {

            if (i < maxToVisualize){

            o.createContainer(i) // Create display container

            const container = o.containers[i]
            const boxInfo =  o.worker.alphabetData.get(identifier)
            heatmap(container, o.worker.frequencies, o.worker.duration, boxInfo);
            container.count.innerHTML = `<b>${boxInfo.times.length}:</b> ${boxInfo.frequencies[0].toFixed(0)}hz to ${boxInfo.frequencies[1].toFixed(0)}hz`

            const patternShapes = []
            boxInfo.times.forEach(info => {

                const shape = {
                    type: 'rect',
                    xref: 'x',
                    yref: 'y',
                    x0: info.i*o.worker.duration,
                    y0: boxInfo.bin,
                    x1: (info.i+1) * o.worker.duration,
                    y1: boxInfo.bin + o.worker.freqWindow,
                    opacity: 1,
                    line: {
                      width: 1,
                      color: 'gray'
                    },
                  }

                patternShapes.push(shape)
                shapes.push(shape)
            })

            // Add Interactivity to Shapes
            let selected = false
            container.canvas.onclick = () => {
                if (!selected) {
                    patternShapes.forEach(s => s.line.color = 'white')
                    spectrogram.Plotly.relayout(spectrogram.div, { shapes })
                    selected = true
                } else {
                    patternShapes.forEach(s => s.line.color = 'gray')
                    spectrogram.Plotly.relayout(spectrogram.div, { shapes })
                    selected = false
                }
            }
        
            // container.canvas.onmouseout = () => {
            //     patternShapes.forEach(s => s.line.color = 'white')
            //     spectrogram.Plotly.relayout(spectrogram.div, { shapes })
            // }

            i++
            if (callback instanceof Function) callback((i+1)/sorted.size)
        }
        })

        // Plot Update to Shapes
        const update = {
            // legend: {
            //   traceorder: 'reversed'
            // },
            shapes,
            // title: `${entryName}`,
            // dragmode: 'pan',
            xaxis: {
              rangemode: 'tozero',
            //   range: [0, 1500], // TODO: Set to 5 seconds
            //   rangeslider: {},
              title: {
                text: `Time (s)`,
                font: {
                  size: 12,
                  color: '#7f7f7f'
                }
              },
            },
            yaxis:  {
              domain: [0,1],
              // autorange: true,
              // showgrid: true,
              // zeroline: false,
              // showline: false,
              // autotick: false,
              // ticks: '',
              // showticklabels: false,
              // fixedrange: true,
              title: {
                text: `Frequency (Hz)`,
                font: {
                  size: 12,
                  color: '#7f7f7f'
                }
              }
            },
          }

          spectrogram.Plotly.relayout(spectrogram.div, update)
    }
  }


  export default visualize