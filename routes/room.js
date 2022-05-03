var express = require('express');
var router = express.Router();
var roomID;



router.get('/:roomID', function(req, res, next) {
  roomID = req.params.roomID;
  //console.log(roomID);
    res.render('room', { 
      title: req.params.roomID,
      users: "name",
      roomID: roomID
      
      });
  });




module.exports = router;
