const blogList = document.getElementById("blog-list")
const btn = document.getElementById("btn")
const newPost = document.getElementById("new-post")
let postsArr = []
const titleInput = document.getElementById("post-title")
const bodyInput = document.getElementById("post-body")
const form = document.getElementById("new-post")

// This project was built to practice REST basics

function renderPosts(){
    let html = ""

        for(let post of postsArr){
            html += `
                <h3>${post.title}</h3>
                <p>${post.body}</p>
                <hr />
            `
        }
        blogList.innerHTML = html
}

fetch("https://apis.scrimba.com/jsonplaceholder/posts") // our get req
    .then(res => res.json())
    .then(data => {
        postsArr = data.slice(0, 5)
        // console.log(postsArr)
        renderPosts()
    })

newPost.addEventListener("submit", function(e){ // listening for the form submit
    e.preventDefault()

    const postTitle = titleInput.value
    const postBody = bodyInput.value
    const data = {
        title: postTitle,
        body: postBody
    }

    const options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json"
        }
    }

    fetch("https://apis.scrimba.com/jsonplaceholder/posts", options) // our post request
        .then(res => res.json())
        .then(post => {
            // console.log(data)

            postsArr.unshift(post)
            renderPosts()

            // clearing the form after submission

            // titleInput.value = ""
            // bodyInput.value = ""

            form.reset()
        })
})