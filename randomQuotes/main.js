// https://quotes-react.netlify.app - get your inspirational quotes here.
const quoteContainer = document.getElementById("quote-container")
const quoteBtn = document.getElementById("new-quote")
const twitterBtn = document.getElementById("twitter")
const quoteText = document.getElementById("quote")
const authorText = document.getElementById("author")
let apiQuotes = []

// random new quote
function newQuote(){
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

    quoteText.textContent = quote.text
}

async function getQuotes(){
    const apiUrl = "https://quotes-react.netlify.app"
    try{
        const res = await fetch(apiUrl)
        apiQuotes = await res.json()
        newQuote()
    } catch(err) {
        // catch the error
        console.log(err)
    }
}


getQuotes()