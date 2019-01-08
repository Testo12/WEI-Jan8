var express = require('express');
var router = express.Router();
var controller = require('../controllers/api');

//router.post('/login', controller.login);
router.get('/cue', controller.cue);
router.get('/wei', controller.wei);
module.exports = router;