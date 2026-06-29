const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  page.on('requestfailed', request => console.log('REQ FAILED:', request.url(), request.failure().errorText));

  await page.goto('http://localhost:5174', { waitUntil: 'networkidle2' });
  
  await page.evaluate(() => {
    const Vapi = require('@vapi-ai/web').default || require('@vapi-ai/web');
    const v = new Vapi('d2143b18-5509-4836-b600-c0592b6acd43');
    window.testVapi = v;
  });
  
  await page.evaluate(async () => {
    try {
      await window.testVapi.start('b47bd349-7d27-43e8-8667-0aa1c2b1189c', {
        firstMessage: "Here is a test override of the first message!"
      });
      console.log('Successfully started with firstMessage override');
      window.testVapi.stop();
    } catch(e) {
      console.error('FAILED with firstMessage:', e);
    }
  });

  await new Promise(r => setTimeout(r, 2000));
  await browser.close();
})();
