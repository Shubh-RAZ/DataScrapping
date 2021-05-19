const puppeteer = require('puppeteer');
let browser = puppeteer.Browser

const main = async (url) => {

    browser = await puppeteer.launch({
        headless:true
    })

    const dt = await gatherdata(url);
    if(dt.location){
        dt['url']=url
   
    }

   return dt
}

main()

const gatherdata = async (url) => {

  
    try{
        const urls=await url
    const page = await browser.newPage()
    await page.setDefaultNavigationTimeout(0);
    await page.goto(url)
 


    const data = await page.evaluate((urls)=> {
    var address=''
    var phonecall=''
    var duration=''
      
        let adbool = address=document.querySelector('span.LrzXr')
        if(adbool){
            address=adbool.innerText
        }
        phonebool=document.querySelector('a[data-dtype="d3ifr"]')
        if(phonebool){
            phonecall=phonebool.innerText
        }
       
   
        let item = {
            location:address,
            phone:phonecall,
            url:urls,
     
        }

        return item
    })

   await page.close()
   return data
}
catch(err){
    console.log('err in google scrapper',err)
}

}

exports.google = main