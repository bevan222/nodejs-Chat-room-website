const db = require("./connection_db");

module.exports = function memberLogin(memberData){
	let result = {};
	return new Promise((resolve, rejecit)=>{
		db.query("SELECT * FROM member_info WHERE name = ? and password = ?", [memberData.name, memberData.password], function(err, rows){
			if(err){
				result.status = "login failed";
				result.err = "server issue!";
				reject(result);
				return;
			}
			else{
				resolve(rows);
			}
		})
	})
}