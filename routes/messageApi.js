var express = require('express');
var router = express.Router();


const storeMessageMethod = require("../controllers/message_controller.js");
const getMessageMethod = require("../controllers/message_controller.js");

//const UsersModifyMethod = require("../controllers/users_controller");
//const varify = require("../controllers/verification_controller.js");
storeMessage = new storeMessageMethod();
getMessage = new getMessageMethod();


/* GET users listing. */

router.post('/storeData',storeMessage.postStoreData);

router.post('/loadData',getMessage.postGetMessage);


module.exports = router;
