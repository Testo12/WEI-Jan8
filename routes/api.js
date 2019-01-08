var express = require('express');
var router = express.Router();
var controller = require('../controllers/api');

//router.post('/login', controller.login);
router.get('/list', controller.list);

module.exports = router;