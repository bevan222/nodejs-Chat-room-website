var express = require('express');
var router = express.Router();


const roomApi = require("../controllers/room_controller.js");

//const UsersModifyMethod = require("../controllers/users_controller");
//const varify = require("../controllers/verification_controller.js");

roomMethod = new roomApi();
/* GET users listing. */

router.post('/newRoom',roomMethod.postCreateRoom);

router.get('/roomList',roomMethod.getRoomList);

router.post('/roomVerify',roomMethod.roomVerify);



module.exports = router;
