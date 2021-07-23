const image = document.querySelector("img")
const title = document.getElementById("title")
const artist = document.getElementById("artist")
const music = document.querySelector('audio')
const progressContainer = document.getElementById("progress-container")
const progress = document.getElementById("progress")
const currentTimeEl = document.getElementById("current-time")
const durationEl = document.getElementById("duration")
const prevBtn = document.getElementById("prev")
const playBtn = document.getElementById("play")
const nextBtn = document.getElementById("next")


// Music
const songs = [
    {
        name: "departureHH",
        displayName: "HxH - Departure",
        artist: "Hunter x Hunter"
    },
    {
        name: "schalaTheme",
        displayName: "Schala - Chrono Trigger",
        artist: "Square Enix"
    },
    {
        name: "sleepingBeauty",
        displayName: "SleepBeauty - RE,Chronicles",
        artist: "Capcom Sound Team"
    },
    {
        name: "setFree",
        displayName: "Set Free - RE,CodeVeronica",
        artist: "Capcom Sound Team"
    }
]

// Check if a song is playing

let isPlaying = false

// Play 

function playSong() {
    isPlaying = true
    playBtn.classList.replace('fa-play','fa-pause')
    playBtn.setAttribute('title', "Pause")
    music.play()
}

// Pause

function pauseSong() {
    isPlaying = false
    playBtn.classList.replace('fa-pause','fa-play')
    playBtn.setAttribute("title", "Play")
    music.pause()
}

// Play or Pause

playBtn.addEventListener("click", () => (isPlaying? pauseSong(): playSong()))

// Update the DOM

function loadSong(song) {
    title.textContent = song.displayName
    artist.textContent = song.artist
    music.src = `music/${song.name}.mp3`
    image.src = `img/${song.name}.jpg`
}

// Current Song
let songIndex = 0

// Previous Song

function prevSong(){
    songIndex--
    if(songIndex < 0){
        songIndex = songs.length - 1
    }
    loadSong(songs[songIndex])
    playSong()
}

// Next Song

function nextSong(){
    songIndex++
    if(songIndex > songs.length - 1) {
        songIndex = 0
    }
    loadSong(songs[songIndex])
    playSong()
}

// On load - First song

loadSong(songs[songIndex]) 


// update progress and time
function updateProgressBar(e) {
    if(isPlaying) {
        const {duration, currentTime} = e.srcElement
        // updating the progress bar width
        const progressPercent = (currentTime/duration) * 100
        progress.style.width = `${progressPercent}%`
        // calc duration of music and display it
        const durationMinutes = Math.floor(duration / 60)
        let durationSeconds = Math.floor(duration % 60)

        if(durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`
        }
        
        // Duration delay to avoid NaN to be displayed
        if(durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`
        }
        durationEl.textContent = `${durationMinutes}:${durationSeconds}`

        // calc duration of music and display it
        const currentMinutes = Math.floor(currentTime / 60)
        let currentSeconds = Math.floor(currentTime % 60)
        if(currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`

    }
}


// Set the progress bar

function setProgressBar(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const {duration} = music
    // currentTime attr under audio el
    music.currentTime = (clickX / width) * duration 
}

// Event listeners

prevBtn.addEventListener("click", prevSong)
nextBtn.addEventListener("click", nextSong)
music.addEventListener("ended",nextSong)
music.addEventListener("timeupdate", updateProgressBar)

progressContainer.addEventListener("click", setProgressBar)