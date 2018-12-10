const fs = require('fs');
const excel = require('exceljs');
const text = fs.readFileSync('./result', 'utf8');
const array = text.split('\n');

const workbook = new excel.Workbook();
const sheet = workbook.addWorksheet('result');
sheet.addRow(['Nguồn','shop id','số gd thành công','giá trung bình','category','Tên shop','SĐT','Địa chỉ','Rating']);
array.forEach(e => {
    sheet.addRow(e.split('|'));
})

workbook.xlsx.writeFile('./result.xlsx', () => {

})
