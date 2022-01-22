const user = require('../models/User');
const user_information = require('../models/User_information');
const product = require('../models/Product');
const cart = require('../models/Cart')
const {mongooseToObject, arrayToObject } = require('../../util/mongoose');
class HomeController {
    home(req, res, next) {
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
            if(!user_data) {
                res.render('home', {
                    product_typeOfShirts: arrayToObject(product_typeOfShirt_data),
                    product_typeOfTrousers: arrayToObject(product_typeOfTrouser_data),
                    product_typeOfAccessories: arrayToObject(product_typeOfAccessory_data)
                })
            }
            else {
            res.render('home', {
                user: mongooseToObject(user_data),
                user_information: mongooseToObject(user_information_data),
                product_typeOfShirts: arrayToObject(product_typeOfShirt_data),
                product_typeOfTrousers: arrayToObject(product_typeOfTrouser_data),
                product_typeOfAccessories: arrayToObject(product_typeOfAccessory_data)
            })
        }
        })
    }
    signIn(req, res, next) {
        var username = req.body.username;
        var password = req.body.password;
        var phone_number = req.body.sdt;
        var email = req.body.email;
        var confirmPw = req.body.confirmPw;
        if (confirmPw !== password) {
            res.json('mat khau va nhap lai ko khop');
        } else {
            user.findOne({
                username: username
            }).then(data => {
                if (data) res.json('tai khoan da ton tai')
                else { 
                    user.create({
                    username,
                    password
                })
                user_information.create({
                    username,
                    phone_number,
                    email
                })
                return;
            }
            }).then(data => {
                res.json('tao tai khoan thanh cong')
            }).catch(error => res.json('loi server'))
        }
    }

    profile(req, res, next) {
        user.findOne(req.body)
        .then(user => {
            if(user) { 
                var link = 'profile/' + user._id;
                res.cookie('userId', user.username);
                res.cookie('is_admin', user.is_admin);
                res.redirect(link);
                //res.render('profile', {user: mongooseToObject(user)});
        }
            else res.json('dang nhap that bai');
        })
        .catch(error => {
            console.log(error);
            res.json(error);
        })
    }


    forgetPw(req, res, next) {
        user.findOne(req.body).then(data => {
            if (data) res.json(data.password)
            else res.json('khong tim dc nguoi dung')
        })
    }

    logOut(req, res, next) {
        res.clearCookie('userId');
        res.clearCookie('is_admin');
        res.redirect('home');
    }
}

module.exports = new HomeController;