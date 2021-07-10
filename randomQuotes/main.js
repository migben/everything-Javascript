// https://quotes-react.netlify.app - get your inspirational quotes here.
const quoteContainer = document.getElementById("quote-container")
const quoteBtn = document.getElementById("new-quote")
const twitterBtn = document.getElementById("twitter")
const quoteText = document.getElementById("quote")
const authorText = document.getElementById("author")
const loader = document.getElementById("loader")
let apiQuotes = []

// Show loading animation
function loading(){
    loader.hidden = false
    quoteContainer.hidden = true
}

// hide the loading animation
function complete(){
    quoteContainer.hidden = false
    loader.hidden = true
}

// random new quote
function newQuote(){
    loading()
    // pick random quote from API
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    // verify if author is blank
    if(!quote.author) {
        authorText.textContent = "Unknown"
    } else{
        authorText.textContent = quote.author
    }
    
    // check length to determine styling
    if(quote.text.length > 100) {
        quoteText.classList.add("long-quote")
    } else {
        quoteText.classList.remove("long-quote")
    }
    // Set new quote & hide the loader after setting
    quoteText.textContent = quote.text
    complete() // hides the loading animation
}

async function getQuotes(){
    loading()
    const apiUrl = "https://type.fit/api/quotes/?method=getQuote&lang=en&format=json"
    try{
        const res = await fetch(apiUrl)
        apiQuotes = await res.json()
        newQuote()
    } catch(err) {
        // catch the error
        console.log(err)
    }
}

// https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/guides/web-intent
//  Twitter - Web Intent URL for btns (TWeet a quote)

function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
    window.open(twitterUrl, "_blank")
}

//  event listener
quoteBtn.addEventListener("click", newQuote)
twitterBtn.addEventListener("click", tweetQuote)


getQuotes()