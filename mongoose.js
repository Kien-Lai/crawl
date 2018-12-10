const mongoose = require('mongoose');

mongoose.connect('mongodb://userB2W:CW08eydP3rEpTjje@localhost:27017/sampledb', (err, data) => {
    console.log(err || 'successful connection');
});

const VatGia = mongoose.model('vatgia', {
    shop_id: String,
    resource: String,
    successful_trading: String,
    average_price: String,
    category: String,
    shop_name: String,
    phone_number: String,
    address: String,
    rating: String,
    email: String,
    reputation_rating: String
});

// read and persit data to db
const fs = require('fs');
const data = fs.readFileSync('./result/me-be', 'utf8');
const cookedData = data.split('\n');

cookedData.forEach((e) => {
    e = e.split('|');
    let record = {
        resource: 'vatgia',
        shop_id: e[1],
        successful_trading: e[2],
        average_price: e[3],
        category: e[4],
        shop_name: e[5],
        phone_number: e[6],
        address: e[7],
        rating: e[8]
    }
    console.log(record);
    (new VatGia(record)).save();
})