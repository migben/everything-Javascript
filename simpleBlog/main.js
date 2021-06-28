const blogList = document.getElementById("blog-list")
const btn = document.getElementById("btn")
const newPost = document.getElementById("new-post")

fetch("https://apis.scrimba.com/jsonplaceholder/posts")
    .then(res => res.json())
    .then(data => {
        const postsArr = data.slice(0, 5)
        // console.log(postsArr)
        let html = ""

        for(let post of postsArr){
            html += `
                <h3>${post.title}</h3>
                <p>${post.body}</p>
                <hr />
            `
        }
        blogList.innerHTML = html
    })

newPost.addEventListener("submit", function(e){ // listening for the form submit
    e.preventDefault()

    const postTitle = document.getElementById("post-title").value
    const postBody = document.getElementById("post-body").value
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

    fetch("https://apis.scrimba.com/jsonplaceholder/posts", options)
        .then(res => res.json())
        .then(data => {
            console.log(data)

            blogList.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.body}</p>
                <hr />
                ${blogList.innerHTML}
            `
        })
})