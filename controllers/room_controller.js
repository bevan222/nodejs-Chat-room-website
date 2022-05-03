const toCreateRoom = require("../models/createRoom_model");
//const encryption = require("../models/encryption");
//const loginAction = require("../models/login_model");
//const check = require("../service/member_check");
const config = require("../config/development_config.js");
const onTime = require("../service/onTime.js");
const checkNULL = require("../service/member_check.js");
const getRoomListAction = require("../models/getRoom_model.js");
const roomVerifyAction = require("../models/roomVerify.js");

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

module.exports = class room{
	//get data from client
	postCreateRoom(req, res, next){
        
		//加密
		//const password = encryption(req.body.password);
		const room_data = {
            room_name : req.body.roomname,
            creator : req.body.creator,
            //email : req.body.email,
            password_need : req.body.passwordNeed,
			password : req.body.password,
			create_date : onTime()
        }
        
        

		//console.log(member_data);
		
		res.header("Access-Control-Allow-Origin", "*");

		toCreateRoom(room_data).then(result=>{
			res.json({
				status : "1",
				result : result
			})
		},(err)=>{
			res.json({
				status : "0",
				result : err
			})
		})
	}

	getRoomList(req,res,next){
        getRoomListAction().then((rows)=>{
            if(checkNULL(rows) === true){
                res.json({
                    status : 0,
                    err : "wrong user name"
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
	
	roomVerify(req,res,next){
		roomVerifyAction(req.body.roomname).then((rows)=>{
			if(checkNULL(rows) === true){
                res.json({
                    status : 0,
                    err : "can't find room"
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