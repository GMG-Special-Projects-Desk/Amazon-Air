const puppeteer = require('puppeteer');
const aircrafts = ["N582FE","N583FE","N584FE","N585FE","N586FE","N587FE","N588FE","N589FE","N590FE","N591FE","N592FE","N593FE","N594FE","N595FE","N596FE","N597FE","N598FE","N599FE","N601FE","N602FE","N603FE","N604FE","N605FE","N607FE","N608FE","N609FE"]
const CREDS = require('./creds');
var fs  = require('fs');
async function run() {
	const browser = await puppeteer.launch({
  		headless: false
  	});
  	const USERNAME_SELECTOR = '#fr24_SignInEmail';
	const PASSWORD_SELECTOR = '#fr24_SignInPassword';
	const BUTTON_SELECTOR = "#fr24_SignIn";
	const page = await browser.newPage();
	await page.goto('https://www.flightradar24.com');
	console.log("here")
	await page.click("#premiumOverlay > a > span");
	console.log("here")
	await page.click(USERNAME_SELECTOR);
	await page.keyboard.type(CREDS.username);
	await page.click(PASSWORD_SELECTOR);
	await page.keyboard.type(CREDS.password);
	await page.click(BUTTON_SELECTOR);
	await page.waitForNavigation();
	for (let n of aircrafts) {
		await page.goto("https://www.flightradar24.com/data/aircraft/"+n);
		await page.click("#btn-load-earlier-flights");
		await page.waitFor(5000)
		await page.click("#btn-load-earlier-flights");
		await page.waitFor(5000)
		await page.click("#btn-load-earlier-flights");
	  	const data = await page.evaluate(() => {
	    	return document.querySelector('table').innerHTML
	  	});
	  	await page.waitFor(5000)
		fs.writeFileSync("data/"+process.argv[2]+"-"+n+".html", data, 'utf-8'); 	
	};
	await browser.close()

}


run()