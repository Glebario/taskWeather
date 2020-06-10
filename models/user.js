const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        userName: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        }
    }
})

module.exports = mongoose.model('users', userSchema)
