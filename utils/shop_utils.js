const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const fs = require('fs');
const request = require('request');
const ROOT_URL = 'https://www.vatgia.com';

const _getShopDetailInfo = async (shopId, category, detailProductUrl, resolve) => {
    const url = `${ROOT_URL}/${shopId}&module=contact}`;
    const fileUrl = './result/'+category;
    console.log(`processing url: ${ROOT_URL}/${shopId}&module=contact` );
    try {
        request(url, (err, res, body) => {
            console.log(err);
            let $ = cheerio.load(body);
            // resource
            fs.appendFileSync(fileUrl,'vatgia|')
            // shop id
            fs.appendFileSync(fileUrl, shopId+'|');
            // successfult_online_trading
            let arrFont = $('.normal').find('font');
            let sot = null;
            for(let i=0; i<arrFont.length; i++){
                if($(arrFont[i]).text() == 'GD Online thành công(?)'){
                    sot = $($(arrFont[i]).parent().find('span')[0]).text()
                }
            }
            fs.appendFileSync(fileUrl, sot+'|');
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
            fs.appendFileSync(fileUrl,averageSum+'|');
            // category
            fs.appendFileSync(fileUrl,category+'|');

            request(detailProductUrl, (err, res, body) => {
                $ = cheerio.load(body);
                let mobile_number = '';

                // shop name
                fs.appendFileSync(fileUrl,$($('.estore_name.fl > .name')[0]).text()+'|');

                // mobile phone
                $('.estore_mobile_new_hide > a').each(function(){
                    mobile_number += ($(this).text()).replace(/ /g,'')+'-';
                });
                fs.appendFileSync(fileUrl,mobile_number+'|');

                // address
                let address = $($('.estore_address')[0]).attr('title'); 
                fs.appendFileSync(fileUrl,address+'|');

                request(`https://www.vatgia.com/${shopId}&module=estimate`, (err, res, body) => {
                    $ = cheerio.load(body);
                    // rating
                    let rating = null;
                    let arrTextNote = $('.text_note');
                    arrTextNote.each(function(){
                        if($(this).text() === "Được đánh giá tốt"){
                            rating = $($('.number')[0]).text();
                        }
                    })
                    fs.appendFileSync(fileUrl,rating+'\n');

                    resolve();
                })
                
            })
        })
        // await browser.close();
    } catch (error) {
        console.log(error);
        resolve();
    }
};

const getShopDetailInfo = (shopId, category, detailProductUrl) => {
    return new Promise((resolve, reject) => {
        _getShopDetailInfo(shopId, category, detailProductUrl, resolve);
    })
}

module.exports = getShopDetailInfo;