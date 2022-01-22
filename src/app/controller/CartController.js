const user = require('../models/User');
const user_information = require('../models/User_information');
const product = require('../models/Product');
const cart = require('../models/Cart');
const {mongooseToObject, arrayToObject } = require('../../util/mongoose');


class Cart {

    remove(req, res, next) {
        cart.updateOne({
            username: req.cookies.userId
        }, {
            "$pull": {
                "products": {
                    _id: req.params.id
                }
            }
        }).then(() => {
            res.redirect('back');
        })
    }

    cart(req, res, next) {
        const user_query = user.findOne({username: req.cookies.userId});
        const user_information_query = user_information.findOne({username: req.cookies.userId});
        const product_typeOfShirt_query = product.find({
            category: "Áo"
        }).distinct('type');
        const product_typeOfTrouser_query = product.find({
            category: "Quần"
        }).distinct('type');
        const product_typeOfAccessory_query = product.find({
            category: "Phụ kiện"
        }).distinct('type');
        const cart_query = cart.findOne({
            username: req.cookies.userId
        })

        Promise.all([
            user_query,
            user_information_query,
            product_typeOfShirt_query,
            product_typeOfTrouser_query,
            product_typeOfAccessory_query,
            cart_query,
        ]).then(([
            user_data,
            user_information_data,
            product_typeOfShirt_data,
            product_typeOfTrouser_data,
            product_typeOfAccessory_data,
            cart_data,
        ]) => {
            if(!user_data) {
                res.json('Bạn phải đăng nhập thì mới có thể sử dụng tính năng này');
            }
            else {
            res.render('cart', {
                user: mongooseToObject(user_data),
                user_information: mongooseToObject(user_information_data),
                product_typeOfShirts: arrayToObject(product_typeOfShirt_data),
                product_typeOfTrousers: arrayToObject(product_typeOfTrouser_data),
                product_typeOfAccessories: arrayToObject(product_typeOfAccessory_data),
                cart: mongooseToObject(cart_data),
            })
        }
        })
    }
}

module.exports = new Cart;

