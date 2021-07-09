const author = document.getElementById("author")
const crypto = document.getElementById("crypto")
const cryptoTop = document.getElementById("crypto-top")
const time = document.getElementById("time")

// Open Weather Api https://openweathermap.org/api
// Unsplash API
// Crypto API
// info about getting local time with JS

fetch(`https://api.unsplash.com/photos/random?client_id=Ll4QDk_gTHAa6NddN02H2d6BemwOVx9hpU51i3J_F2I&orientation=landscape&query=nature`)
.then(res => res.json())
.then(data => {
    console.log(data)
    document.body.style.backgroundImage = `url(${data.urls.full})`
    author.textContent = `By ${data.user.name}`
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
            <p class="market">💵: $${data.market_data.current_price.usd}</p>
            <p class="market">💹: $${data.market_data.high_24h.usd}</p>
            <p class="market">📉: $${data.market_data.low_24h.usd}</p>
        `

    })
    .catch(err => console.log(err))


function getCurrentTime(){
    let today = new Date()
    time.textContent = `${today.getHours()}:${today.getMinutes()}`
}

setInterval(getCurrentTime,1000)