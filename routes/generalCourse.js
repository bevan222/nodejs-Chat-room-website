//loginPage
var express = require('express');
var router = express.Router();


/* GET home page. */
/*router.get paremeter /personalPage for url */
//res.render first paremeter for which view to show
router.get('/general', function(req, res, next) {
  res.render('generalCourse', { 
  	title: 'ETestejs',
  	name: 'bevan222'

  	});
});

module.exports = router;
