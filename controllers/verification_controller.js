const varifyAction = require("../models/verification_model.js");
const onTimeout = require("../service/onTime.js");

module.exports = function(req, res, next){
	const url_name = req.params.name;
	const cookies_name = req.cookies.username;
	const token = req.cookies.token;

	console.log(url_name, cookies_name, token);
	
	varifyAction(token).then(tokenResult=>{
		if(tokenResult === false){
			res.json({
				status : 0,
				err : "verification error!"
			});
		}
		else{
			if(tokenResult == url_name && url_name == cookies_name){
				res.json({
					status : 1,
					result : "verification correct!"
				});
			}
			else{
				res.json({
					status : 0,
					err : "verification error!"
				});
			}
		}
	})
}