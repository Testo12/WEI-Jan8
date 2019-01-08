var express = require('express');
var router = express.Router();
var controller = require('../controllers/api');

router.post('/login', controller.login);
router.post('/register', controller.register);
router.get('/home', controller.home);
router.get('/homepage', controller.homepage);
router.get('/cue', controller.cue);
router.get('/wei', controller.wei);
module.exports = router;