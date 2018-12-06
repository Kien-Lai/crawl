const getItemInfoPageUrl = require('./utils/item_utils');
const item_config = require('./config.json');

const {name, root_url, total_page} = item_config;

(async (name, root_url, total_page) => {
    for(let i=1; i<= total_page; i++){
        await getItemInfoPageUrl(`${root_url},${i}`, name);
    }
})(name, root_url, total_page);
