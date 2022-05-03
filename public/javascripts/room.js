
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

/*
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
*/

var failureCallback;
var xhr = new XMLHttpRequest();
var d = new Date();


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
    var verifyStatus; 
    verifyResponse().then((result)=>{
        if(result === "success"){
    }
    }).catch(() =>{
        deleteAllCookies();
        window.location.href = "http://203.204.231.25:3000";
    });
}

function verifyResponse(){
    return new Promise ((resolve, reject)=>{
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
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

xhr = new XMLHttpRequest();
let roomname;
let sender;
let text;
let time;
let getMessageIndex = -1; 
let messsageBar;

function messageOut(){
    messageOutInit();
    var data = "roomname=" + roomname + "&sender=" + sender + "&time=" + time + "&text=" + text;

    xhr.open("POST", "http://203.204.231.25:3000/messageApi/storeData");
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xhr.send(data);
    MessageOutResponse();
}


function MessageOutResponse(){
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      var response = xhr.responseText;
      var responseParse = JSON.parse(response);
      registStatus = responseParse.status;
      registErr = responseParse.result;
      
      if(registStatus == 1){
          //跳轉
          alert("送出成功");
        }else{
          alert("送出失敗");
          alert(registErr);
        }
      }
    }
}




function messageOutInit(){
    var d = new Date();

    text = document.getElementById("m").value;
    roomname = document.getElementsByTagName("title")[0].innerHTML;
    sender = getCookie("username");
    time = d.getFullYear() +"-"+d.getMonth() + "-" + d.getDate()+" "+ d.getHours() +":"+ d.getMinutes()+":"+d.getSeconds();
    //console.log(text);
}

function firstTimeLoad(){
    var roomName = document.getElementsByTagName("title")[0].innerHTML;
    var data = "roomname=" + roomName + "&indexNum=" + "-1" ;

    xhr.open("POST", "http://203.204.231.25:3000/messageApi/loadData");
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xhr.send(data);
    firstTimeLoadResponse();
}

function firstTimeLoadResponse(){
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
          var response = xhr.responseText;
          
          var responseParse = JSON.parse(response);
          var status = responseParse.status;
          var result = responseParse.result;
          if(status != 0){
            getMessageIndex = result[0].roomID;
          }else{
              alert("讀取失敗");
            }
          
          }
        }
}

function getMessage (){
    var roomName = document.getElementsByTagName("title")[0].innerHTML;
    var data = "roomname=" + roomName + "&indexNum=" + getMessageIndex ;

    xhr.open("POST", "http://203.204.231.25:3000/messageApi/loadData");
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xhr.send(data);
    getMessageResponse();
}


function getMessageResponse(){
    xhr.onreadystatechange = function() {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        var response = xhr.responseText;
        
        var responseParse = JSON.parse(response);
        var status = responseParse.status;
        var result = responseParse.result;
        if(status != 0){
            alert("讀取成功");
            var messageToAppend ;
            messsageBar = document.getElementById("messages");
            var messageTemp = messsageBar.innerHTML;
            messsageBar.innerHTML = "";
            for(let i = result.length-1 ; i > -1;i--){
                var li = document.createElement("li");
                li.innerHTML += "["
                li.innerHTML += result[i].time;
                li.innerHTML += "]";
                li.innerHTML += result[i].sender;
                li.innerHTML += ":";
                li.innerHTML += result[i].text;
                messsageBar.appendChild(li);
            }
            messsageBar.innerHTML += messageTemp;
            getMessageIndex = result[result.length-1].roomID;

          }else{
            alert("讀取失敗");
          }
        
        }
      }
  }


  var roomXhr = new XMLHttpRequest();


  
async function roomVerify(){
    var room =  document.getElementsByTagName("title")[0].innerHTML;
    if(getCookie("username") == "" || getCookie("token") == ""){
        deleteAllCookies();
        alert("can't find cookie");
        window.location.href= "http://203.204.231.25:3000";
    }else{
      alert('send verify');
    }
    var verifyURL = "http://203.204.231.25:3000/roomApi/roomVerify";

    console.log(verifyURL);
    var data = "roomname=" + room;
    console.log(room);
    roomXhr.open("POST", verifyURL);
    roomXhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    roomXhr.send(data);
    console.log('ready to response'); 
    roomVerifyResponse().then((result)=>{
        if(result === "success"){
        console.log('roomverify success');
    }
    }).catch(() =>{
        deleteAllCookies();
        alert("You are trying to go to a room not exist logOUT!!!");
        window.location.href = "http://203.204.231.25:3000";
        console.log('verify fail of catch');
    });
}

function roomVerifyResponse(){
    return new Promise ((resolve, reject)=>{
        roomXhr.onreadystatechange = function() {
            if (roomXhr.readyState == XMLHttpRequest.DONE) {
                console.log('getResponse');
                var response = roomXhr.responseText;
                console.log(response);
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
