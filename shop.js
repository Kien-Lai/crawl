const fs = require('fs');
const getShopDetailInfo = require('./utils/shop_utils');
const shop_config = require('./shop_config.json');

shop_config.forEach(async (file) => {
    let text = fs.readFileSync('./file/'+file.name, 'utf8');
    let arrayItem = text.split('\n');
    for(let i=0; i< arrayItem.length; i++){
        let shopId = arrayItem[i].slice(1, arrayItem[i].indexOf('&'));
        let category = file.name;
        await getShopDetailInfo(shopId, category);
    }
})