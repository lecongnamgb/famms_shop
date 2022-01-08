const user = require('../models/User');
const user_information = require('../models/User_information');
const product = require('../models/Product');
const {mongooseToObject, multipleMongooseToObject, arrayToObject } = require('../../util/mongoose');
class ProductController {
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

        const productTypeChosen_query = product.find(req.params);

        Promise.all([
            user_query,
            user_information_query,
            product_typeOfShirt_query,
            product_typeOfTrouser_query,
            product_typeOfAccessory_query,
        ]).then(([
            user_data,
            user_information_data,
            product_typeOfShirt_data,
            product_typeOfTrouser_data,
            product_typeOfAccessory_data,
        ]) => {
            if(!user_data) {
                res.render('product_information', {
                    product_typeOfShirts: arrayToObject(product_typeOfShirt_data),
                    product_typeOfTrousers: arrayToObject(product_typeOfTrouser_data),
                    product_typeOfAccessories: arrayToObject(product_typeOfAccessory_data),
                })
            }
            else {
            res.render('product_information', {
                user: mongooseToObject(user_data),
                user_information: mongooseToObject(user_information_data),
                product_typeOfShirts: arrayToObject(product_typeOfShirt_data),
                product_typeOfTrousers: arrayToObject(product_typeOfTrouser_data),
                product_typeOfAccessories: arrayToObject(product_typeOfAccessory_data),

            })
        }
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