const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    username: String,
    password: String
},{strict: false});

const Users = mongoose.model('users',schema);


module.exports = Users;
