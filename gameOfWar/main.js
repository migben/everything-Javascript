const btn = document.getElementById("button")

btn.addEventListener('click', function(){

    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => console.log(data))
        
})



