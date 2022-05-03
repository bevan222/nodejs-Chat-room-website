const db = require("./connection_db.js");

module.exports = function getRoomList(){
	//let result = {};
	return new Promise((resolve, reject)=>{
		db.query("select room_name, password_need , password  from room order by room_num desc limit 10", function(err, rows){
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