const mongoose = require('mongoose');
const generate = require('../helpers/generate');

const accountsSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    token: {    // -> chuỗi random
       type: String,
       default: generate.generateRandomString(30)
    }, 
    avatar: String,
    status: String,

    role_id: String,


    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date

}, {timestamps: true});

const Account = mongoose.model("Account", accountsSchema, "accounts");

module.exports = Account;