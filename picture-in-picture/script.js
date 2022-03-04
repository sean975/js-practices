const video = document.getElementById('video')
const button = document.getElementById('button')

//* prompt to select media screen, add to video and play
async function selectMediaStream() {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia()
    video.srcObject = mediaStream
    video.onloadedmetadata = () => video.play()
  } catch (e) {
    console.log('Error:', e)
  }
}

// on load
selectMediaStream()

button.addEventListener('click', async () => {
  //* disable button
  button.disabled = true

  //* start picture in picture
  await video.requestPictureInPicture()

  //* reset button
  button.disabled = false
})
