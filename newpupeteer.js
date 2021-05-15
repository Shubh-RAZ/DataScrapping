const puppeteer = require('puppeteer');

// starting Puppeteer
puppeteer.launch().then(async browser => {

    // opening a new page and navigating to Reddit
    const page = await browser.newPage();
    await page.goto('https://www.google.com/search?q=Fortis+Hospital+Vashi&rlz=1C1CHBF_enIN859IN859&oq=Fortis+Hospital+Vashi&aqs=chrome..69i57j46i10i175i199j0i10l7.11711j0j15&sourceid=chrome&ie=UTF-8');


    // manipulating the page's content
    let grabPosts = await page.evaluate(() => {


        //storing the post items in an array then selecting for retrieving content
      

        let address = document.querySelector('#kp-wp-tab-overview > div.TzHB6b.cLjAic.LMRCfc > div > div > div > div > div:nth-child(5) > div > div > div > span.LrzXr').innerText
    

        let items = {
            "Address": address
        };

        return items;
    });

    // outputting the scraped data
    console.log(grabPosts);
    // closing the browser
    await browser.close();

}).catch(function (err) {
    console.error(err);
});