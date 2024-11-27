const mongoose = require('mongoose');

const veggieSchema = new mongoose.Schema({
    name: String,
    image: String,
    icon: String,
    original_price: Number,
    discount: Number,
    fresho: String,
});

const vegetable = mongoose.model('vegetable', veggieSchema);
module.exports = vegetable;
