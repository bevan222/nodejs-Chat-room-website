require("dotenv").config();

module.exports = {
	connect_info : {
		host : process.env.HOST,
		user : process.env.NAME,
		password : process.env.PASSWORD,
		database : process.env.DATABASE
	},
	secret : process.env.MY_SECRET
}

