const connection = require("./connection_db.js");

module.exports = function createRoom(room_data){
	let result = {};
	return new Promise((resolve, reject)=>{
		Promise.all([check_roomName(room_data.room_name)]).then(function(){	//if email and name are new
			connection.query("INSERT INTO room SET ?", room_data, function(err, rows){			//insert data
				if(err){
					console.log(err);
					reject("server issue!");
					return;
				}
				else{
					resolve(room_data);														//success insert data
				}
			})
		}, function(reason){																	//if email or name has been existed
			reject(reason);																		//failed insert data
		})
	})
}

//check email if it has been existed
function check_roomName(roomName){
	console.log(roomName);
	return new Promise((resolve, reject)=>{
		connection.query("SELECT room_name FROM room WHERE room_name = ?", roomName, function(err, rows){
			if(err){
				//if database error
				console.log(err);
				reject("sql instruction issue!");
				return;
			}
			if(rows.length > 0){
				//if email has been existed
				reject("room name has been existed!");
				return;
			}
			else{
				resolve();
				return;
			}
		})
	})
}

