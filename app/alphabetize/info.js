var alphabetDiv = document.getElementById('alphabet');

const info = {
    secondsPerBin: undefined, // set with fft
    worker: {

    },

    updateLabels: () => {
      inputs.forEach(({el, variable, label}) => {
        if (label) el.innerHTML = label(info.worker[variable])
      })
    },

    createContainer: (key) => {
      
      const container = document.createElement('div')
      const canvas = document.createElement('canvas')
      canvas.width = 200
      canvas.height = 200
      const readout = document.createElement('div')
      const count = document.createElement('span')
      // container.classList.add('container')
      container.classList.add('letter')
  
      // Populate Container
      container.insertAdjacentElement('beforeend', count)
      container.insertAdjacentElement('beforeend', canvas)
      container.insertAdjacentElement('beforeend', readout)
  
      // Add Container to Alphabet List
      alphabetDiv.insertAdjacentElement('beforeend', container)
      info.containers[key] = {
        container,
        readout,
        count,
        canvas,
        context: canvas.getContext("2d")
      }
      return container
    },
    containers: {},
  }

  const durationRange = document.getElementById('duration')
    const freqWindowRange = document.getElementById('freqWindow')
    const fftRange = document.getElementById('ffts')
    const euclideanDistanceInput = document.getElementById('distance')
    const maximumFrequencyInput = document.getElementById('maxFreq')
    const minFrequencyInput = document.getElementById('minFreq')
    const shuffleSwitch = document.getElementById('shuffle')

    const inputs = [
        {el: durationRange, variable: 'duration', label: (val) => {
          if (info.secondsPerBin) {
            return `<span>${(info.secondsPerBin * val).toFixed(3)}s</span>`
          } else return '<span>In Bins</span>'
        }},
        {el: freqWindowRange, variable: 'freqWindow'},
        {el: fftRange, variable: 'maximumFFTs', allowUndefined: true},
        {el: euclideanDistanceInput, variable: 'distanceMax'},
        {el: maximumFrequencyInput, variable: 'maxFreq', allowUndefined: true},
        {el: minFrequencyInput, variable: 'minFreq', allowUndefined: true},
        {el: shuffleSwitch, variable: 'shuffle'}

    ]

    inputs.forEach(({el, variable, allowUndefined, label}) => {

        let immediate = true
        let input = el.shadowRoot.querySelector('visualscript-input')
        if (input) input = input.shadowRoot.querySelector('input')
        let val = parseInt(el.value ?? input?.value) 
        if (isNaN(val)) val = undefined
        info.worker[variable] = val
        if (label) el.innerHTML = label(val)

        if (!info.worker[variable]) {
            setTimeout(() => {
                let input = el.shadowRoot.querySelector('visualscript-input')
                if (input) input = input.shadowRoot.querySelector('input')
                let val = parseInt(input?.value)
                if (isNaN(val)) val = undefined
                info.worker[variable] = val
                if (label) el.innerHTML = label(val)
                immediate = false
            }, 100)
        }

        el.onInput = (ev) => {
            let val = parseInt(ev.target.value)
            if (isNaN(val)) val = undefined
            if (!immediate || (allowUndefined || val != undefined)) info.worker[variable] = val


            if (label) el.innerHTML = label(val)
        }
    })


    export default info