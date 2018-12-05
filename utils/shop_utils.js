const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const fs = require('fs');
const request = require('request');
const ROOT_URL = 'https://www.vatgia.com';

const _getShopDetailInfo = async (shopId, category, resolve) => {
    const url = `${ROOT_URL}/${shopId}&module=contact}`;
    console.log(`processing url: ${ROOT_URL}/${shopId}&module=contact` );
    try {
        request(url, (err, res, body) => {
            console.log(err);
            const $ = cheerio.load(body);
            // resource
            fs.appendFileSync('./result','vatgia|')
            // shop name
            fs.appendFileSync('./result',$($('.estore_statistic > .normal > b')[0]).text()+'|');
            // shop id
            fs.appendFileSync('./result', shopId+'|');
            // successfult_online_trading
            let arrFont = $('.normal').find('font');
            let sot = null;
            for(let i=0; i<arrFont.length; i++){
                if($(arrFont[i]).text() == 'GD Online thành công(?)'){
                    sot = $($(arrFont[i]).parent().find('span')[0]).text()
                }
            }
            fs.appendFileSync('./result', sot+'|');
            // average price
            let arrRaoVat = $('.new_raovat').find('li').find('span');
            let arrPriceString = [];
            let arrPrice = [];
            let sum = 0;
            arrRaoVat.each(function(i, e){
                arrPriceString.push($(this).text());
            })
            arrPriceString.forEach((e) => {
                let priceString = e.split(' ')[0].split('.').join('');
                let price = parseFloat(priceString);
                if(price){
                    arrPrice.push(price);
                }
            })
            arrPrice.forEach(e => sum+=e);
            let averageSum = sum/arrPrice.length;
            averageSum = (Math.floor(averageSum/1000))*1000;
            fs.appendFileSync('./result',averageSum+'|');
            // category
            fs.appendFileSync('./result',category+'\n');
            
            resolve();
        })
        // await browser.close();
    } catch (error) {
        console.log(error);
        resolve();
    }
};

const getShopDetailInfo = (shopId, category) => {
    return new Promise((resolve, reject) => {
        _getShopDetailInfo(shopId, category, resolve);
    })
}

module.exports = getShopDetailInfo;