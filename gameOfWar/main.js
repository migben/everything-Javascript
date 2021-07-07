const btn = document.getElementById("new-deck")
const btn2 = document.getElementById("draw-cards")
const cardDisplay = document.getElementById("cards")
const header = document.getElementById("header")
let deckId
const remainingText = document.getElementById("remaining")

function handleClick(){
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then(res => res.json())
    .then(data => {
        console.log(data)
        remainingText.textContent = `Remaining cards: ${data.remaining}`
        deckId = data.deck_id
    })
}

btn.addEventListener('click', handleClick)

btn2.addEventListener('click', () => {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then( res => res.json())
    .then( data => {
        // console.log(data)
        remainingText.textContent = `Remaining cards: ${data.remaining}`
        cardDisplay.children[0].innerHTML += `
            <img src="${data.cards[0].image}" class="card" alt="${data.cards[0].suit}">
        `

        cardDisplay.children[1].innerHTML += `
            <img src="${data.cards[1].image}" class="card" alt="${data.cards[1].suit}">
        `

        const winnerText = determineCardWinner(data.cards[0], data.cards[1])
        header.textContent = winnerText
    })
})


function determineCardWinner(card1, card2){
    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", 
    "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1ValueIndex = valueOptions.indexOf(card1.value)
    const card2ValueIndex = valueOptions.indexOf(card2.value)

    if(card1ValueIndex > card2ValueIndex){
        return "Card 1 Wins!"
    } else if(card1ValueIndex < card2ValueIndex) {
        return "Card 2 Wins!"
    } else {
        return "War!"
    }
}

