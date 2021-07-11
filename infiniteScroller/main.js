const imgContainer = document.getElementById("image-container")
const loader = document.getElementById("loader")
let picsArr = []

// unsplash api
const count = 10
const apiKey = "7LMDd7L972KMO07em6vA_Q6ZSKD6IMUP5laD0penV_8"
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

function settingAtts(el, attributes) {
    for(const k in attributes) {
        el.setAttribute(k, attributes[k])
    }
}

// Create Els to add to the DOM

function displayPics(){
    // for loop over the picsArr
    picsArr.forEach( pic => {
        // creating a element to unsplash
        const item = document.createElement("a")
        settingAtts(item, {
            href: pic.links.html,
            target: "_blank"
        })
        // create img for our pic
        const img = document.createElement("img")
        img.setAttribute("src", pic.urls.regular)
        img.setAttribute("alt", pic.alt_description)
        img.setAttribute("title", pic.alt_description)
        // img inside an a tag, and those 2 tag will be inside the img container
        item.appendChild(img)
        imgContainer.appendChild(item)
    })
}

// get photos from unsplash
async function getPhotos(){
    try {
        const res = await fetch(apiUrl)
        picsArr = await res.json()
        displayPics()
    } catch (err) {
        console.log(err)
    }
}

//  on load

getPhotos()