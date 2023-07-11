const url = './blog'
let posts
// Get the modal
let modal = document.getElementById("AddModal");
let modalPost = document.getElementById("editModal");

// Get the button that opens the modal
let btn = document.getElementById("OpenBtn");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];
let spanEdit = document.getElementsByClassName("closeEdit")[0];


// When the user clicks the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

fetch(url, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "authorization": "bearer 6839b204-4f83-477a-80b0-6c36f90482cb"
    }
}).then(res => res.json())
    .then(data => {
        data.forEach(
            post => {
                console.log(post)
                posts += `<div class="card">
          <div class="card-body" data-id="${post.id}">
            <h4 class="card-title">${post.title}</h4>
            <p class="card-text">${post.content}</p>
            <button class="btn btn-primary" id="edit-post">Edit Post</button>
          </div>
        </div>`
            }
        )
        document.getElementById("deck").innerHTML = posts;
    })


document.querySelector('.addForm').addEventListener("submit", (e) => {
    e.preventDefault();
    try {
        const result = fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": "bearer 6839b204-4f83-477a-80b0-6c36f90482cb"
            },
            body: JSON.stringify(
                {"title": document.getElementById('title').value,
                    "content": document.getElementById('content').value,
                    "token" : "6839b204-4f83-477a-80b0-6c36f90482cb"}
            )
        });
        result.then(response => response.json()
            .then(data => ({
                data: data
            })
        ).then(res => {
            console.log(res.data)
        }));
        window.location.href = './home'
    }
    catch (error) {
        alert(error.message)
    }
    finally {
        document.getElementById('title').value = ''
        document.getElementById('content').value = ''
    }
})

document.getElementById("deck").addEventListener("click", (e) => {
    e.preventDefault();
    let editPost = e.target.id == 'edit-post';
    let id = e.target.parentElement.dataset.id;

    if(editPost) {
        modalPost.style.display = "block";

        spanEdit.onclick = function() {
            modalPost.style.display = "none";
        }

        window.onclick = function(event) {
            if (event.target == modalPost) {
                modalPost.style.display = "none";
            }
        }
        document.querySelector('.editForm').addEventListener("submit", (e) => {
            e.preventDefault();
            try {
                const result = fetch(url, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": "bearer 6839b204-4f83-477a-80b0-6c36f90482cb"
                    },
                    body: JSON.stringify(
                        {"title": document.getElementById('newTitle').value,
                            "content": document.getElementById('newContent').value,
                            "token" : "6839b204-4f83-477a-80b0-6c36f90482cb",
                            "id" : id}
                    )
                });
                result.then(response => response.json()
                    .then(data => ({
                            data: data
                        })
                    ).then(res => {
                        console.log(res.data)
                    }));
                window.location.reload();
            }
            catch (error) {
                alert(error.message)
            }
            finally {
                document.getElementById('newTitle').value = ''
                document.getElementById('newContent').value = ''

            }
        })
    }
})