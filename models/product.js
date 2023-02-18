const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const ProductSchema = new Schema({
    name : {type:String, require:true, trim:true},
},{
    toJSON : {virtuals : true},
    timestamps : true,
    collection:"products"
});
const product = mongoose.model("Products",ToolSchema)

module.exports = product