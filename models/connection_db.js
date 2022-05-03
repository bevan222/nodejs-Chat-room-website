const mysql = require("mysql");
const conf = require("../config/development_config.js");

var connection = mysql.createConnection({
	host : conf.connect_info.host,
	user : conf.connect_info.user,
	password : conf.connect_info.password,
	database : conf.connect_info.database
})

connection.connect((err)=>{
	if(err){
		console.log("error when connected to mysql.");
	}
	else{
		console.log("connect success!");
	}
})

module.exports = connection;