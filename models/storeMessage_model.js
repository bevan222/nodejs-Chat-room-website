const connection = require("./connection_db.js");

module.exports = function storeMessage(message_data){
    let result = {};
    console.log(message_data);
	return new Promise((resolve, reject)=>{
		Promise.all([run()]).then(function(){	//if email and name are new
			connection.query("INSERT INTO message SET ?", message_data, function(err, rows){			//insert data
				if(err){
                    console.log(err);
					reject("server issue!");
					return;
				}
				else{
                    console.log("success");	
					resolve(message_data);														//success insert data
				}
			})
		}, function(reason){
            console.log("fail");	
            reject(reason);	
		})
	})
}



//check email if it has been existed
function run(){
	//console.log(roomName);
	return new Promise((resolve, reject)=>{
		connection.query("SELECT * FROM message ",  function(err, rows){
			if(err){
				//if database error
				console.log(err);
				resolve();
				return;
			}
			if(rows.length > 0){
				//if email has been existed
				resolve();
				return;
			}
			else{
				resolve();
				return;
			}
		})
	})
}
