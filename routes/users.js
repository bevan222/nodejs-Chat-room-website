var express = require('express');
var router = express.Router();



//const createRoomMethod = require("../controllers/createRoom_controller.js") 
const UsersModifyMethod = require("../controllers/users_controller");
const varify = require("../controllers/verification_controller.js");

usersMethod = new UsersModifyMethod();

/* GET users listing. */

router.get('/', usersMethod.getIndexPage);

router.get("/personalSet", usersMethod.getpersonalSetPage);

router.get("/:name/profile", usersMethod.getProfile);



router.get('/roomList', function(req, res, next) {
  res.render('chatRoomList', { 
  	title: 'ETestejs',
  	name: 'bevan222'

  	});
});

router.get('/createRoom', function(req, res, next) {
  res.render('createRoom', { 
  	title: 'ETestejs',
  	name: 'bevan222'

  	});
});

//test roomID


router.get('/chatRoom', function(req, res, next) {
  res.render('room', { 
  	title: 'ETestejs',
  	name: 'bevan222'

  	});
});



router.put("/update", usersMethod.putUpdate);

module.exports = router;













