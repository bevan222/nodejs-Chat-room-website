const db = require("./connection_db.js");

module.exports = function getprofile(name){
	let result = {};
	return new Promise((resolve, reject)=>{
		db.query("SELECT * FROM member_profile WHERE user_name = ?", name, function(err, rows){
			if(err){
				console.log(err);
				err = "server issue!";
				reject(err);
			}
			else{
				resolve(rows);
			}
		})
	})
}