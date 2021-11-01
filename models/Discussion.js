const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    theme: {type: String, required: true},
    creator: {type: Types.ObjectId, ref: "User", required: true},
})

module.exports = model('Discussion', schema)