const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const TypeSchema = new Schema({
    name : {type:String, require:true, trim:true},
},{
    toJSON : {virtuals : true},
    timestamps : true,
    collection:"types"
});
TypeSchema.virtual('tool',{
    ref: 'Tools',
    localField: '_id',
    foreignField:'type'
});
const type = mongoose.model("Type",TypeSchema)

module.exports = type