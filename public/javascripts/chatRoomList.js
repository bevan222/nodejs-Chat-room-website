xhr = new XMLHttpRequest();
let roomList;





function send_outGetRoomList(){

    var data = "";

    xhr.open("GET", "http://203.204.231.25:3000/RoomApi/roomList");
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xhr.send(data);

    getRoomResponse().then((result)=>{
        addInRoomList(result);
    }).catch(()=>{
        console.log("no room now");
    })
}

function getRoomResponse(){
    return new Promise ((resolve, reject)=>{
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                console.log('getResponse');
                var response = xhr.responseText;
                var responseParse = JSON.parse(response);
                if(responseParse.status == 1){
                    resolve(responseParse.result);
                    
                }else{
                    reject("fail");
                    
                }
            }
        }
    })
  }



function addInRoomList(roomList){
    console.log("start add");
    var roomListul = document.getElementById("roomListul");
    
    for(let i = 0 ; i <roomList.length ; i++ ){
        var roomLinka  = document.createElement("a");
        console.log( roomList[i].room_name);
        roomLinka.setAttribute("href","http://203.204.231.25:3000/room/" + roomList[i].room_name );
        var li = document.createElement("li");
        li.setAttribute("id", roomList[i].room_name);
　　    roomLinka.innerHTML = roomList[i].room_name;
        if(roomList[i].password_need == 1){
            roomLinka.innerHTML += "需要密碼";
        }
        li.appendChild(roomLinka);
        roomListul.appendChild(li);
        console.log("append success");
    }
}




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