const {Schema, model} = require('mongoose')

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    phone: {type: Number, required: false},
    creationDate: {type: Schema.Types.Date, required: true, default: Date.now},
    birthDate: {type: Schema.Types.Date, required: false},
    isConfirmed: {type: Boolean, required: true, defaultValue: false}
})

module.exports = model('User', schema)