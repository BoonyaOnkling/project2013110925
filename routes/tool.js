var express = require('express');
var router = express.Router();
const toolController = require('../controllers/toolControllers')
const { body } = require('express-validator');

router.get('/',toolController.index);

router.post('/',toolController.index);

router.put('/',toolController.index);

router.delete('/',toolController.index);
