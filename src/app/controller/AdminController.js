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
        let user_query = user.findOne({is_admin: true});
        let product_typeOfShirt_query = product.find({
            category: "Áo"
        }).distinct('type');
        let product_typeOfTrouser_query = product.find({
            category: "Quần"
        }).distinct('type');
        let product_typeOfAccessory_query = product.find({
            category: "Phụ kiện"
        }).distinct('type');
        let product_query = product.find().sort({"category": -1, "type": -1, "name": -1, "color": -1});

        Promise.all([
            user_query, 
            product_query, 
            product_typeOfShirt_query,
            product_typeOfTrouser_query,
            product_typeOfAccessory_query
        ])
        .then(([
            user_data,
            product_data,
            product_typeOfShirt_data,
            product_typeOfTrouser_data,
            product_typeOfAccessory_data
        ]) => {
            user_information.findOne({username: user_data.username})
            .then(userInfo_data => {
            res.render('admin/manageProduct', {
                user: mongooseToObject(user_data),
                user_information: mongooseToObject(userInfo_data),
                products: multipleMongooseToObject(product_data),
                product_typeOfShirts: arrayToObject(product_typeOfShirt_data),
                product_typeOfTrousers: arrayToObject(product_typeOfTrouser_data),
                product_typeOfAccessories: arrayToObject(product_typeOfAccessory_data)
            })})
        })
    }

    addProduct(req, res, next) {
        product_color.findOne({
            color: req.body.color
        }).then(data => {
            if(data) {
                product.findOne({
                    name: req.body.name,
                    color: req.body.color
                }).then(data => {
                    if (data) {
                        res.json('Đã có sản phẩm này rồi!')
                    } else {
                        product.create(req.body).then(() => {
                            res.redirect('/')
                        })
                    }
                })
                
            } else {
                Promise.all([product.create(req.body), product_color.create(req.body)])
                .then(() => {
                   res.redirect('/')
                })
            }
        })
    }

    update(req, res, next) {
        product.updateOne({
            _id: req.params.id
        }, req.body).then(() => {
            res.json('update thanh cong')
        }).catch(err => {
            res.json(err);
        })
    }

    edit (req, res, next) {
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

        let product_query = product.findOne({_id: req.params.id});
        Promise.all([
            user_query,
            product_query, 
            product_type_query, 
            product_color_query,
            product_typeOfShirt_query, 
            product_typeOfTrouser_query,
            product_typeOfAccessory_query
        ])
        .then(([
            user_data, 
            product_data,
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
                res.render('admin/editProduct', {
                    user: mongooseToObject(user_data),
                    product: mongooseToObject(product_data),
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
}

module.exports = new Admin;