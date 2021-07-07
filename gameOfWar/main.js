const btn = document.getElementById("new-deck")
const btn2 = document.getElementById("draw-cards")
const cardsDisplay = document.getElementById("cards")
let deckId

function handleClick(){
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then(res => res.json())
    .then(data => {
        console.log(data)
        deckId = data.deck_id
    })
}

btn.addEventListener('click', handleClick)

btn2.addEventListener('click', () => {
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    .then( res => res.json())
    .then( data => {
        console.log(data)
        cardsDisplay.innerHTML += `
            <img src="${data.cards[0].image}" alt="${data.cards[0].suit}" width="150" height="150">
            <img src="${data.cards[1].image}" alt="${data.cards[1].suit}" width="150" height="150">
        `
    })
})




