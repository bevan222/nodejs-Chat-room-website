const db = require("./connection_db.js");

module.exports = function roomVerify(roomName){
	//let result = {};
	return new Promise((resolve, reject)=>{
		var sqlStatment = "select room_name, password_need , password  from room where room_name = '"+ roomName + "'";
		console.log(sqlStatment);
		db.query(sqlStatment, function(err, rows){
			if(err){
				console.log(err);
				err = "server issue!";
				reject(err);
			}else{
				console.log("room data");
				console.log(rows);
				resolve(rows);
			}
		})
	})
}