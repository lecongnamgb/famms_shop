const user = require('../models/User');
const user_information = require('../models/User_information');
module.exports.requireAuth = function (req, res, next) {
    if(!req.cookies.userId) {
        res.redirect('/');
        return;
    }


    user.findOne({
        username : req.cookies.userId
    }).then(data => {
        if (data) {
            next();
        } else {
            res.redirect('/');
        }
    })
}