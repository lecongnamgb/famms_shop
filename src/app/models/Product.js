const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const Schema = mongoose.Schema;

const product = new Schema({
    name: {type: String},
    type: {type: String},
    color: {type: String},
    price_default: {type: Number},
    price_after_sale: {type: Number},
    percent_sale: {type: Number},
    price_double_sale: {type: Number},
    quantity_in_stock: {type: Number},
    main_img: {type: String},
    hover_img: {type: String},
    state: {type: String},
    is_sale: {type: Boolean, default: false},
    slug: {type: String, slug: ['name','color'], unique: true},
    review_star: {type: Number, default: 5},
    category: {type: String},
    review_comment: {type: String}
},
{
    timestamps: true,
});
module.exports = mongoose.model('product', product);