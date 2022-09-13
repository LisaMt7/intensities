import heatmap from './heatmap.js'
import { spectrogram, hzPerBin } from '../controls.js';

const visualize = (o, callback) => {

    if (o.worker.changed) {

      const freqInc = o.worker.freqWindow ?? o.worker.frequencies

        // Sort the alphabet
        const sorted = new Map([...o.worker.alphabet.entries()].sort((a, b) => b[1] - a[1]));

        let i = 0

        console.log('o.worker.alphabetData', o.worker.alphabetData)

        const maxToVisualize = 500

        if (sorted.length > maxToVisualize) console.warn(`Only visualizing ${maxToVisualize}/${sorted.length} patterns`)
        

        const create = (pattern, parentNode, info, callback) => {
            const container = o.createContainer(i, parentNode, info) // Create display container
            heatmap(container, o.worker.frequencies, o.worker.duration, pattern);
            const baseContainerText = (info.body) ? `<b>${info.header}:</b> ${info.body}` : `<b>${info.header}</b>`
            container.count.innerHTML = baseContainerText
            if (callback) callback(pattern, container)
            return container
          }

        const shapes = []
        sorted.forEach((count, identifier) => {

            if (i < maxToVisualize){

             const boxInfo =  o.worker.alphabetData.get(identifier)

              const container = create(boxInfo, undefined, {header: boxInfo.instances.length, body: `${boxInfo.frequencies[0].toFixed(0)}hz to ${boxInfo.frequencies[1].toFixed(0)}hz`}, (pattern, container) => {
                const patternShapes = []
                pattern.instances.forEach(instance => {

                    const shape = {
                        type: 'rect',
                        xref: 'x',
                        yref: 'y',
                        x0: (instance.info.time.i - 0.5)*o.worker.duration,
                        y0: pattern.bin,
                        x1: (instance.info.time.i+0.5) * o.worker.duration,
                        y1: pattern.bin + freqInc,
                        opacity: 1,
                        line: {
                          width: 1,
                          color: 'gray'
                        },
                      }

                    patternShapes.push(shape)
                    shapes.push(shape)
                })

                // Add Interactivity
                let created = false
                container.toggleable.onOpen = () =>{
                      if (created === false)  {

                        // Show List of Instances
                        pattern.instances.forEach(o =>  {
                          create(o.info, container.instances, {
                          header: `${o.info.time.t.toFixed(2)}s`,
                          body: o.distance ? o.distance.toFixed(1) : '',
                          width: 75,
                          height: 75
                        })
                      })

                        if (pattern.history) pattern.history.forEach((data, i) =>  create({
                          ...pattern,
                          data,
                        }, container.history, {
                          header: i,
                          width: 75,
                          height: 75
                        }))

                        created = true
                      }
                      patternShapes.forEach(s => s.line.color = 'white')
                      spectrogram.Plotly.relayout(spectrogram.div, { shapes })
                }

                container.toggleable.onClose = () =>{
                        patternShapes.forEach(s => s.line.color = 'gray')
                        spectrogram.Plotly.relayout(spectrogram.div, { shapes })
                }

                // container.canvas.onmouseout = () => {
                //     patternShapes.forEach(s => s.line.color = 'white')
                //     spectrogram.Plotly.relayout(spectrogram.div, { shapes })
                // }

                i++
                if (callback instanceof Function) callback((i+1)/sorted.size)
            // } //else console.log('SKIPPING')
          })
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