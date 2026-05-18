import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  
  try {
    await page.goto('http://localhost:5173/products/1', { waitUntil: 'networkidle2' });
    const bodyHTML = await page.evaluate(() => document.body.innerHTML);
    if (bodyHTML.includes('Runtime Error') || bodyHTML.includes('Unhandled Promise Rejection')) {
      console.log('--- HTML ERROR OVERLAY ---');
      console.log(bodyHTML.substring(0, 1000));
    } else {
      console.log('No error overlay found.');
    }
  } catch (err) {
    console.log('NAVIGATION ERROR:', err.message);
  }
  
  await browser.close();
})();
