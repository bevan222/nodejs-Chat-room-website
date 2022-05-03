const db = require("./connection_db.js");

module.exports = function customerEdit(name, memberUpdataData){
	let result = {};
	return new Promise((resolve, reject)=>{
		db.query("UPDATE member_profile SET ? WHERE user_name=?", [memberUpdataData, name], function(err, rows){
			if(err){
				console.log(err);
				result.status = 0;
				result.err = "server issue!";
				reject(result);
				return;
			}
			else{
				result.status = 1;
				result.result = memberUpdataData;
				resolve(result);
			}
		})
	})
}