// W3School DOM audio reference
// http://www.voicerss.org/sdk Text to speech API
// Joke API - https://sv443.net/jokeapi/v2/

const btn = document.getElementById("btn")
const audioElement = document.getElementById("audio")
// VoiceRSS Javascript SDK 

//  Disable/enable btn
function toggleBtn(){
    btn.disabled =  !btn.disabled
}

// key 0ebc91e02b094886bf22074053b00412

// Passing the joke to VoiceRss api
function tellMe(joke){
    VoiceRSS.speech({
        key: '0ebc91e02b094886bf22074053b00412',
        src: `${joke}`,
        hl: 'en-us',
        r: 0,
        c: "mp3",
        f: "44khz_16bit_stereo",
        ssml: false
    })
}

// Get jokes from joke api
async function getJokes(){
    let joke = ''
    const apiUrl = `https://v2.jokeapi.dev/joke/Programming,Dark,Spooky?blacklistFlags=religious&idRange=0-185`
    try {
        const res = await fetch(apiUrl)
        const data = await res.json()
        if(data.setup) {
            joke = `${data.setup} ... ${data.delivery}`
        } else {
            joke = data.joke
        }

        console.log(data)
        // Text to speech
        tellMe(joke)
        // disable btn
        toggleBtn()
    } catch(err){
        // Catch errors
        console.log(err)
    }
}

btn.addEventListener("click", getJokes)
audioElement.addEventListener("ended", toggleBtn)