const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const fs = require('fs');

const _getItemInfoPageUrl = async (url, filename, resolve) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const body = await page.evaluate(() => document.body.innerHTML);
    const $ = cheerio.load(body);

    $('.product_thumb_view > .wrapper > .block > .name > a').each(function(i, data){
        // get item info page url 
        // console.log(i);
        // console.log($(this).attr('href'));
        fs.appendFileSync(`./file/`+filename+'_raw', `${$(this).attr('href')}\n`);
    });
    await browser.close();
    resolve();
  } catch (error) {
    console.log(error);
  }
};

const getItemInfoPageUrl = (url, filename) => {
  console.log('processing: '+url+'...');
  return new Promise((resolve, reject) => {
    _getItemInfoPageUrl(url, filename, resolve);
  })
}

module.exports = getItemInfoPageUrl;