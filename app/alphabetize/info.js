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

    createContainer: (key, parent=alphabetDiv, {width, height}) => {
      
      const container = document.createElement('div')
      const canvas = document.createElement('canvas')
      const baseSize = 200
      canvas.width = baseSize
      canvas.height = baseSize

      const ratio = width / baseSize
      canvas.style.width = `${width || 200}px`
      canvas.style.height = `${height || width || 200}px`
      container.style.fontSize = `${100*ratio}%`
      
      const readout = document.createElement('div')
      const count = document.createElement('span')
      // container.classList.add('container')
      container.classList.add('letter')

      const toggleable = document.createElement('div')
      const instances = document.createElement('div')
      const history = document.createElement('div')
      instances.style.display = history.style.display = "flex"
      instances.style.flexWrap = history.style.flexWrap = "wrap"

      toggleable.style.display = 'none'
      toggleable.insertAdjacentHTML('beforeend', `<h4>Instances</h4>`)
      toggleable.insertAdjacentElement('beforeend', instances)
      toggleable.insertAdjacentHTML('beforeend', `<h4>History</h4>`)
      toggleable.insertAdjacentElement('beforeend', history)

      // Populate Container
      container.insertAdjacentElement('beforeend', count)
      container.insertAdjacentElement('beforeend', canvas)
      container.insertAdjacentElement('beforeend', toggleable)
      container.insertAdjacentElement('beforeend', readout)

      // Add Interactivity
      let selected = false
      let baseContainerHTML
      canvas.onclick = () => {
          if (!selected) {
            toggleable.style.display = ""
              if (!baseContainerHTML) baseContainerHTML = count.innerHTML
              count.innerHTML = baseContainerHTML + ` <small>(shown)</small>`
              if (toggleable.onOpen) toggleable.onOpen()
              selected = true
          } else {
            toggleable.style.display = "none"
              count.innerHTML = baseContainerHTML
              if (toggleable.onClose) toggleable.onClose()
              selected = false
          }
      }
  
      // Add Container to Alphabet List
      parent.insertAdjacentElement('beforeend', container)
      info.containers[key] = {
        container,
        readout,
        count,
        canvas,
        toggleable,
        instances,
        history,
        context: canvas.getContext("2d")
      }
      
      return info.containers[key]
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
            if (val) return `<span>${(info.secondsPerBin * val).toFixed(3)}s</span>`
            else 'In Bins'
          } else return '<span>In Bins</span>'
        }},
        {el: freqWindowRange, variable: 'freqWindow', allowUndefined: true},
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