# Sister in tech API

API url: https://sistech-api.vercel.app/

Documentation: https://ristek.link/SistechAPI

## Prerequisite

- ### Install postman

  Download postman from here https://www.postman.com/ and then downnload the documentation from the link given above.

- ### Import postman collection

  Open your previously installed postman, and navigate to the personal space import menu and click it.

  ![Alt text](docs/postman-import.png?raw=true)

  Upload the docuemntation file that you downloaded previously and click import.

  ![Alt text](docs/postman-file-select.png?raw=true)

## How to use

The API work on a simple authentication method, an API token that you need to previously register. From the recently imported documentation in postman select the **_Create API token_**.

![Alt text](docs/postman-createapi.png?raw=true)

This request have one body argument **_name_**, replace the **_guest_** with your name and hit send.

example:

```javascript
{
    "name": "ristek lovers"
}
```

The response is an API token that you will used in future request, so kindly save it or if you ever forget it just create a new one. (All your blog post will be associated with you API token).

![Alt text](docs/postman-token.png?raw=true)

For future API request please set this API token in your authorization header.

example:

```javascript
{
    "authorization": "bearer {API TOKEN GOES HERE}"
}
```

remember to always use the bearer prefix. In the postman you can simply head to authorization menu and select bearer and the paste your api token.

![Alt text](docs/postman-header.png?raw=true)

## Run Locally

If you can't access the server you can run the server locally by doing this step: (you need node.js to run this locally so kindly install it first if you don't have it)

1. Clone the repository

   `git clone git@github.com:RistekCSUI/sistech-api.git`

2. Cd into the directory

   `cd sistech-api`

3. Install all depedencies

   `yarn`

4. Run the server

   `yarn dev`

The server is hosted in http://localhost:5000
