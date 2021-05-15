const axios = require('axios')
const cheerio = require('cheerio')

axios.get('https://covid19dashboard.py.gov.in/BedAvailabilityDetails')
    .then(res => {
        const $ = cheerio.load(res.data)
        var name=[]
        var phone =[]
        var availablebed = []
        var totalo2bed = []
        var availableo2bed = []
        var occupied02bed = []
        var lastupdate = []
        var date = []
        var time = []
        var address = []
        var Haryana = []

        $('#Vaccination_PDY > div > table > tbody > tr > td.text-left').each((i,dt) => {
            var tg = $(dt).text()
            var newtg = tg.trim()
            name.push(newtg)
            
        })

        $('#Vaccination_KKL > div > table > tbody > tr > td.text-left').each((i,dt) => {
            var tg = $(dt).text().substring(53)
            var newtg = tg.trim()
            name.push(newtg)
           
        })
        $('#Vaccination_MAH > div > table > tbody > tr.text-right > td.text-left').each((i,dt) => {
            var tg = $(dt).text().substring(53)
            var newtg = tg.trim()
            name.push(newtg)
            
        })

        $('#Vaccination_YAN > div > table > tbody > tr.text-right > td.text-left').each((i,dt) => {
            var tg = $(dt).text().substring(53)
            var newtg = tg.trim()
            name.push(newtg)
        
        })

        console.log(name)


        
        $('#Vaccination_PDY > div > table > tbody > tr > td:nth-child(5)').each((i,dt) => {
            var tg=$(dt).text()
            var newtg= tg.trim()
            totalo2bed.push(newtg)
           
        })

        $('#Vaccination_KKL > div > table > tbody > tr > td:nth-child(5)').each((i,dt) => {
            var tg=$(dt).text()
            var newtg= tg.trim()
            totalo2bed.push(newtg)
           
        })
        $('#Vaccination_MAH > div > table > tbody > tr > td:nth-child(5)').each((i,dt) => {
            var tg=$(dt).text()
            var newtg= tg.trim()
            totalo2bed.push(newtg)
           
        })
        $('#Vaccination_YAN > div > table > tbody > tr > td:nth-child(5)').each((i,dt) => {
            var tg=$(dt).text()
            var newtg= tg.trim()
            totalo2bed.push(newtg)
           
        })

        console.log(totalo2bed)

        console.log(availableo2bed)
        $('#Vaccination_PDY > div > table > tbody > tr > td:nth-child(6)').each((i,dt) => {
            var tg=$(dt).text()
            var newtg= tg.trim()
            availableo2bed.push(newtg)
        })
        $('#Vaccination_KKL > div > table > tbody > tr > td:nth-child(6)').each((i,dt) => {
            var tg=$(dt).text()
            var newtg= tg.trim()
            availableo2bed.push(newtg)
        })
        $('#Vaccination_MAH > div > table > tbody > tr > td:nth-child(6)').each((i,dt) => {
            var tg=$(dt).text()
            var newtg= tg.trim()
            availableo2bed.push(newtg)
        })
        $('#Vaccination_YAN > div > table > tbody > tr > td:nth-child(6)').each((i,dt) => {
            var tg=$(dt).text()
            var newtg= tg.trim()
            availableo2bed.push(newtg)
        })
        $('#Vaccination_PDY > div > table > tbody > tr > td:nth-child(2)').each((i,dt) => {
            var tg=$(dt).text()
            var newtg= tg.trim()
            date.push(newtg.substring(1,10))
            time.push(newtg.substring(11,19))

        })
        $('#Vaccination_KKL > div > table > tbody > tr > td:nth-child(2)').each((i,dt) => {
            var tg=$(dt).text()
            var newtg= tg.trim()
            date.push(newtg.substring(1,10))
            time.push(newtg.substring(11,19))
        })
        $('#Vaccination_MAH > div > table > tbody > tr > td:nth-child(2)').each((i,dt) => {
            var tg=$(dt).text()
            var newtg= tg.trim()
            date.push(newtg.substring(1,10))
            time.push(newtg.substring(11,19))
        })
        $('#Vaccination_YAN > div > table > tbody > tr > td:nth-child(2)').each((i,dt) => {
            var tg=$(dt).text()
            var newtg= tg.trim()
            date.push(newtg.substring(1,10))
            time.push(newtg.substring(11,19))
        })

console.log(time)
      

   

        

      
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
           
        })
      
      
    })

    .catch(err => {
        console.log(err)
    })