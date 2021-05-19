const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://dashboard.covid19.ap.gov.in/ims/hospbed_reports/');

  // Get the "viewport" of the page, as reported by the page.
  const dimensions = await page.evaluate(() => {
 
      let width = document.querySelector('#adminTable > div > div > div > button:nth-child(2)').onclick
    return width
  });



  console.log('Dimensions:', dimensions);
  

  await browser.close();
})();