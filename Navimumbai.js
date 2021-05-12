const axios = require('axios')
const cheerio = require('cheerio')
const request = require('request')

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
            hospitalNameAddress:'',
            capacity:'',
            occupied:'',
            vaccant:'',
            OxygenCapacity:'',
            OxygenOccupied:'',
            OxygenAvailable:'',
            
        }
            obj.hospitalNameAddress=data
            naviMumbai.push(obj)
        })

        naviMumbai.map((data,i)=> {
            capacity.map((number,j) => {
                if(i===j){
                    data['capacity']=number
                }
            })

            occupied.map((numberoc,k) => {
                if(i===k){
                    data['occupied']=numberoc
                }
            })

            vaccant.map((numbervc,l) => {
                if(i===l){
                    data['vaccant']=numbervc
                }

                
            })

            oxygenCapacity.map((numbero2c,m) => {
                if(i===m){
                    data['OxygenCapacity']=numbero2c
                }
            })

            oxygenOccupancy.map((numbero2o,n) => {
                if(i===n){
                    data['OxygenOccupied']=numbero2o
                }
            })
            oxygenAvailable.map((numbero2a,o) => {
                if(i===o){
                    data['OxygenAvailable']=numbero2a
                }
            })
            
        })

        console.log(naviMumbai)
       {/* console.log(HospitalNa)
        console.log(capacity)
        console.log(occupied)
       console.log(vaccant) */}
       
     
        
    })
    .catch(err => {console.log(err)})



