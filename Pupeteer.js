const puppeteer = require('puppeteer');

// starting Puppeteer
var grabPosts
const googleData = async (url) => {
    
   const as = await puppeteer.launch()
    .then(async browser => {
        obj1='jgv'


    // opening a new page and navigating to Reddit
    const page = await browser.newPage();
    await page.goto(url);


    // manipulating the page's content
    grabPosts = await page.evaluate(() => {


        //storing the post items in an array then selecting for retrieving content
        let address
        let phone
        let hours
        let vaccineinfo = document.querySelector('#kp-wp-tab-overview > div.TzHB6b.cLjAic.LMRCfc > div > div > div > div > div:nth-child(4) > div > c-wiz > div > div > span > a > span')
        if(vaccineinfo){

        address = document.querySelector('#kp-wp-tab-overview > div.TzHB6b.cLjAic.LMRCfc > div > div > div > div > div:nth-child(6) > div > div > div > span.LrzXr').innerText

        phone = document.querySelector('#kp-wp-tab-overview > div.TzHB6b.cLjAic.LMRCfc > div > div > div > div > div:nth-child(9) > div > div > div > span:nth-child(2) > span > a > span').innerText

        hours = document.querySelector('#kp-wp-tab-overview > div.TzHB6b.cLjAic.LMRCfc > div > div > div > div > div:nth-child(7) > div > div > div > div.bJpcZ > div.vk_bk.h-n > span > span > span > span > span:nth-child(1) > span > span').innerText

        }
        else{
        address = document.querySelector('#kp-wp-tab-overview > div.TzHB6b.cLjAic.LMRCfc > div > div > div > div > div:nth-child(5) > div > div > div > span.LrzXr').innerText

        phone=document.querySelector('#kp-wp-tab-overview > div.TzHB6b.cLjAic.LMRCfc > div > div > div > div > div:nth-child(8) > div > div > div > span:nth-child(2) > span > a > span').innerText

        hours = document.querySelector('#kp-wp-tab-overview > div.TzHB6b.cLjAic.LMRCfc > div > div > div > div > div:nth-child(6) > div > div > div > div.bJpcZ > div.vk_bk.h-n > span > span > span > span > span:nth-child(1) > span > span').innerText
        }
    

        let items = {
            "Address": address,
            "phone":phone,
            "hours":hours,
        
        };
      
        return items;
    });

    console.log("hvb" ,grabPosts,);
    // outputting the scraped data
  
    // closing the browser
    await browser.close();

    //return data 
    return grabPosts

})

.catch(function (err) {
    console.error(err);
});





}


exports.google = googleData