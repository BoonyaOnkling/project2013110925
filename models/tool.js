const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const ToolSchema = new Schema({
    name : {type:String, require:true, trim:true},
    type : {type:Schema.Types.ObjectId, ref:'Type'},
    price : {type:Number},
    stock : {type: Number, default:100},
},{
    toJSON : {virtuals : true},
    timestamps : true,
    collection:"tools"
});
ToolSchema.virtual('price_vat').get(function(){
    return (this.price*0.07) + this.price;
})

const tool = mongoose.model("Tools",ToolSchema)

module.exports = tool