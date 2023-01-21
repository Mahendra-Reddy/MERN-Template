const { string } = require('joi')
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: String,
    address: String,
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: String,
}, { timestamps: true })

const User = mongoose.model('User', userSchema)

module.exports = User