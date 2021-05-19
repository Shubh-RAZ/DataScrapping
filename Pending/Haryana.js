const puppeteer = require('puppeteer');
const haryanadt = require('./Haryanadt')
const fs = require('fs')
const gatherHaryana = async (url,districts) => {

        vm=this
    try{
        await url
        const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.goto(url);

  // Get the "viewport" of the page, as reported by the page.
  const dimensions = await page.evaluate(() => {
    const arr = Array.from(document.querySelectorAll('.psahuDiv')).map((data) => data.innerText);
    
    //


    
    // })
      
    return arr;
  });
//   console.log("dim", dimensions)
  await browser.close();
return dimensions

}

catch(err){
    console.log('error',err)
}
}

const mergeData = async () => {


var haryanaDistrict = haryanadt.haryana
const mapdata = await haryanaDistrict.map((data,ind) => {
    
    let item = []
gatherHaryana(data.url,data.name)
.then(x => { 
    
    let maparray=[]
    x.map((dt,ind) => {
           
            let obj = {
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
                district: data.name,
                state:'Haryana',
                googleSearch:'',
                phoneNo:''
            }   
    
            var str=dt
            var indexOfAdd = str.indexOf(':')
            var indexOfGgl = str.indexOf('\n',indexOfAdd)
            var thrdt = str.indexOf('(',indexOfGgl+2)
            var frtht = str.indexOf(')',thrdt)
            var fftht = str.indexOf('Oxygen Beds',frtht)
            var sixt = str.indexOf(',',fftht+2)
            var sevt = str.indexOf('Allocated Beds: Oxygen Beds:',sixt+2)
            var eightt = str.indexOf(',',sevt)
            var ninth = str.indexOf('Updated On:',sevt)
            var tenthh = str.indexOf('BoardLine Number:',sevt)
            var elnh = str.indexOf('\n',tenthh)
            obj.hospitalName=str.substring(indexOfAdd+2,indexOfGgl)
            obj.normalBedAvailable=str.substring(thrdt+1,frtht)
            obj.oxygenBedAvailable=str.substring(fftht+13,sixt)
            obj.oxygenBedOccupied=str.substring(sevt+29,eightt)
            obj.phoneNo=str.substring(sevt+1,eightt)
            obj.lastUpdatedDate=str.substring(str.length-11,str.length-1).trim();
            obj.lastUpdatedTime=str.substring(ninth+12,str.length-13)
            obj.phoneNo=str.substring(tenthh+17,elnh)
            var replacedString = obj.hospitalName.replace(" ","+") 
            var finalRepString = replacedString + '+Haryana' 
            var gStringpt1 = 'https://www.google.com/search?q='
            var gStringpt3='&rlz=1C1CHBF_enIN859IN859&oq='
            var gStringpt5='&aqs=chrome..69i57j46i10i175i199j0i10l7.11711j0j15&sourceid=chrome&ie=UTF-8' 
            var finalString = gStringpt1 + finalRepString + gStringpt3 + finalRepString + gStringpt5
            obj.googleSearch=finalString
            if(obj.oxygenBedAvailable.length<=5){
           maparray.push(obj)
            }
         
              
        })
        fs.writeFile(
            `../jsonFiles/${maparray[0].district}.json`,
            JSON.stringify(maparray, null, 2),
            (error) => {
              if (error) {
                console.log(error);
              } else console.log(`File written ${maparray[0].district}`);
            }
          );
        item.concat(maparray)
      
})

.catch(err =>
    console.log(err)
)

return item
})

return item
}



mergeData()
{/*
const mergeData = () => {

    let finaldata = []
    const bedData= gatherAhmedabad('https://vmc.gov.in/AhmedabadDistrictRural/HospitalBedsDetails.aspx?tid=1')
    bedData
    .then(dt => {
       
        
    })
    .catch(err => {
        console.log("err in merge ", err)
    })

    const oxyBedData = gatherAhmedabad('https://vmc.gov.in/AhmedabadDistrictRural/HospitalBedsDetails.aspx?tid=4')
    oxyBedData
    .then(dt => {
      
    })
    .catch(err => {
        console.log(err)
    })

    const promises = [bedData,oxyBedData]
    Promise.allSettled(promises)
    .then(value => {
        value[0].value.map((dt,i)=> {
            value[1].value.map((data,j) => {
                if(i===j){
                    dt.oxygenBedTotal=data.normalBedTotal
                    dt.oxygenBedAvailable=data.normalBedAvailable
                    dt.oxygenBedOccupied=data.normalBedOccupied
                }
            })
        })

        finaldata = value[0].value
        console.log("finl",finaldata)
        return finaldata
    }
    )

    .catch(err=> {
        console.log('err in promise',err)
    })
   
}

mergeData()
*/}



