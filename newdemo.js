const puppeteer = require('puppeteer');
let browser = puppeteer.Browser

const main = async (url) => {
    browser = await puppeteer.launch({
        headless:true
    })

    const dt = await gatherdata(url);
    return dt
}

main()

const gatherdata = async (urls) => {
    const page = await browser.newPage()
    await page.setDefaultNavigationTimeout(0);
    await page.goto(urls)

    const data = await page.evaluate(()=> {
        let address
        let phone
        let hours
   
        let vaccineinfo = document.querySelector('#kp-wp-tab-overview > div.TzHB6b.cLjAic.LMRCfc > div > div > div > div > div:nth-child(4) > div > c-wiz > div > div > span > a > span')
        if(vaccineinfo){
        
        var addressbool = document.querySelector('#kp-wp-tab-overview > div.TzHB6b.cLjAic.LMRCfc > div > div > div > div > div:nth-child(6) > div > div > div > span.LrzXr')
        if(addressbool){
            address=addressbool.innerText
        }

        var phonebool = document.querySelector('#kp-wp-tab-overview > div.TzHB6b.cLjAic.LMRCfc > div > div > div > div > div:nth-child(9) > div > div > div > span:nth-child(2) > span > a > span')

        if(phonebool){
            phone=phonebool.innerText
        }

        var hoursbool = document.querySelector('#kp-wp-tab-overview > div.TzHB6b.cLjAic.LMRCfc > div > div > div > div > div:nth-child(7) > div > div > div > div.bJpcZ > div.vk_bk.h-n > span > span > span > span > span:nth-child(1) > span > span')

        if(hoursbool){
            hours=hoursbool.innerText
        }
        }
        else{
        var addressbool = document.querySelector('#kp-wp-tab-overview > div.TzHB6b.cLjAic.LMRCfc > div > div > div > div > div:nth-child(5) > div > div > div > span.LrzXr')

        if(addressbool){
            address=addressbool.innerText
        }


        var phonebool =document.querySelector('#kp-wp-tab-overview > div.TzHB6b.cLjAic.LMRCfc > div > div > div > div > div:nth-child(8) > div > div > div > span:nth-child(2) > span > a > span')

        
        if(phonebool){
            phone=phonebool.innerText
        }

        var hoursbool = document.querySelector('#kp-wp-tab-overview > div.TzHB6b.cLjAic.LMRCfc > div > div > div > div > div:nth-child(6) > div > div > div > div.bJpcZ > div.vk_bk.h-n > span > span > span > span > span:nth-child(1) > span > span')
        }

        if(hoursbool){
            hours=hoursbool.innerText
        }
    

        let items = {
            "Address": address,
            "phone":phone,
            "hours":hours,
        
        };
        return items;

        
    })

   await page.close()
   return data
}

exports.google = main