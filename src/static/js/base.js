const url = "./token"
let userToken

document.querySelector('.tokenForm').addEventListener("submit", (e) => {
    e.preventDefault();
    try {
        const result = fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({"name": document.getElementById('name').value}), // body data type must match "Content-Type" header
        });
        result.then(response => response.json().then(data => ({
                    data: data
                })
            ).then(res => {
            userToken = res.data.token

            }));
        alert(userToken + "alert");
        console.log(userToken)
        module.exports = userToken
        window.location.href = "./home"
    }
    catch (error) {
        alert(error.message)
    }
    finally {
        document.getElementById('name').value = ''
    }

})

