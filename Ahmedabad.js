const puppeteer = require('puppeteer');
const fs = require('fs')
const gatherAhmedabad = async (url) => {
    await url

    try{
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  // Get the "viewport" of the page, as reported by the page.
  const dimensions = await page.evaluate(() => {
      let item = []
    Array.from(document.querySelectorAll('tbody > tr')).map((dt,ind) => {
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
            district:'Ahmedabad',
            state:'Gujrat',
            googleSearch:'',
            phoneNo:''
        }   

        var str=dt.innerText
      
        var indexOfAdd = str.indexOf('\t')
        var indexOfGgl = str.indexOf('\t',indexOfAdd)
        var thrdt = str.indexOf('\t',indexOfGgl+2)
        var frtht = str.indexOf('\t',thrdt+2)
        var fftht = str.indexOf('\t',frtht+2)
        var sixt = str.indexOf('\t',fftht+2)
        var sevt = str.indexOf('\t',sixt+2)
        var eightt = str.indexOf('\t',sevt+2)
        obj.hospitalName=str.substring(0,indexOfAdd)
        obj.normalBedTotal=str.substring(thrdt+1,frtht)
        obj.normalBedOccupied=str.substring(frtht+1,fftht)
        obj.normalBedAvailable=str.substring(fftht+1,sixt)
        obj.phoneNo=str.substring(sevt+1,eightt)
        var googlesearch = str.substring(indexOfAdd+1,thrdt)
        obj.lastUpdatedDate=str.substring(eightt+1,eightt+11)
        obj.lastUpdatedTime=str.substring(eightt+12,str.length)
        var replacedString = obj.hospitalName.replace(" ","+") 
        var finalRepString = replacedString + '+' + googlesearch 
        var gStringpt1 = 'https://www.google.com/search?q='
        var gStringpt3='&rlz=1C1CHBF_enIN859IN859&oq='
        var gStringpt5='&aqs=chrome..69i57j46i10i175i199j0i10l7.11711j0j15&sourceid=chrome&ie=UTF-8' 
        var finalString = gStringpt1 + finalRepString + gStringpt3 + finalRepString + gStringpt5
        obj.googleSearch=finalString
        if(ind>=1){
        item.push(obj)
        }
    
    })
      
    return item
  });

  await browser.close();
return dimensions

}

catch(err){
    console.log('error',err)
}
}


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
        fs.writeFile(
            `./jsonFiles/Ahmedabad.json`,
            JSON.stringify(finaldata, null, 2),
            (error) => {
              if (error) {
                console.log(error);
              } else console.log(`File written Ahmedabad`);
            }
          );
        return finaldata
    }
    )

    .catch(err=> {
        console.log('err in promise',err)
    })
   
}

mergeData()



