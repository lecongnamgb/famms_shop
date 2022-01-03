const user = require('../models/User');
const user_information = require('../models/User_information');
const product = require('../models/Product')
const product_color = require('../models/Product_color');
const {mongooseToObject, multipleMongooseToObject, arrayToObject } = require('../../util/mongoose');

class Admin {
    add(req, res, next) {
        let user_query = user.findOne({is_admin: true});
        let product_type_query = product.find().distinct('type');
        let product_color_query = product.find().distinct('color');
        let product_typeOfShirt_query = product.find({
            category: "Áo"
        }).distinct('type');
        let product_typeOfTrouser_query = product.find({
            category: "Quần"
        }).distinct('type');
        let product_typeOfAccessory_query = product.find({
            category: "Phụ kiện"
        }).distinct('type');

        Promise.all([
            user_query, 
            product_type_query, 
            product_color_query,
            product_typeOfShirt_query, 
            product_typeOfTrouser_query,
            product_typeOfAccessory_query
        ])
        .then(([
            user_data, 
            product_types, 
            product_colors,
            product_typeOfShirts, 
            product_typeOfTrousers,
            product_typeOfAccessories
        ]) => {
            user_information.findOne({
                username: user_data.username
            })
            .then(userInfo_data => {
                res.render('admin/addProduct', {
                    user: mongooseToObject(user_data),
                    user_information: mongooseToObject(userInfo_data),
                    product_types: arrayToObject(product_types),
                    product_colors: arrayToObject(product_colors),
                    product_typeOfShirts: arrayToObject(product_typeOfShirts),
                    product_typeOfTrousers: arrayToObject(product_typeOfTrousers),
                    product_typeOfAccessories: arrayToObject(product_typeOfAccessories)
                })
            })
        } )
    }

    manage(req, res, next) {
        user.findOne({
            is_admin:true
        }).then(user_data => {
            user_information.findOne({
                username: user_data.username
            })
            .then(user_information_data => {
                res.render('admin/manageProduct', {
                    user: mongooseToObject(user_data),
                    user_information: mongooseToObject(user_information_data)
                })
            })  
        })
    }

    addProduct(req, res, next) {
       // const add_product_query = product.create(req.body);
        product_color.findOne({
            color: req.body.color
        }).then(data => {
            if(data) {
                product.create(req.body).then( () => {
                    res.redirect('/product');
                }
        )
                
            } else {
                //const add_product_color_query = product_color.create(req.body);
                Promise.all([product.create(req.body), product_color.create(req.body)])
                .then(() => {
                   res.redirect('/')
                })
            }
        })

    }
}

module.exports = new Admin;