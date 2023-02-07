const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
    name : {type:String, require:true, trim:true},
    email : {type:String, require:true, trim:true, unique:true,index:true},
    password : {type:String, require:true, trim:true, minlength:4},
    role : {type:String, default:'Member'}
},{
    collection:"users"
});
const user = mongoose.model("User",UserSchema)

module.exports = user