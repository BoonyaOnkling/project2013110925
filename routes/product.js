var express = require('express');
var router = express.Router();
const userController = require('../controllers/userControllers')
const { body } = require('express-validator');
const checkAdmin = require("../middleware/checkAdmin")
const passportJWT = require("../middleware/passportJWT")

