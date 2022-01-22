const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const subProduct = new Schema({
    name: {type: String},
    color: {type: String},
    size: {type: String},
    quantity_order: {type:Number},
    price: {type: Number},
    main_img: {type: String}
})

const cart = new Schema({
    username: {type: String, required: true},
    products: [subProduct]
},
{
    timestamps: true,
});


module.exports = mongoose.model('cart', cart);