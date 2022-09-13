
import * as visualscript from "./visualscript/esm/index.js"
import './controls'
import * as controls from './controls'
import ripThroughFile from './ripThroughFile'

const showRealtime = false
const showVideo = true

  // Bypass the usual requirement for user action
  const start = document.getElementById('start')
  const runAnalysis = document.getElementById('runAnalysis')
  const audioInputSelect = document.getElementById('in')
  const audioOutputSelect = document.getElementById('out')
  const videoSelect = document.getElementById('video')
  var fileInput = document.getElementById('files');
  var videos = document.getElementById('videos');
  var analysesDiv = document.getElementById('analyses');
  var dataFeedDiv = document.getElementById('datafeed');

  if (!showRealtime && !showVideo) dataFeedDiv.style.display = 'none'


  const sourceRegistry = {}

  if (showRealtime){

  navigator.mediaDevices.enumerateDevices()
    .then(gotDevices)
  // .catch(errorCallback);

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
          // o.video.autoplay = true
        }

        if (o.video) o.video.ontimeupdate = (ev) => {

          // Update plot
          controls.updatePlotTime(o.video.currentTime)
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

  let canRun = true
  runAnalysis.onclick = async (ev) => {

    if (canRun){
    controls.audio.initializeContext()
    count = 0 // Reset count with new file...

    canRun = false // disable start button until complete

    for (let file of files) {
      const type = file.type.split('/')[0]
      let source, video;

      if (type === 'video'){
          video = document.createElement('video')
          video.src = URL.createObjectURL(file)
          source = controls.audio.context.createMediaElementSource(video);
          await ripThroughFile(file)
      } else source = await ripThroughFile(file);

      canRun = true

      if (!controls.file.started && showVideo){
        controls.audio.listen(true)
        if (video) videos.insertAdjacentElement('beforeend', video)
        controls.audio.addSource(source, (type) => addDisplay({video}, type))// Get Audio Features + Wire Audio Analysis + Create Display
        for (let key in sourceRegistry) {
          const video = sourceRegistry[key].video
          if (video) video.play() // Play video
        }
      }

      controls.file.started = true
    }
  }

  }

  fileInput.onChange = async (ev) => {
    files = ev.target.files
    controls.file.started = false
  }

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
      for (let key in sourceRegistry) sourceRegistry[key].video.play() // Play video
    })
  }

