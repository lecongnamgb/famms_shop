const user = require('../models/User');
const user_information = require('../models/User_information');
const product = require('../models/Product');
const product_color = require('../models/Product_color');
const cart = require('../models/Cart');

const {mongooseToObject, multipleMongooseToObject, arrayToObject } = require('../../util/mongoose');
class ProductController {
    addToCart(req, res, next) {
        if(!req.cookies.userId) {
            res.json('Bạn phải đăng nhập thì mới có thể sử dụng tính năng này');
        }
        cart.findOne({
            username: req.cookies.userId
        }).then(user => {
            if(!user) {
                cart.create({
                    username: req.cookies.userId,
                    products: req.body
                }).then(() => {
                    res.redirect('back');
                }).catch(err => {
                    res.json(err);
                }
                )
            } else {
                cart.findOne({
                    username: req.cookies.userId,
                }).then(userData => {
                    var oldValue = 0;
                    var hasAlready = false;
                    for (var i = 0; i < userData.products.length; i++) {
                        if (userData.products[i].name === req.body.name
                            && userData.products[i].size === req.body.size
                            && userData.products[i].color === req.body.color
                            ) {
                                oldValue = userData.products[i].quantity_order;
                                hasAlready = true;
                            }
                    }
                    if(hasAlready) {
                        cart.updateOne({
                            username: req.cookies.userId,
                            "products.name" : req.body.name,
                            "products.size" : req.body.size,
                            "products.color": req.body.color         
                        }, {
                            $set: {
                                "products.$.quantity_order": Number(oldValue) + Number(req.body.quantity_order),
                            }
                        }).then(() => {
                            res.redirect('back');
                        })
                    } else {
                        cart.updateOne({
                            username: req.cookies.userId
                        }, {
                            $push: {
                                products: req.body
                            }
                        }).then(()=> {
                            res.redirect('back');
                        })
                    }
                })
            }
        })
    }

    product_information(req, res, next) {
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
        });

        const productTypeChosen_query = product.findOne(req.params);
        product.find({
            type: req.params.type,
            name: req.params.name
        })
        .then((data) => {
            var obj = [];
            for (let i = 0; i < data.length; i++) {
                obj[i] = data[i].color;
            }
            product_color.find({
                color: {$in : obj}
            }).then(productTypeChosenColor_data => {
                Promise.all([
                    user_query,
                    user_information_query,
                    product_typeOfShirt_query,
                    product_typeOfTrouser_query,
                    product_typeOfAccessory_query,
                    productTypeChosen_query,
                    cart_query,
                ]).then(([
                    user_data,
                    user_information_data,
                    product_typeOfShirt_data,
                    product_typeOfTrouser_data,
                    product_typeOfAccessory_data,
                    productTypeChosen_data,
                    cart_data,
                ]) => {
                    if(!user_data) {
                        res.render('product_information', {
                            product_typeOfShirts: arrayToObject(product_typeOfShirt_data),
                            product_typeOfTrousers: arrayToObject(product_typeOfTrouser_data),
                            product_typeOfAccessories: arrayToObject(product_typeOfAccessory_data),
                            product_typeChosen: mongooseToObject(productTypeChosen_data),
                            product_typeChosenColors: multipleMongooseToObject(productTypeChosenColor_data),
                            current_product: req.params,
                        })
                    }
                    else {
                        if (cart_data) {
                            res.render('product_information', {
                                user: mongooseToObject(user_data),
                                user_information: mongooseToObject(user_information_data),
                                product_typeOfShirts: arrayToObject(product_typeOfShirt_data),
                                product_typeOfTrousers: arrayToObject(product_typeOfTrouser_data),
                                product_typeOfAccessories: arrayToObject(product_typeOfAccessory_data),
                                product_typeChosen: mongooseToObject(productTypeChosen_data),
                                product_typeChosenColors: multipleMongooseToObject(productTypeChosenColor_data),
                                current_product : req.params,
                                quantity_in_cart: cart_data.products.length,
                            })
                        }
                        else {
                            res.render('product_information', {
                                user: mongooseToObject(user_data),
                                user_information: mongooseToObject(user_information_data),
                                product_typeOfShirts: arrayToObject(product_typeOfShirt_data),
                                product_typeOfTrousers: arrayToObject(product_typeOfTrouser_data),
                                product_typeOfAccessories: arrayToObject(product_typeOfAccessory_data),
                                product_typeChosen: mongooseToObject(productTypeChosen_data),
                                product_typeChosenColors: multipleMongooseToObject(productTypeChosenColor_data),
                                current_product : req.params,
                                quantity_in_cart: 0,
                            })
                        }
                }
                })
            })
        })
    }
    product(req, res, next) {
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
        const type_product_query = product.find(
            req.params
        )

        Promise.all([
            user_query,
            user_information_query,
            product_typeOfShirt_query,
            product_typeOfTrouser_query,
            product_typeOfAccessory_query,
            type_product_query
        ]).then(([
            user_data,
            user_information_data,
            product_typeOfShirt_data,
            product_typeOfTrouser_data,
            product_typeOfAccessory_data,
            type_product_data
        ]) => {
            if(!user_data) {
                res.render('product', {
                    product_typeOfShirts: arrayToObject(product_typeOfShirt_data),
                    product_typeOfTrousers: arrayToObject(product_typeOfTrouser_data),
                    product_typeOfAccessories: arrayToObject(product_typeOfAccessory_data),
                    type_products: multipleMongooseToObject(type_product_data),
                })
            }
            else {
            res.render('product', {
                user: mongooseToObject(user_data),
                user_information: mongooseToObject(user_information_data),
                product_typeOfShirts: arrayToObject(product_typeOfShirt_data),
                product_typeOfTrousers: arrayToObject(product_typeOfTrouser_data),
                product_typeOfAccessories: arrayToObject(product_typeOfAccessory_data),
                type_products: multipleMongooseToObject(type_product_data),
                type_name: req.params
            })
        }
        })
    }
}

module.exports = new ProductController;