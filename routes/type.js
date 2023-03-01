var express = require('express');
var router = express.Router();
const typeControllers = require('../controllers/typeControllers')
const { body } = require('express-validator');
const checkAdmin = require("../middleware/checkAdmin")
const passportJWT = require("../middleware/passportJWT")

router.get('/',typeControllers.getType);

router.get('/tool',typeControllers.tool);

router.get('/:id',typeControllers.getTypeId);

router.post('/',[passportJWT.isLogin,checkAdmin.isAdmin],typeControllers.addType);

router.post('/tool/add',[passportJWT.isLogin,checkAdmin.isAdmin,
        body('name').not().isEmpty().withMessage("กรุณาป้อนชื่อสินค้า"),
        body('type').not().isEmpty().withMessage("กรุณาป้อนประเภทสินค้า"),
        body('price').not().isEmpty().withMessage("กรุณาป้อนราคาสินค้า"),
        body('stock').not().isEmpty().withMessage("กรุณาป้อนจำนวนสินค้า")],typeControllers.addTool)

module.exports = router;