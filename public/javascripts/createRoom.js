let roomName = "";
let passwordNeed = 0;
let password = "";
let passWordNeedBox;
let passwordBar;

function passWordNeed() {
    // Get the checkbox
    // Get the output text
    passWordNeedBox = document.getElementById("passWordNeeded");
    passwordBar = document.getElementById("roomPassword");
    // If the checkbox is checked, display the output text
    if (passWordNeedBox.checked == true){
      passwordBar.style.display = "block";
    } else {
        passwordBar.style.display = "none";
    }
  }


  //for checking the Register.html's form
//username and password can't be blank and email have to match the email size
function checkCreateRoomForm()
{
  init();

  for(let i = 0 ; i < roomName.length ; i++){
    if(roomName[i] == ' '){
      alert('don\'t use blank');
      return 0;
    }
  }

  if(roomName == ""){
    alert("please enter room name");
    return 0;
  }else{
    if(passWordNeedBox.checked == true && password == ""){
      alert("please enter password");
      return 0;
    }else if((passWordNeedBox.checked == false && password != "")){
      alert("You dont't need password man");
    }else{
      return 1;
    }
  }
  
}





xhr = new XMLHttpRequest();
var registStatus = 0;
var registErr = null;
  
function send_outCreateRoomForm(){

  init();
  if(checkCreateRoomForm()){
    var data = "roomname=" + roomName + "&creator=" + getCookie("username") + "&passwordNeed=" + passwordNeed + "&password=" + password;

    xhr.open("POST", "http://203.204.231.25:3000/RoomApi/newRoom");
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xhr.send(data);
    createRoomResponse();
  }else{
    return 0;
  }
}

function createRoomResponse(){
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      var response = xhr.responseText;
      var responseParse = JSON.parse(response);
      createStatus = responseParse.status;
      registErr = responseParse.result;
      alert(registStatus);
      if(registStatus == 1){
          //跳轉
          alert("創建成功");
          //window.location.href='index.html';
          return 1;
        }else{
          alert(registErr);
          alert("創建失敗");
          return 0;
        }
      }
    }
}

function init() {
  roomName = document.getElementById("chatRoomName").value;
  passWordNeedBox = document.getElementById("passWordNeeded");
  if(passWordNeedBox.checked == true){
    passwordNeed = 1;
    password = document.getElementById("roomPassword").value;
  }else{
    passWordNeed = 0;
    password = "";
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