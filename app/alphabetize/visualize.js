import heatmap from './heatmap.js'
import { spectrogram, hzPerBin } from '../controls.js';

const visualize = (o, callback) => {

    if (o.worker.changed) {

      const freqInc = o.worker.freqWindow ?? o.worker.frequencies

        // Sort the alphabet
        const sorted = new Map([...o.worker.alphabet.entries()].sort((a, b) => b[1] - a[1]));

        let i = 0

        const maxToVisualize = 30

        if (sorted.length > maxToVisualize) console.warn(`Only visualizing ${maxToVisualize}/${sorted.length} patterns`)
        
        const shapes = []

        sorted.forEach((count, identifier) => {

            if (i < maxToVisualize){

            o.createContainer(i) // Create display container

            const container = o.containers[i]
            const boxInfo =  o.worker.alphabetData.get(identifier)
            heatmap(container, o.worker.frequencies, o.worker.duration, boxInfo);
            const baseContainerText = `<b>${boxInfo.times.length}:</b> ${boxInfo.frequencies[0].toFixed(0)}hz to ${boxInfo.frequencies[1].toFixed(0)}hz`
            container.count.innerHTML = baseContainerText

            const patternShapes = []
            boxInfo.times.forEach(info => {


              console.log('boxInfo.bin', boxInfo.bin, freqInc, boxInfo.bin + freqInc)
                const shape = {
                    type: 'rect',
                    xref: 'x',
                    yref: 'y',
                    x0: (info.i - 0.5)*o.worker.duration,
                    y0: boxInfo.bin,
                    x1: (info.i+0.5) * o.worker.duration,
                    y1: boxInfo.bin + freqInc,
                    opacity: 1,
                    line: {
                      width: 1,
                      color: 'gray'
                    },
                  }

                patternShapes.push(shape)
                shapes.push(shape)
            })


            // Show Times
            const list = document.createElement('ol')
            list.style.display = 'none'
            boxInfo.times.forEach(o => {
                const li = document.createElement('li')
                li.innerHTML = `${o.t.toFixed(4)}s`
                list.appendChild(li)
            })
            o.containers[i].canvas.insertAdjacentElement('afterend', list)


            // Add Interactivity to Shapes
            let selected = false
            container.canvas.onclick = () => {
                if (!selected) {
                    list.style.display = ""
                    patternShapes.forEach(s => s.line.color = 'white')
                    spectrogram.Plotly.relayout(spectrogram.div, { shapes })
                    container.count.innerHTML = baseContainerText + ` <small>(shown)</small>`
                    selected = true
                } else {
                  list.style.display = "none"
                    patternShapes.forEach(s => s.line.color = 'gray')
                    spectrogram.Plotly.relayout(spectrogram.div, { shapes })
                    container.count.innerHTML = baseContainerText
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

        const yTickRatio = 3
        const yTicks = Math.floor(o.worker.frequencies / yTickRatio)
        const xTicks = 40
        const xTickVals = Array.from({length: xTicks}, (v,i) => i*(o.ffts/xTicks))
        const xTickText = xTickVals.map((v, i) => (v * o.secondsPerBin).toFixed(2)) // in seconds
        const yTickVals = Array.from({length: yTicks}, (v,i) => i*yTickRatio) // in bins
        const yTickText = yTickVals.map((v, i) => (o.worker.minFreq + v * hzPerBin()).toFixed(2)) // in seconds


        const initialView = 100 * (o.ffts/xTicks) * o.secondsPerBin

        // Plot Update to Shapes
        const update = {
            // legend: {
            //   traceorder: 'reversed'
            // },
            shapes,
            // title: `${entryName}`,
            dragmode: 'pan',
            xaxis: {
              rangemode: 'tozero',
              tickvals: xTickVals,
              ticktext: xTickText, // 1/o.secondsPerBin
              range: [0, initialView],
              rangeslider: {},
              title: {
                text: `Time (s)`,
                font: {
                  size: 12,
                  color: '#7f7f7f'
                }
              },
            },
            yaxis:  {
              tickvals: yTickVals,
              ticktext: yTickText, // 1/o.secondsPerBin
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