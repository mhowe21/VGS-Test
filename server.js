//const http = require('http')
if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

let output = null


const username = process.env.HTTPS_PROXY_USERNAME
const password = process.env.HTTPS_PROXY_PASSWORD
const vault = process.env.VAULT_ID
const fs = require("fs")
const port = 3030
const fetch = require("node-fetch")
const path = require("path")
const express = require("express")
const app = express()
const url = require("url")
const HttpsProxyAgent = require('https-proxy-agent');
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
app.use(express.json())

app.set("view engine", "ejs")
app.use(express.static("public"))

//routs
app.get("/username", function (req, res) {
    res.send(username)
})
app.get("/password", function (req, res) {
    res.send(password)
})
app.get("/vault", function (req, res) {
    res.send(vault)
})

app.post("/send", function (req, res) {
    //revealData()
    console.log(JSON.stringify(req.body))
    let jData = (req.body)
    retrieve(jData)
    res.send("data retrived")
})

app.get("/get", function(req,res){
    console.log(output)
    res.send(output)
})



app.listen(port)




// reveal data
function retrieve(jData) {
    

    const urlParams = url.parse(`http://${username}:${password}@${vault}.SANDBOX.verygoodproxy.com:8080`);
    const agent = new HttpsProxyAgent({
        ...urlParams,
        ca: [fs.readFileSync('SANDBOX.PEM')],
    });
    console.log(urlParams)

    async function getData() {
        let result;
        try {
            result = await fetch('https://echo.apps.verygood.systems/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({

                    account_number: String(jData["json"].card_cvc),
                    card_holder: String(jData["json"].card_holder),
                    card_exp: String(jData["json"].card_exp),
                    card_number: String(jData["json"].card_number)


                }),
                agent,
            });
        } catch (e) {
            console.error(e);
        }
        return await result.json();
    }
    getData().then(response => {
        console.log(response)
        //output = (response["json"].account_number)
        output = response

    });
    
}