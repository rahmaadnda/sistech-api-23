const url = "./token"

document.querySelector('.tokenForm').addEventListener("submit", (e) => {
    e.preventDefault();
    try {
        const result = fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({"name": document.getElementById('name').value}), // body data type must match "Content-Type" header
        });
        result.then(response => response.json().then(data => ({
                    data: data
                })
            ).then(res => {
                document.cookie = "token=" + res.data.token
                window.location.href = "./home"
            }));
    }
    catch (error) {
        alert(error.message)
    }
    finally {
        document.getElementById('name').value = ''
    }

})
