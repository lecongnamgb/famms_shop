
const homeRouter = require('./home');
const profileRouter = require('./profile')
const productRouter = require('./product')
const adminRouter = require('./admin')
const cartRouter = require('./cart');
const authAdminMiddleware = require('../app/middlewares/authAdmin.middleware');


module.exports = function route(app) {
    app.use('/admin',authAdminMiddleware.requireAuth, adminRouter);
    app.use('/profile', profileRouter);
    app.use('/cart', cartRouter);
    app.use('/product', productRouter);
    app.use('/', homeRouter);
}