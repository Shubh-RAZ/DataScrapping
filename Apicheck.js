const axios = require('axios')
const cheerio = require('cheerio')
setInterval(function(){ 
    //code goes here that will be run every 5 seconds.
    axios.get('https://www.worldtimeserver.com/')
    .then(res=> {
        const $ = cheerio.load(res.data)
        var text = $('#loggedout').text()
        console.log(text)
    })

    .catch(err => {
        console.log(err)
    })
     
}, 5000);

clearInterval()