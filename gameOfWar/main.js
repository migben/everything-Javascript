const newDeck = document.getElementById("new-deck") // new deck
const drawCard = document.getElementById("draw-cards") // draw cards
const cardDisplay = document.getElementById("cards")
const header = document.getElementById("header")
const remainingText = document.getElementById("remaining")
const computerScoreEl = document.getElementById("computer-score")
const myScoreEl = document.getElementById("player-score")
let computerScore = 0
let myScore = 0
let deckId

// api link => https://deckofcardsapi.com

function handleClick(){
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle")
    .then(res => res.json())
    .then(data => {
        console.log(data)
        remainingText.textContent = `Remaining cards: ${data.remaining}`
        deckId = data.deck_id
    })
}

newDeck.addEventListener('click', handleClick)

drawCard.addEventListener('click', () => {
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    .then( res => res.json())
    .then( data => {
        // console.log(data)
        remainingText.textContent = `Remaining cards: ${data.remaining}`
        cardDisplay.children[0].innerHTML = `
            <img src=${data.cards[0].image} class="card" alt=${data.cards[0].suit}>
        `

        cardDisplay.children[1].innerHTML = `
            <img src=${data.cards[1].image} class="card" alt=${data.cards[1].suit}>
        `

        const winnerText = determineCardWinner(data.cards[0], data.cards[1])
        header.textContent = winnerText

        if(data.remaining === 0){
            drawCard.disabled =  true 

            if (computerScore > myScore) {
                // display "The computer won the game!"
                header.textContent = "The computer won the game!"
            } else if (myScore > computerScore) {
                // display "You won the game!"
                header.textContent = "You won the game!"
            } else {
                // display "It's a tie game!"
                header.textContent = "It's a tie game!"
            }
        }
    })
})


function determineCardWinner(card1, card2){
    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", 
    "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1ValueIndex = valueOptions.indexOf(card1.value)
    const card2ValueIndex = valueOptions.indexOf(card2.value)

    if(card1ValueIndex > card2ValueIndex){
        computerScore++
        computerScoreEl.textContent = `Computer score: ${computerScore}`
        return "Computer Wins!"
    } else if(card1ValueIndex < card2ValueIndex) {
        myScore++
        myScoreEl.textContent = `Player score: ${myScore}`
        return "Player Wins!"
    } else {
        return "War!"
    }
}

