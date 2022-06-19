
import  "./visualscript/index.js"
import './controls'
import * as controls from './controls'
import ripThroughFile from './ripThroughFile'

const showRealtime = false

  // Bypass the usual requirement for user action
  const start = document.getElementById('start')
  const runAnalysis = document.getElementById('runAnalysis')
  const audioInputSelect = document.getElementById('in')
  const audioOutputSelect = document.getElementById('out')
  const videoSelect = document.getElementById('video')
  var fileInput = document.getElementById('files');
  var videos = document.getElementById('videos');
  var analysesDiv = document.getElementById('analyses');


  if (showRealtime){


  navigator.mediaDevices.enumerateDevices()
    .then(gotDevices)
  // .catch(errorCallback);

  const sourceRegistry = {}

  // video.controls = true

  function gotDevices(deviceInfos) {
    for (var i = 0; i !== deviceInfos.length; ++i) {
      var deviceInfo = deviceInfos[i];
      var option = document.createElement('option');
      option.value = deviceInfo.deviceId;
      if (deviceInfo.kind === 'audioinput') {
        option.text = deviceInfo.label ||
          'Microphone ' + (audioInputSelect.options.length + 1);
        audioInputSelect.options = [...audioInputSelect.options, option]
      } else if (deviceInfo.kind === 'audiooutput') {
        option.text = deviceInfo.label || 'Speaker ' +
          (audioOutputSelect.options.length + 1);
        audioOutputSelect.options = [...audioOutputSelect.options, option]
      } else if (deviceInfo.kind === 'videoinput') {
        option.text = deviceInfo.label || 'Camera ' +
          (videoSelect.options.length + 1);
        videoSelect.options = [...videoSelect.options, option]
      }
    }
  }
} else {
  audioInputSelect.style.display = 'none'
  audioOutputSelect.style.display = 'none'
  videoSelect.style.display = 'none'
}

  const addDisplay = (input, type='stream') => {

    let o;

    if (type === 'stream'){
      o = spawnStreamDisplay(count, input)
      count++
    }

    return o

  }


  const spawnStreamDisplay = (count, o = {}) => {
        const container = document.createElement('div')
        container.classList.add('container')
        analysesDiv.insertAdjacentElement('beforeend', container)

        if (o.video){
          // Real-Time Input
          if (o.stream) {
            o.video.srcObject = o.stream
            o.video.controls = true
            o.video.muted = true // No volume on self
          } 
          else {
            o.video.controls = true
          }
          o.video.autoplay = true
        }

        
        sourceRegistry[count] = {
            container,
            video: o.video,
            stream: o.stream,
            spectrogram: new visualscript.streams.data.Spectrogram(),
        }

        container.insertAdjacentElement('beforeend', sourceRegistry[count].spectrogram)
        return sourceRegistry[count]
    }


  let count = 0
  let files = []

  runAnalysis.onclick = async (ev) => {
    controls.audio.initializeContext()
    count = 0 // Reset count with new file...

    for (let file of files) {
      const type = file.type.split('/')[0]
      let source, video;

      if (type === 'video'){
          video = document.createElement('video')
          video.src = URL.createObjectURL(file)
          source = controls.audio.context.createMediaElementSource(video);
          ripThroughFile(file)
      } else {
        source = await ripThroughFile(file);
      }

  
      if (showRealtime){
        if (video) videos.insertAdjacentElement('beforeend', video)
        controls.audio.addSource(source, (type) => addDisplay({video}, type))// Get Audio Features + Wire Audio Analysis + Create Display
      }
    }

  }

  fileInput.onChange = async (ev) => files = ev.target.files

  if (start) start.onClick = () => {

    start.parentNode.style.display = 'none'

    controls.audio.initializeContext()
    controls.audio.listen(false)

    navigator.mediaDevices.getUserMedia({
      audio: { deviceId: { exact: audioInputSelect.element.value } }, 
      video: { deviceId: { exact: videoSelect.element.value } }
    }).then((stream) => {
      const video = document.createElement('video')
      const microphone = controls.audio.context.createMediaStreamSource(stream);
      videos.insertAdjacentElement('beforeend', video)
      controls.audio.addSource(microphone, (type) => addDisplay({video, stream}, type))
    })
  }

