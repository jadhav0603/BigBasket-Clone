const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
    name: String,
    image: String,
    original_price: Number,
    discount: Number,
    fresho: String,
});

// const seller = mongoose.model('bestSeller', sellerSchema);

const seller = mongoose.model('bestSeller', sellerSchema, 'bestSeller');


module.exports = seller;
