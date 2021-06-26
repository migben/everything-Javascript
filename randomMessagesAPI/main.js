const btn = document.getElementById('activity')
const idea = document.getElementById('idea')

btn.addEventListener('click',function(){
    fetch('https://www.boredapi.com/api/activity')
    .then(response => response.json())
    .then(data => {
        // console.log(data)
        idea.textContent = data.activity
    })

    const randColor = Math.floor(Math.random()*16777215).toString(16)
    idea.style.color = "#"+ randColor
    idea.style.backgroundColor = "#fff"
    
})


const setBg = () => {
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    document.body.style.backgroundColor = "#" + randomColor;
    color.innerHTML = "#" + randomColor;
  }
  
  genNew.addEventListener("click", setBg);
  setBg();