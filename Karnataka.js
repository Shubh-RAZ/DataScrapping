const axios = require('axios')
const cheerio = require('cheerio')
const { data } = require('cheerio/lib/api/attributes')
const fs = require('fs')

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
            district:'',
            state:'Karnataka',
            googleSearch:''
        }

        obj.hospitalName=data
        var replacedString = data.replace(" ","+") 
        var finalRepString = replacedString + '+ kartnataka'  
        var gStringpt1 = 'https://www.google.com/search?q='
        var gStringpt3='&rlz=1C1CHBF_enIN859IN859&oq='
        var gStringpt5='&aqs=chrome..69i57j46i10i175i199j0i10l7.11711j0j15&sourceid=chrome&ie=UTF-8' 
        var finalString = gStringpt1 + finalRepString + gStringpt3 + finalRepString + gStringpt5
        obj.googleSearch=finalString
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
      fs.writeFile(
        `./jsonFiles/Karnataka.json`,
        JSON.stringify(Karnataka, null, 2),
        (error) => {
          if (error) {
            console.log(error);
          } else console.log(`File written Karnataka`);
        }
      );
      
    })

    .catch(err => {
        console.log(err)
    })