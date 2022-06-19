var alphabetDiv = document.getElementById('alphabet');

const info = {
    worker: {

    },
    createContainer: (key) => {
      
      const container = document.createElement('div')
      const canvas = document.createElement('canvas')
      canvas.width = 200
      canvas.height = 200
      const readout = document.createElement('div')
      const count = document.createElement('h3')
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

    const inputs = [
        {el: durationRange, variable: 'duration'},
        {el: freqWindowRange, variable: 'freqWindow'},
        {el: fftRange, variable: 'maximumFFTs'},
        {el: euclideanDistanceInput, variable: 'distanceMax'},
        {el: maximumFrequencyInput, variable: 'maxFreq'}
    ]

    inputs.forEach(({el, variable}) => {
        let input = el.shadowRoot.querySelector('visualscript-input')
        if (input) input = input.shadowRoot.querySelector('input')
        info.worker[variable] = parseInt(el.value ?? input?.value ?? 0) // Samples

        if (!info.worker[variable]) {
            setTimeout(() => {
                let input = el.shadowRoot.querySelector('visualscript-input')
                if (input) input = input.shadowRoot.querySelector('input')
                info.worker[variable] = parseInt(input?.value)
                console.log('Variable', info.worker[variable], input)
            }, 100)
        }

        console.log('Variable', info.worker[variable], input)

        el.onInput = (ev) => {
            const val = parseInt(ev.target.value)
            if (val != undefined && !isNaN(val)) info.worker[variable] = val
            console.log('Variable', info.worker[variable])
        }
    })


    export default info