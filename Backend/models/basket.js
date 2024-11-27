const mongoose = require('mongoose');

const basketSchema = new mongoose.Schema({
    name: String,
    image: String,
    icon: String,
    original_price: Number,
    discount: Number,
    fresho: String,
    kg: Number,
});

const basket = mongoose.model('basket', basketSchema);
module.exports = basket;
