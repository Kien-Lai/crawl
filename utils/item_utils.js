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

    $('.product_thumb_view > .wrapper > .block').each(function(i, data){
      let detailItemUrl = $($(this).find('.name > a')[0]).attr('href');
      let shopId = $($(this).find('.simple_tip')[0]).attr('href') ? $($(this).find('.simple_tip')[0]).attr('href').replace('/','') : '';
      fs.appendFileSync(`./file/`+filename+'_raw', detailItemUrl +'|');
      fs.appendFileSync(`./file/`+filename+'_raw', shopId+'\n');
    });
    await browser.close();
    resolve();
  } catch (error) {
    resolve();
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