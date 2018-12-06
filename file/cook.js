const fs = require('fs');
const _ = require('lodash')
const file = require('../config.json');

let cookedData = [];
const raw = fs.readFileSync(`${file.name}_raw`, 'utf8').split('\n');
cookedData = _.uniqBy(raw, (e) => {
    return e.slice(1, e.indexOf('&'));
})
cookedData = _.filter(cookedData, (e) => {
    return e.indexOf('&') != -1;
})

fs.writeFileSync(`${file.name}`, cookedData.join('\n'), 'utf8');