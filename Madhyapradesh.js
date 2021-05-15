const axios = require('axios')
const cheerio = require('cheerio')

axios.get('http://sarthak.nhmmp.gov.in/covid/facility-bed-occupancy-details/')
    .then(res => {
        const $ = cheerio.load(res.data)
        const head = $('h1').html()
        var name=[]
        var addresslink = []
        var district=[]
        var phone =[]
        var totalbed = []
        var o2bed = []
        var vacant02bed = []

        $('#main > div > section.wrapper-tbl > table > tbody > tr > td > div.hospitalname').each((i,dt) => {
            var text = $(dt).text()
            var ind = text.indexOf('/')
            var newstring = text.substring(0,ind)
            name.push(newstring)
        })
        
        $('#main > div > section.wrapper-tbl > table > tbody > tr > td:nth-child(1) > div.hospitaladdrress > a:nth-child(1)').each((i,dt) => {
            var text = $(dt).attr('href')
          addresslink.push(text)
        })
        
        $('#main > div > section.wrapper-tbl > table > tbody > tr > td.text-center > span').each((i,dt) => {
            var text = $(dt).text()
          console.log(text)
        })
        
     
      

     

      
    })

    .catch(err => {
        console.log(err)
    })