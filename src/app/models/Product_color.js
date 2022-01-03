const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const product_color = new Schema({
    color: {type: String},
    color_img: {type: String}
},
{
    timestamps: true,
});

module.exports = mongoose.model('product_color', product_color);