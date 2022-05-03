var express = require('express');
var router = express.Router();

const verify = require("../controllers/verification_controller.js");

/* GET users listing. */

router.get('/:name', verify);

module.exports = router;
