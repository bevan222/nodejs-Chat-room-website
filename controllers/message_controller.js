const storeMessage = require("../models/storeMessage_model.js");
const loadMessage = require("../models/loadMessage_model.js");
//const encryption = require("../models/encryption");
//const loginAction = require("../models/login_model");
//const check = require("../service/member_check");
const config = require("../config/development_config.js");
const onTime = require("../service/onTime.js");
const checkNULL = require("../service/member_check.js");

//const jwt = require("jsonwebtoken");

//transform the date to the "yyyy-mm-dd hh:mm:ss" form
/*Date.prototype.yyyymmddhhmmss = function() {
	var yyyy = this.getFullYear();
	var MM = this.getMonth() + 1;	//	getMonth() is zero based
	var dd = this.getDate();
	var hh = this.getHours();
	var mm = this.getMinutes();
	var ss = this.getSeconds();

	return (yyyy + "-" + 
			(MM > 9 ? "" : "0") + MM + "-" + 
			(dd > 9 ? "" : "0") + dd + " " +
			(hh > 9 ? "" : "0") + hh + ":" +
			(mm > 9 ? "" : "0") + mm + ":" +
			(ss > 9 ? "" : "0") + ss);
};*/

module.exports = class message{
	//get data from client
	postStoreData(req, res, next){

		//加密
		//const password = encryption(req.body.password);
		const message_data = {
            room_name : req.body.roomname,
            sender : req.body.sender,
            //email : req.body.email,
            time : req.body.time,
            text : req.body.text
        }

        
        
        

		//console.log(member_data);
		
		res.header("Access-Control-Allow-Origin", "*");

		storeMessage(message_data).then(result=>{
			res.json({
				status : "1",
				result : result
			})
		},(err)=>{
            console.log('fail');
			res.json({
				status : "0",
				result : err
			})
		})
	}

	postGetMessage(req,res,next){
        console.log(req.body);
        const loadMessage_data = {
            room_name : req.body.roomname,
            indexNum : req.body.indexNum
        }

        loadMessage(loadMessage_data).then((rows)=>{
            if(checkNULL(rows) === true){
                res.json({
                    status : 0,
                    err : "can't get data"
                });
            }
            else{
                res.json({
                    status : 1,
                    result : rows
                });
            }
        }, (err)=>{
            res.json({
                status : 0,
                err : err
            });
        })
    }

}