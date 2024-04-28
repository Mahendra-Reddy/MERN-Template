const mongoose = require('mongoose')

const Schema = mongoose.Schema
mongoose.set('strictQuery', false);

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