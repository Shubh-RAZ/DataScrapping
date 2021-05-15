const axios = require('axios')
const cheerio = require('cheerio')
const { data } = require('cheerio/lib/api/attributes')

axios.get('https://bbmpgov.com/chbms/')
    .then(res => {
        const $ = cheerio.load(res.data)
        var name=[]
        var phone =[]
        var availablebed = []
        var totalbed = []
        var occupiedbed = []
        var lastupdate = []
        var date = []

        var Karnataka = []
     

       $('#GovernmentHospitalsDetail > tbody > tr > td:nth-child(7)').each((i,dt) => {
    
           totalbed.push($(dt).text())
           
       })
       $('#GovernmentHospitalsDetail > tbody > tr > td:nth-child(2)').each((i,dt) => {
    
           name.push($(dt).text())
           
       })
       $('#GovernmentHospitalsDetail > tbody > tr > td:nth-child(12)').each((i,dt) => {
    
           occupiedbed.push($(dt).text())
           
       })
       $('#GovernmentHospitalsDetail > tbody > tr > td:nth-child(17)').each((i,dt) => {
    
           availablebed.push($(dt).text())
           
       })
       $('#GovernmentMedical > tbody > tr > td:nth-child(2)').each((i,dt) => {
    
           name.push($(dt).text())
           
       })
       $('#GovernmentMedical > tbody > tr > td:nth-child(7)').each((i,dt) => {
    
           totalbed.push($(dt).text())
           
       })
       $('#GovernmentMedical > tbody > tr > td:nth-child(12)').each((i,dt) => {
    
           occupiedbed.push($(dt).text())
           
       })
       $('#GovernmentMedical > tbody > tr > td:nth-child(17)').each((i,dt) => {
    
           availablebed.push($(dt).text())
           
       })

    date= $('body > div > div:nth-child(3) > div > h5').text()
  


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

        obj.hospitalName=data
        Karnataka.push(obj)

    })


Karnataka.map((data,i) => {
    data['lastUpdatedDate']=date.substring(7,19)
    totalbed.map((dt,j) => {
        if(i===j){
            data['normalBedTotal']=dt
        }
    })
    occupiedbed.map((dt,k) => {
        if(i===k){
            data['normalBedOccupied']=dt
        }
    })
    availablebed.map((dt,l) => {
        if(i===l){
            data['normalBedAvailable']=dt
        }
    })
})

console.log(Karnataka)
        
           
   
      
      
    })

    .catch(err => {
        console.log(err)
    })