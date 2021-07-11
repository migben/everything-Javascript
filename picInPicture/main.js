// Screen capture API from MDN
// https://developer.mozilla.org/en-US/docs/Web/API/Screen_Capture_API/Using_Screen_Capture
const vidElement = document.getElementById("video")
const btn = document.getElementById("btn")

// Prompt to select media stream, pass to video element.

async function selectMediaStream(){
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia()
        vidElement.srcObject = mediaStream
        vidElement.onloadeddata = () => {
            vidElement.play()
        }
    } catch (err){
        console.log("You have an error here: ", err)
    }
}

btn.addEventListener("click", async () => {
    // Disable Button
    btn.disabled = true
    // start pic in picture
    await vidElement.requestPictureInPicture()
    // reset button
    btn.disabled = false
})

// On load
selectMediaStream()