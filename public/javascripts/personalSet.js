

function setCookie(cname,exdays,token){
    var d = new Date();
    d.setTime(d.getTime()+(exdays*24*60*60*1000));
    var expires = "expires="+d.toGMTString();
    var cookieToken = "token="+token;
    document.cookie = "username=" + cname;
    document.cookie = expires;
    document.cookie = cookieToken;
    var test = document.cookie;
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


function changeText(idName){
    alert(idName);  
    var changeTag = "<textarea id=\"edit\" class=\"form-control form-control-lg\" rows=\"3\"></textarea><button id=\"check\" onclick=\"send_out(\'"+ idName +"\')\">Submit</button>";
    document.getElementById(idName).outerHTML = changeTag;
}

function changeFinish(idName){
    let changeContent = document.getElementById("edit").value;
    console.log(changeContent); 
    //let changeContent = document.getElementById('edit').value;
    document.getElementById('edit').outerHTML= "<a id=\"" +idName+ "\" class=\"pSetContentBody\">"+changeContent+"<br><br><br><br><br></a>";
    document.getElementById('check').outerHTML = '';
}

var xhr = new XMLHttpRequest();
var changeData ="";
var data ="";



function send_out(idName){

  init( );
  if(true){
    if(idName == 'userContent'){
        data = "introduction=" + changeData;
        xhr.open("PUT", "http://203.204.231.25:3000/users/update");
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('token',getCookie('token'));

        xhr.send(data);
        response(idName);
    }else if(idName=='searchFor'){
        data = "attempt=" + changeData;
        xhr.open("PUT", "http://203.204.231.25:3000/users/update");
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('token',getCookie('token'));

        xhr.send(data);
        response(idName);
    }else if(idName=='interesting'){
        data = "interesting=" + changeData;
        xhr.open("PUT", "http://203.204.231.25:3000/users/update");
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('token',getCookie('token'));

        xhr.send(data);
        response(idName);
    }
    
  }
}

function response(idName){
  xhr.onreadystatechange = function() {

    //here's the problem
    if (xhr.readyState == XMLHttpRequest.DONE) {
      var response = xhr.responseText;
      var responseParse = JSON.parse(response);
      if(responseParse.status == 1){
          //跳轉
          //set cookie  
          changeFinish(idName);
        }else{
          alert("fail");
        }
      }
    }
}

function init() {
    changeData = document.getElementById('edit').value;
}



function getPersonSetData(){
    data = "";
    var xhrURL = "http://203.204.231.25:3000/users/" + getCookie('username') + "/profile";
    xhr.open("GET", xhrURL);

    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send(data);
    GPSDresponse().then((result)=>{
        console.log('page built finish');
    })
}

//getPersonSetData response
function GPSDresponse(){
    return new Promise ((resolve, reject)=>{

  xhr.onreadystatechange = function() {

    //here's the problem
    if (xhr.readyState == XMLHttpRequest.DONE) {
      var response = xhr.responseText;
      var responseParse = JSON.parse(response);
      if(responseParse.status == 1){
        document.getElementById('userContent').innerHTML = responseParse.introduction;
        document.getElementById('interesting').innerHTML = responseParse.interesting;
        document.getElementById('searchFor').innerHTML = responseParse.attempt;
          //跳轉
          //set cookie  
          return(true);
        }else{
          return(false);
        }
      }
    }
    })
}

var failureCallback;

async function sendVerify(){
    if(getCookie("username") == "" || getCookie("token") == ""){
        deleteAllCookies();
        alert("can't find cookie");
        window.location.href= "http://203.204.231.25:3000";
    }else{
      alert('send verify');
      var verifyURL = "http://203.204.231.25:3000/verify/" + getCookie("username");
      console.log(verifyURL);
    }
    xhr.open("GET", verifyURL);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xhr.send(data);
    console.log('ready to response'); 
    var verifyStatus; 
    verifyResponse().then((result)=>{
        if(result === "success"){
        console.log('verify success');
        getPersonSetData();
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

        //here's the problem
        
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



