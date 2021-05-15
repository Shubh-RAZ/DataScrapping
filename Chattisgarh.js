const axios = require('axios')
const cheerio = require('cheerio')

axios.get('https://cg.nic.in/health/covid19/RTPBedAvailable.aspx')
    .then(res => {
        const $ = cheerio.load(res.data)
        const head = $('h1').html()
        var name=[]
        var district=[]
        var phone =[]
        var totalbed = []
        var o2bed = []
        var vacant02bed = []

        $('table > tbody:nth-child(2) > tr:nth-child(2) > td > div > table > tbody > tr:nth-child(2) > td:nth-child(2)').html()
        
     

      
    })

    .catch(err => {
        console.log(err)
    })