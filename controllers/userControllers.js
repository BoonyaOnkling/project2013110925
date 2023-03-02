const User = require("../models/user");
const { validationResult } = require('express-validator');
const jwt = require("jsonwebtoken")

exports.index = async(req, res, next) =>{
    const user  = await User.find()
    res.status(200).json({
        data : user,
    })
}

exports.register = async(req, res ,next) =>{
    try{
        const { name, email, password } = req.body;

    //เช็คการใส่ข้อมูล
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("มีบางข้อมูลใส่ไม่ครบ")
      error.statusCode = 422  // common validation
      error.validation = errors.array()
      throw error
    }

    //check email exist
    const existemail = await User.findOne({ email: email });
    if (existemail) {
      const error = new Error("อีเมลล์นี้มีผู้ใช้แล้ว")
      error.statusCode = 400
      throw error
    }

    //save
    let user = new User();
    user.name = name;
    user.email = email;
    user.password = await user.encryptPassword(password);  //encrypt password

    await user.save();

    res.status(201).json({
      messege: "ลงทะเบียนเรียบร้อย",
    }); 
    }catch(error){
        next(error)
    }
 }

 exports.setrole = async(req, res, next) =>{

    try{
        const { id } = req.params
        const { name,role } = req.body
        const user = await User.findOne({
            _id:id
    })
    if(!user){
        const error = new Error("ไม่พบผู้ใช้งาน")
        error.statusCode = 404
        throw error;
    } 

    const data = await User.findByIdAndUpdate({_id:id},{role:role},{name:name})
    res.status(200).json({
        Message : 'แก้ไขข้อมูลเรียบร้อยแล้ว'
    })
    } catch(error){
        next(error)
    }
 }

 exports.login = async(req, res, next) =>{
    try{
        const {email, password} = req.body

      //validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const error = new Error("ข้อมูลที่ได้รับมาไม่ถูกต้อง")
        error.statusCode = 422;
        error.validation = errors.array()
        throw error;
      }

      const user = await User.findOne({email:email})
      if (!user){
        const error = new Error("ไม่พบผู้ใช้งาน")
        error.statusCode = 404
        throw error;
      }

      const isValid = await user.checkPassword(password)
      if (!isValid){
        const error = new Error("รหัสผ่านไม่ถูกต้อง")
        error.statusCode = 401
        throw error;
      }

      const config = require('../config/index')
      //creat token
      const token = await jwt.sign({
        id:user._id,
        role:user.role,
      },config.KEY
      ,{ expiresIn: "5 days"})

      //decode
      const expires_in = jwt.decode(token)

      res.status(201).json({
        access_token: token,
        expires_in: expires_in.exp,
        token_type: 'Bearer'
      })

    }catch(error){
        next(error)
    }
 }

 exports.destory = async(req, res, next) => {
    try{
        const { id } = req.params
        const user = await User.deleteOne({
            _id : id
        })

        if(user.deletedCount === 0){
            const error = new Error("ไม่สามารถลบได้ ไม่พบข้อมูลผู้ใช้งาน")
            error.statusCode = 404
            throw error;
        } else{
            res.status(200).json({
                Message: 'ลบข้อมูลเรียบร้อยแล้ว'
            })
        }
        

        if(!user){
            const error = new Error("ไม่พบผู้ใช้งาน")
            error.statusCode = 404
            throw error;
            //throw new Error('ไมพบผู้ใช้งาน')
        } else{
            res.status(200).json({
                data: user,
            })
        }

    }catch(error){
        next(error)
    }
 }

 