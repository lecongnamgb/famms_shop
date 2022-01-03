const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const user = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    is_admin: {type: Boolean, default: false}
},
{
    timestamps: true,
});

module.exports = mongoose.model('user', user);