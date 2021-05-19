const puppeteer = require('puppeteer');
let browser = puppeteer.Browser
const fs = require('fs')
const main = async () => {
    browser = await puppeteer.launch({
        headless:true
    })


    
}

main()


const gatherDistrict = async () => {

    try{
        browser = await puppeteer.launch({
            headless:true
        })
        const page = await browser.newPage()
    await page.setDefaultNavigationTimeout(0);
    await page.goto('http://sarthak.nhmmp.gov.in/covid/facility-bed-occupancy-details/?show=20&pagenum=2&district_id=0&facility_org_type=0&facility=0')

    const districtArray = await page.evaluate(() => {
     
        let dis = []
        Array.from(document.querySelectorAll('#district_id > option')).map((dt) => {

            let districtData = {
                id:'',
                district:'',
                url:''
      
            }
            var name=dt.innerText
            var index=name.indexOf('/')
            var urlstring1 = 'http://sarthak.nhmmp.gov.in/covid/facility-bed-occupancy-details/?show=200&pagenum=1&district_id='
            var urlstring2=dt.attributes.value.nodeValue
            var urlstring3 = '&facility_org_type=0&facility=0'
            var finalurlstring = urlstring1 + urlstring2 + urlstring3
            districtData.district=name.substring(0,index)
            districtData.id=dt.attributes.value.nodeValue
            districtData.url=finalurlstring

            if(districtData.id !== '0'){
                dis.push(districtData)
            }

        })

        return dis
    })

    return districtArray


    }

    catch(err){
        console.log(err)
    }
}

gatherDistrict()

const gatherdata = async (url) => {

  
    try{
        await url
        browser = await puppeteer.launch({
            headless:true
        })
      
    const page = await browser.newPage()
    await page.setDefaultNavigationTimeout(0);

    await page.goto(url)
    
    let data = await page.evaluate(()=> {
        let item = []
        
        Array.from(document.querySelectorAll('tr:nth-child(odd)')).map((dt,i) => {
          

            let obj = {
                hospitalName: '',
                hospitalAddress: '',
                normalBedTotal: '',
                normalBedOccupied: '',
                normalBedAvailable: '',
                oxygenBedTotal: '',
                oxygenBedOccupied: '',
                oxygenBedAvailable: '',
                lastUpdatedDate: '',
                lastUpdatedTime: '',
                district: '',
                state: 'Madhyapradesh',
                googleSearch: ''
            }
            var string = dt.innerText
            var indexaddress=string.indexOf('/')
            var break1=string.indexOf('\n')
            var break3=string.indexOf('\t')
            var break2=string.indexOf('\n',break3)
            obj.hospitalName=string.substring(0,indexaddress)
            var avstart= break3+1
            var indexOfBedTotal=string.indexOf('/',avstart)
            var indexOfOxygenBed=string.indexOf('Oxygen Supported:')
            var indexOfOxygenBednextline=string.indexOf('\n',indexOfOxygenBed)
            var replacedString = obj.hospitalName.replace(" ","+") 
            var finalRepString = replacedString + '+Madhya+Pradesh' 
            var gStringpt1 = 'https://www.google.com/search?q='
            var gStringpt3='&rlz=1C1CHBF_enIN859IN859&oq='
            var gStringpt5='&aqs=chrome..69i57j46i10i175i199j0i10l7.11711j0j15&sourceid=chrome&ie=UTF-8' 
            var finalString = gStringpt1 + finalRepString + gStringpt3 + finalRepString + gStringpt5
            obj.googleSearch=finalString
        obj.normalBedTotal=string.substring(avstart,indexOfBedTotal)
        obj.normalBedAvailable=string.substring(indexOfBedTotal+2,break2)
        obj.oxygenBedAvailable=string.substring(indexOfOxygenBed+18,indexOfOxygenBednextline)
        obj.lastUpdatedDate=string.substring(string.length-20,string.length-10)
        obj.lastUpdatedTime=string.substring(string.length-8,string.length)
        if(i>=1){
        item.push(obj)
        }
        })

        return item
       
    })
    await page.close()
   return data
}
catch(err){
    console.log('err in google scrapper',err)
}

}

const mapfunction = async () => {

    let districts = await gatherDistrict()
    districts.map((dt) => {
        const data = gatherdata(dt.url)
        data.then( x=> {
            fs.writeFile(
                `../jsonFiles/${dt.district}.json`,
                JSON.stringify(x, null, 2),
                (error) => {
                  if (error) {
                    console.log(error);
                  } else console.log(`File written ${dt.district}`);
                }
              )
        })
    })

    // let finaldata =[]
 
    // const data1 = gatherdata('http://sarthak.nhmmp.gov.in/covid/facility-bed-occupancy-details/?show=200&pagenum=1&district_id=0&facility_org_type=0&facility=0')
    // const data2 = gatherdata('http://sarthak.nhmmp.gov.in/covid/facility-bed-occupancy-details/?show=200&pagenum=2&district_id=0&facility_org_type=0&facility=0')
    
    // const promises = [data1,data2]
    // await Promise.allSettled(promises)
    // .then(value => {
      
    //     finaldata = value[0].value.concat(value[1].value)        
    // }
    // )

    // .catch(err=> {
    //     console.log('err in promise',err)
    // })
   
}


const final = async () => {
 
    const dt = await mapfunction();
    return dt
}

final()
exports.madhyaPradesh = final

