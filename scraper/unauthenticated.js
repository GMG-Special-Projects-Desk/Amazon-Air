const puppeteer = require('puppeteer');
const aircrafts = ["n662gt","n404kz"]
const CREDS = require('./creds');
var fs  = require('fs');
async function run() {
	const browser = await puppeteer.launch({
  		headless: false
  	});
	const page = await browser.newPage();

	for (let n of aircrafts) {
		await page.goto("https://www.flightradar24.com/data/aircraft/"+n);
	  	await page.waitFor(5000);
	  	const data = await page.evaluate(() => {
	    	return document.querySelector('table').innerHTML
	  	});
	  	await page.waitFor(5000);
		fs.writeFileSync("data/"+process.argv[2]+"-"+n+".html", data, 'utf-8'); 	
	};
	await browser.close()
}


run()