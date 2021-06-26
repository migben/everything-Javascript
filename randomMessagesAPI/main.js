const btn = document.getElementById('activity')

btn.addEventListener('click',function(){
    fetch('https://www.boredapi.com/api/activity')
    .then(response => response.json())
    .then(data => {
        console.log(data)

        document.getElementById('idea').textContent = data.activity
    })
})
