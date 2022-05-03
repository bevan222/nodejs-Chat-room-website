const checkNULL = require("../service/member_check.js");
const verify = require("../models/verification_model.js");
const updateAction = require("../models/update_model.js");
const onTime = require("../service/onTime.js");
const getprofileAction = require("../models/getprofile_model.js");

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

module.exports = class User{
	getIndexPage(req, res, next){
		res.render('personalpage', { 
  			title: 'ETestejs',
  			name: req.query.username,
  		});
	}

	getpersonalSetPage(req, res, next){
		res.render('personalSet', { 
  			title: 'ETestejs',
  			name: req.query.username,
  			token:req.query.token
  		});
	}

	getProfile(req, res, next){
		const token = req.cookies.token;
		const name = req.params.name;

		if(checkNULL(token) === true){
			res.json({
				status : 0,
				err : "no token"
			});
		}
		else if (checkNULL(token) === false){
			verify(token).then(tokenResult=>{
				if(tokenResult === false || tokenResult != name){
					res.json({
						status : 0,
						err : "token wrong"
					});
				}
				else{
					getprofileAction(name).then((rows)=>{
						if(checkNULL(rows) === true){
							res.json({
								status : 0,
								err : "wrong user name"
							});
						}
						else{
							res.json({
								status : 1,
								interesting : rows[0].interesting,
								attempt : rows[0].attempt,
								introduction : rows[0].introduction
							});
						}
					}, (err)=>{
						res.json({
							status : 0,
							err : err
						});
					})
				}
			})
		}
	}

	putUpdate(req, res, next){
		const token = req.headers['token'];
		//check token input
		if(checkNULL(token) === true){
			res.json({
				status : 0,
				err : "no token!"
			});
		}
		else if (checkNULL(token) === false){
			verify(token).then(tokenResult=>{
				if(tokenResult === false){
					res.json({
						status : 0,
						err : "token wrong!"
					});
				}
				else{
					const name = tokenResult;

					if(req.body.introduction){
						const update_data ={
							introduction : req.body.introduction,
							update_date : onTime()
						};

						updateAction(name, update_data).then(result=>{
							res.json(result);
						}, (err)=>{
							res.json(err);
						})
					}
					else if (req.body.interesting){
						const update_data = {
							interesting : req.body.interesting,
							update_date : onTime()
						};
						
						updateAction(name, update_data).then(result=>{
							res.json(result);
						}, (err)=>{
							res.json(err);
						})
					}
					else if (req.body.attempt){
						const update_data = {
							attempt : req.body.attempt,
							update_date : onTime()
						};

						updateAction(name, update_data).then(result=>{
							res.json(result);
						}, (err)=>{
							res.json(err);
						})
					}
					else{
						res.json({
							status : 0,
							err : "update data key is wrong or execption situation"
						});
					}
				}
			})
		}
	}
}

/*function onTime(){
	var date = new Date();
	var date_string = date.yyyymmddhhmmss();
	return date_string;
}*/