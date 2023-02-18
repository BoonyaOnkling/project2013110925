var express = require('express');
var router = express.Router();
const userController = require('../controllers/userControllers')
const { body } = require('express-validator');
const checkAdmin = require("../middleware/checkAdmin")
const passportJWT = require("../middleware/passportJWT")

/* GET users listing. */
router.get('/',[passportJWT.isLogin],userController.index);

router.post('/',userController.register);

router.put('/:id',[passportJWT.isLogin,checkAdmin.isAdmin],userController.setrole);

router.post('/login',[
    body('email').not().isEmpty().withMessage("กรุณาป้อนอีเมลด้วย").isEmail()
    .withMessage("รูปแบบอีเมลไม่ถูกต้อง"),
    body('password').not().isEmpty().withMessage("กรุณากรอกรหัสผ่านด้วย")
    .isLength({ min: 5 }).withMessage("รหัสผ่านต้อง 5 ตัวอักษรขึ้นไป")
],userController.login);

router.delete('/:id',[passportJWT.isLogin,checkAdmin.isAdmin],userController.destory);


module.exports = router;
