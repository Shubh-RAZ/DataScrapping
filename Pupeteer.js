const puppeteer = require('puppeteer');

// starting Puppeteer
var grabPosts
var array =[]


const googleData = async (url) => {
    var dt
    
    puppeteer.launch()
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
      array.push(items)
        return items;
    });
    array.push(grabPosts)
    dt = grabPosts
    console.log("hvb" ,grabPosts,);
    // outputting the scraped data
  
    // closing the browser
    await browser.close();

    //return data 


    })

    .catch(function (err) {
        console.error(err);
    });



return dt

}

const main = async () => {
    var d = googleData('https://www.google.com/search?q=Terna+Hospital+Nerul&rlz=1C1CHBF_enIN859IN859&oq=Terna+Hospital+Nerul&aqs=chrome..69i57j46i10i175i199j0i10l7.11711j0j15&sourceid=chrome&ie=UTF-8')
    console.log("d",d)
    console.log('ary',array)
}

main()

exports.google = main