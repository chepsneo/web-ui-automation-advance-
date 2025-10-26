const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');
const path = require('path');

describe('SauceDemo Screenshot Test with Hooks', function () {
    let driver;

    before(async function () {
        const options = new chrome.Options();
        options.addArguments("--headless");
        driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
    });

    after(async function () {
        await driver.quit();
    });

    afterEach(async function () {
        const screenshot = await driver.takeScreenshot();
        const testName = this.currentTest.title.replace(/\s+/g, '_');
        const filePath = path.join(__dirname, '../screenshots', `${testName}.png`);
        fs.writeFileSync(filePath, screenshot, 'base64');
        console.log(`Screenshot disimpan: ${filePath}`);
    });

    it('Visit SauceDemo dan cek title', async function () {
        await driver.get('https://www.saucedemo.com');
        const title = await driver.getTitle();
        console.log('Title:', title);
    });
});