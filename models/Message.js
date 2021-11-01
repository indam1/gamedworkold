const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    text: {type: String, required: true},
    sender: {type: Types.ObjectId, ref: "User", required: true},
    discussion: {type: Types.ObjectId, ref: "Discussion", required: true}
})

module.exports = model('Message', schema)