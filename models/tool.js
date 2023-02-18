const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const ToolSchema = new Schema({
    name : {type:String, require:true, trim:true},
    type : {type:String, require:true, trim:true},
    price : {type: Schema.Types.Number},
    stock : {type: Number, default:100},
},{
    toJSON : {virtuals : true},
    timestamps : true,
    collection:"tools"
});
const tool = mongoose.model("Tools",ToolSchema)

module.exports = tool