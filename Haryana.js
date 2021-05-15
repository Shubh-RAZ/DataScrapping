const axios = require('axios')
const cheerio = require('cheerio')

axios.get('https://coronaharyana.in/')
    .then(res => {
        const $ = cheerio.load(res.data)
        var name=[]
        var phone =[]
        var availablebed = []
        var availableo2bed = []
        var occupied02bed = []
        var lastupdate = []
        var date = []
        var time = []
        var address = []
        var Haryana = []

   

        

      
        name.map(data => {
            
        var obj = {
            hospitalName:'',
            hospitalAddress:'',
            normalBedTotal:'',
            normalBedOccupied:'',
            normalBedAvailable:'',
            oxygenBedTotal:'',
            oxygenBedOccupied:'',
            oxygenBedAvailable:'',
            lastUpdatedDate:'',
            lastUpdatedTime:'',
            district:''
        }

            obj['hospitalName']=data
            Goa.push(obj)
        })
      
      
    })

    .catch(err => {
        console.log(err)
    })