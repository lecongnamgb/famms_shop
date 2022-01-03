const user = require('../models/User');
const user_information = require('../models/User_information');
const product = require('../models/Product');
const {mongooseToObject, arrayToObject} = require('../../util/mongoose')
const jwt = require('jsonwebtoken');
const url = require('url');
class ProfileController {

    //[PUT] /profile/update
    update_info(req, res, next) {
        var q = url.parse(req.url, true);
        var id = q.pathname.slice(1, 25);
        var oldPw = req.body.oldPw;
        var newPw = req.body.newPw;
        var confirmPw = req.body.confirmPw;
        if(id.match(/^[0-9a-fA-F]{24}$/)) {
            user_information.findOne({_id: id})
            .then(user_infor => {
                if(oldPw != "") {
                    user.findOne({
                        username: user_infor.username
                    }).then(data => {
                        if (data.password !== oldPw) {
                            res.json('nhap sai mat khau')
                        }
                        else  if (newPw !== confirmPw) {
                                res.json("nhap lai mat khau khong khop");
                        }  else {
                                user.updateOne({
                                    username: data.username
                                }, {
                                    password: newPw
                                })
                                .then(() => {
                                    user_information.updateOne({
                                        username: req.body.username
                                    }, req.body)
                                })
                                .then(() => {
                                    res.json('doi mat khau thanh cong');
                                })
                        }
                    }).catch(err => res.json(err));
            } else {
                user_information.updateOne({_id: id} , req.body)
                .then(() => res.redirect('/home'))
            }
            });
    } else {
        res.json('loi id');
    }


    }
    user_profile(req, res, next) {
        var q = url.parse(req.url, true);
        var id = q.pathname.slice(1, q.pathname.length);

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

        if(id.match(/^[0-9a-fA-F]{24}$/)) {
            Promise.all([
                user_query,
                user_information_query,
                product_typeOfShirt_query,
                product_typeOfTrouser_query,
                product_typeOfAccessory_query
            ]).then(([
                user_data,
                user_information_data,
                product_typeOfShirt_data,
                product_typeOfTrouser_data,
                product_typeOfAccessory_data
            ]) => {
                res.render('profile', {
                    user: mongooseToObject(user_data),
                    user_information: mongooseToObject(user_information_data),
                    product_typeOfShirts: arrayToObject(product_typeOfShirt_data),
                    product_typeOfTrousers: arrayToObject(product_typeOfTrouser_data),
                    product_typeOfAccessories: arrayToObject(product_typeOfAccessory_data)
                })
            })
        } else {
        res.json('khong tim thay user');
        };
}
}

module.exports = new ProfileController;