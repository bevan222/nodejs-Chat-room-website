const db = require("./connection_db.js");

module.exports = function loadMessage(loadMessage_data){
    //let result = {};
    console.log(loadMessage_data);
	return new Promise((resolve, reject)=>{
        if(loadMessage_data.indexNum == -1){
            db.query("select * from message where room_name = '"+ loadMessage_data.room_name +"' order by roomID desc limit 1", function(err, rows){
                if(err){
                    console.log(err);
                    err = "server issue!";
                    reject(err);
                }
                else{
                    resolve(rows);
                }
            })
        }else{
            db.query("select * from message " + "where roomID < " + loadMessage_data.indexNum +" and room_name = '" + loadMessage_data.room_name + "' order by roomID desc limit 10 ", function(err, rows){
                if(err){
                    console.log(err);
                    err = "server issue!";
                    reject(err);
                }
                else{
                    resolve(rows);
                }
            })
        }
		
    })
}

