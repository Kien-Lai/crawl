const getItemInfoPageUrl = require('./utils/item_utils');
const item_config = require('./item_config.json');

item_config.forEach(async ({name, root_url, total_page}) => {
    for(let i=1; i<= total_page; i++){
        await getItemInfoPageUrl(`${root_url},${i}`, name);
    }
});
