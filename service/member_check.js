module.exports = function checkNULL(data){
	for(var key in data){
		return false;	//is not NULL
	}

	return true;	//is NULL
}