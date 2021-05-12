var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const SANKALP_EMBED_KEYS_URL = "https://mbdasankalp.in/auth/local/embed";
var getSankalpAuthToken = () => {
    const loginHttp = new XMLHttpRequest();
    loginHttp.open("GET", SANKALP_EMBED_KEYS_URL, true)
    loginHttp.onload = () => {
        console.log(loginHttp.response)
    }
    loginHttp.setRequestHeader("Content-type", "application/json");
    let requestBody = JSON.stringify({ "embed": true });
    loginHttp.send();
    


   loginHttp.onreadystatechange = (e) => {
        console.log("in logs");
        

            
    }
}

getSankalpAuthToken()


{/*
const axios = require('axios')
const cheerio = require('cheerio')
const request = require('request')

axios.get('https://mbdasankalp.in/render/chart/5f3e7225e4087645c536bc0a?c=000000&bc=f7f7f7&key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWZkNjM0ZTE0MDllZTZmMGZmMzZmNDIiLCJpYXQiOjE2MjA3ODMwNDksImV4cCI6MTYyMDgxMTg0OX0.N5UHKHt7AXFfhxn3R_f_FjkMq9oXFkuGC2oKoYerm_4')
    .then(res => {
        const $ = cheerio.load(res.data)
        const head = $('.table-chart-title')
        console.log(head.html())
     
        
    })
    .catch(err => {console.log(err)})


*/}
