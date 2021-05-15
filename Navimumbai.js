const axios = require('axios')
const cheerio = require('cheerio')
const googleData =require ('./Pupeteer');
// const data =async ()=>{
    const d = googleData.google('https://www.google.com/search?q=Terna+Hospital+Nerul&rlz=1C1CHBF_enIN859IN859&oq=Terna+Hospital+Nerul&aqs=chrome..69i57j46i10i175i199j0i10l7.11711j0j15&sourceid=chrome&ie=UTF-8')
 
    console.log("dt",dt)

// }


axios.get('https://nmmchealthfacilities.com/HospitalInfo/showhospitalist')
    .then(res => {
        const $ = cheerio.load(res.data)
        const head = $('.container .col-12')
        var HospitalNa = []
        var capacity = []
        var occupied = []
        var vaccant = []
        var oxygenCapacity = []
        var oxygenOccupancy = []
        var oxygenAvailable = []

        $('.text-center h4 b').each((i,el) => {
            if(i>=1){
            HospitalNa.push ($(el).text())
            }
        })

      
        $('.bg-gradient-primary  b').each((i,el) => {
          
            capacity.push ($(el).text())
            
        })
        $('.bg-gradient-danger  b').each((i,el) => {
          
            occupied.push ($(el).text())
            
        })
        $('.bg-gradient-success  b').each((i,el) => {
          
            vaccant.push ($(el).text())
            
        })

        $('tr:nth-child(3) > td:nth-child(2)').each((i,el) => {
            if(i>=1){
                oxygenCapacity.push($(el).text())
            
            }
        })

        $('tr:nth-child(3) > td:nth-child(3)').each((i,el) => {
            if(i>=1){
                oxygenOccupancy.push($(el).text())
            
            }
        })

        $('tr:nth-child(3) > td:nth-child(4)').each((i,el) => {
            if(i>=1){
                oxygenAvailable.push($(el).text())
            
            }
        })


        var naviMumbai = []


        HospitalNa.map(data=> {
            
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
            district:'Thane',
            state:'Maharastra',
            googleSearch:''
            
        }
            var ind = data.indexOf(',')
            var indcm = data.indexOf('-')
            var searchh = ''
            var newstring =''
            if(ind!== -1 || indcm!== -1){
                if(ind!== -1){
            newstring = data.substring(0,ind)
            searchh=data.substring(ind+1).trim()
            obj.hospitalName=newstring
                }
                if(indcm!== -1){
            newstring = data.substring(0,indcm)
            searchh=data.substring(indcm+1).trim()
            obj.hospitalName=newstring
                }
            }
            else{
                newstring=data
                obj.hospitalName=data
                searchh='Navimumbai'
            }
            var replacedString = newstring.replace(" ","+") 
            var finalRepString = replacedString + '+' + searchh 
            var gStringpt1 = 'https://www.google.com/search?q='
            var gStringpt3='&rlz=1C1CHBF_enIN859IN859&oq='
            var gStringpt5='&aqs=chrome..69i57j46i10i175i199j0i10l7.11711j0j15&sourceid=chrome&ie=UTF-8' 
            var finalString = gStringpt1 + finalRepString + gStringpt3 + finalRepString + gStringpt5
            naviMumbai.push(obj)
      
        })

     

        naviMumbai.map((data,i)=> {
            capacity.map((number,j) => {
                if(i===j){
                    data['normalBedTotal']=number
                }
            })

            occupied.map((numberoc,k) => {
                if(i===k){
                    data['normalBedOccupied']=numberoc
                }
            })

            vaccant.map((numbervc,l) => {
                if(i===l){
                    data['normalBedAvailable']=numbervc
                }

                
            })

            oxygenCapacity.map((numbero2c,m) => {
                if(i===m){
                    data['oxygenBedTotal']=numbero2c
                }
            })

            oxygenOccupancy.map((numbero2o,n) => {
                if(i===n){
                    data['oxyegnBedOccupied']=numbero2o
                }
            })
            oxygenAvailable.map((numbero2a,o) => {
                if(i===o){
                    data['oxygenBedAvailable']=numbero2a
                }
            })
            
        })

      
       {/* console.log(HospitalNa)
        console.log(capacity)
        console.log(occupied)
       console.log(vaccant) */}
       
     
        
    })
    .catch(err => {console.log(err)})



