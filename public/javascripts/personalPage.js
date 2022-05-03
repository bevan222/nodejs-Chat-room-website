
function setCookie(cname,exdays,token){
    var d = new Date();
    d.setTime(d.getTime()+(exdays*24*60*60*1000));
    var expires = "expires="+d.toGMTString();
    var cookieToken = "token="+token;
    document.cookie = "username=" + cname;
    document.cookie = expires;
    document.cookie = cookieToken;
    var test = document.cookie;
    alert(test);
}	

function getCookie(cname){
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name)==0) { return c.substring(name.length,c.length); }
    }
    return "";
}

function linkPersonalSetURL(){
	var personalSetURL;
	personalSetURL= "http://203.204.231.25:3000/users/personalset";
	window.location.href = personalSetURL;
}




function response(idName){
    xhr.onreadystatechange = function() {

    //here's the problem
        if (xhr.readyState == XMLHttpRequest.DONE) {
            var response = JSON.parse(xhr.responseText);
            if(response.status == 1){  
                changeFinish(idName);
            }else{
                alert("fail");
            }
        }
    }   
}


var failureCallback;
var xhr = new XMLHttpRequest();


//verify account

async function sendVerify(){

    if(getCookie("username") == "" || getCookie("token") == ""){
        deleteAllCookies();
        alert("can't find cookie");
        window.location.href= "http://203.204.231.25:3000";
    }else{
      alert('send verify');
      var verifyURL = "http://203.204.231.25:3000/verify/" + getCookie("username");
    }
    var data;
    xhr.open("GET", verifyURL);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xhr.send(data);
    console.log('ready to response'); 
    var verifyStatus; 
    verifyResponse().then((result)=>{
        if(result === "success"){
        console.log('verify success');
    }
    }).catch(() =>{
        deleteAllCookies();
        window.location.href = "http://203.204.231.25:3000";
        console.log('verify fail of catch');
    });
}

function verifyResponse(){
    return new Promise ((resolve, reject)=>{
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                console.log('getResponse');
                var response = xhr.responseText;
                var responseParse = JSON.parse(response);
                if(responseParse.status == 1){
                    resolve("success");
                    
                }else{
                    reject("fail");
                    
                }
            }
        }
    })
}

function deleteAllCookies() {
    var cookies = document.cookie.split("; ");
    for (var c = 0; c < cookies.length; c++) {
        var d = window.location.hostname.split(".");
        while (d.length > 0) {
            var cookieBase = encodeURIComponent(cookies[c].split(";")[0].split("=")[0]) + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=' + d.join('.') + ' ;path=';
            var p = location.pathname.split('/');
            document.cookie = cookieBase + '/';
            while (p.length > 0) {
                document.cookie = cookieBase + p.join('/');
                p.pop();
            };
            d.shift();
        }
    }
}


function logout(){
    deleteAllCookies();
    sendVerify();
    alert('logout success');
}


