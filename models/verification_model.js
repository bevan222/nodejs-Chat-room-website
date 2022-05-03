const jwt = require("jsonwebtoken");
const config = require("../config/development_config.js");

module.exports = function verifyToken(token){
	let tokenResult = "";
	const time = Math.floor(Date.now() / 1000);
	return new Promise((resolve, reject)=>{
		//verify if the token is correct
		if(token){
			jwt.verify(token, config.secret, function(err, decoded){
				if(err){
					tokenResult = false;
					resolve(tokenResult);
				}
				else if (decoded.exp <= time){	//verify if the token is expired
					tokenResult = false;
					resolve(tokenResult);
				}
				else{
					tokenResult = decoded.name;
					resolve(tokenResult);
				}
			})
		}
	})
}