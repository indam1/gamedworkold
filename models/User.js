const {Schema, model} = require('mongoose')

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    fullName: {type: String, required: true},
    isConfirmed: {type: Boolean, required: true, defaultValue: false}
})

module.exports = model('User', schema)