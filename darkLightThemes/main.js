const toggleSwitch = document.querySelector("input[type='checkbox']")

// switch function
function switchTheme(e) {
    if(e.target.checked){
        document.documentElement.setAttribute("data-theme", "dark")
    } else {
        document.documentElement.setAttribute("data-theme", "light")
    }
}


// event listener
toggleSwitch.addEventListener("change", switchTheme)