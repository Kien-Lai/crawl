// const fs = require('fs');
// const excel = require('exceljs');
// const text = fs.readFileSync('./result', 'utf8');
// const array = text.split('\n');

// const workbook = new excel.Workbook();
// const sheet = workbook.addWorksheet('result');
// sheet.addRow(['Tên shop','SĐT','Địa chỉ','Rating']);
// array.forEach(e => {
//     sheet.addRow(e.split('|'));
// })

// workbook.xlsx.writeFile('./result.xlsx', () => {

// })

const str = 'https://www.vatgia.com/khoaquanghung&module=product&view=detail&record_id=2615295';

console.log(str.indexOf('&'));

const result = str.slice(20,str.indexOf('&'));

console.log(result);