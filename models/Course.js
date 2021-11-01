const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    name: {type: String, required: true},
    owner: {type: Types.ObjectId, ref: "User", required: true},
    objects: {type: Schema.Types.Mixed, unique: false}
})

module.exports = model('Course', schema)