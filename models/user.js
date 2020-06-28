'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let UserSchema = Schema({
    name: String,
    surname: String,
    password: String,
    email: String,
    role: String,
    image: String
})

module.exports = mongoose.model('User', UserSchema)