const user = require('../models/User')
module.exports.requireAuth = function (req, res, next) {
    user.findOne({
        username : req.cookies.userId,
        is_admin : true
    }).then(data => {
        if (data) {
            next();
        } else {
            res.redirect('/');
        }
    })
}