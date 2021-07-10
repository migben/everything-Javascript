const author = document.getElementById("author")
const crypto = document.getElementById("crypto")
const cryptoTop = document.getElementById("crypto-top")
const time = document.getElementById("time")
const weather = document.getElementById("weather")
const zen = document.getElementById("zen")

// Open Weather Api https://openweathermap.org/api
// weather icons from the API https://openweathermap.org/weather-conditions
// Unsplash API
// Crypto API
// info about getting local time with JS
// -----------------------------------------------------
// random mantra message while idle - under the time
// random quote for the day - bottom center - hover to see author
// a todo list - right bottom corner
// focus task of the day. - under the time
// image catching | 1 image every 24 hours

// unsplash api
fetch(`https://api.unsplash.com/photos/random?client_id=Ll4QDk_gTHAa6NddN02H2d6BemwOVx9hpU51i3J_F2I&orientation=landscape&query=nature`)
.then(res => res.json())
.then(data => {
    // console.log(data)
    document.body.style.backgroundImage = `url(${data.urls.full})`
    author.textContent = `By ${data.user.name}`
    author.href =`${data.user.links.html}`
})
// .catch(err => {
//     document.body.style.backgroundImage = `
//         url(https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDE2NzA&ixlib=rb-1.2.1&q=80&w=1080)`
// })

fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
    .then(res => {
        if(!res.ok) {
            throw Error("Something went wrong")
        }
        return res.json()
    })
    .then(data => {
        cryptoTop.innerHTML = `
            <img src=${data.image.small} />
            <span>${data.name}</span>
        `
        
        crypto.innerHTML += `
            <p class="market" title="Current">💵: $${(data.market_data.current_price.usd).toFixed(3)}</p>
            <p class="market" title="Highest Today">💹: $${(data.market_data.high_24h.usd).toFixed(3)}</p>
            <p class="market" title="Lowest Today">📉: $${(data.market_data.low_24h.usd).toFixed(3)}</p>
        `

    })
    .catch(err => console.log(err))

// getting our time
function getCurrentTime(){
    let today = new Date()
    time.textContent = `${today.getHours()}:${(today.getMinutes()).toString().length == 1? "0"+(today.getMinutes()).toString() : today.getMinutes()}`
    
}

setInterval(getCurrentTime, 1000)

// getting the current weather

navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial&appid=94a74074c9c19af7d19a0c745c7e4f03`)
        .then(res => {
            if (!res.ok) {
                throw Error("Weather data not available")
            }
            return res.json()
        })
        .then(data => {
            weather.innerHTML = `
                <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt=${data.weather[0].description} title="${data.weather[0].description}">
                <p class="weather-temp">${Math.round(data.main.temp)}º</p>
                <p class="weather-city">${data.name}</p>
            `         
        })
        .catch(err => console.error(err))
})