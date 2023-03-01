const Type = require('../models/type');
const Tool = require('../models/tool');
const { config } = require('dotenv');
const { validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const type = require('../models/type');

exports.getType = async(req,res,next) =>{
    const type = await Type.find()
    res.status(200).json({
        data : type
    })
}

exports.getTypeId = async(req,res,next) =>{
    try{
        const { id } = req.params
        const type = await Type.findOne({
            _id : id
        }).populate('tool');
    if(!type){
        const error = new Error("ไม่พบประเภทสินค้า")
        error.statusCode = 404
        throw error;
    }
    res.status(200).json({
        data :type
    })
    }catch(error){
        next(error)
    }
}

exports.addType = async(req,res,next) =>{
    try{
        const { name } = req.body

        //validation
        const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const error = new Error("ข้อมูลที่ได้รับมาไม่ถูกต้อง")
        error.statusCode = 422;
        error.validation = errors.array()
        throw error;
      }
      const existtypename = await Type.findOne({name:name})

      if(existtypename){
        const error = new Error("ประเภทสินค้าที่คุณเพิ่มมีอยู่ในระบบแล้ว")
        error.statusCode = 400
        throw error;
      }
      let type = new Type({
        name : name
      })
      await type.save();

      res.status(200).json({
        Message: 'เพิ่มข้อมูลเรียบร้อยแล้ว'
    })
    }catch(error){
        next(error)
    }
}

exports.addTool = async(req, res,next) =>{
    try{
        const { name,type,price,stock } = req.body

        //validation
        const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const error = new Error("ข้อมูลที่ได้รับมาไม่ถูกต้อง")
        error.statusCode = 422;
        error.validation = errors.array()
        throw error;
      }
      let tool = new Tool({
        name : name,
        type : type,
        price : price,
        stock : stock

      })
      await tool.save();

      res.status(200).json({
        Message: 'เพิ่มข้อมูลเรียบร้อยแล้ว'
    })
    }catch(error){
        next(error)
    }
}

exports.tool = async(req,res,next) =>{
    const tool = await Tool.find().populate('type');
    res.status(200).json({
        data : tool
    })
}

