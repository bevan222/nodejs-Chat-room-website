//view for any template that needed
//controllers for any database connection
//routes/index.js for form a html

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();






//test
var bodyParser = require('body-parser');
require('dotenv').config();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
server.listen(process.env.SOCKET_PORT);



io.on('connection', (socket) => {
  //socket.join("room1");
  var url = socket.request.headers.referer;
  var splited = url.split('/');
  var roomID = splited[splited.length-1];

  console.log(roomID);
  socket.join(roomID);
  console.log('a user connected');
 

  socket.on("disconnect", () => {
    console.log("a user go out");
    socket.leave(roomID);
  });

  socket.on("message", (msg) => {
    io.to(roomID).emit("message", msg);
    console.log('message: ' + msg);
  });
});






//get any variable needed
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var memberRouter = require("./routes/member");
var verifyRouter = require("./routes/verification");
var roomApi = require("./routes/RoomApi");
var room = require("./routes/room");
var generalCourse = require("./routes/generalCourse");
var messageApi = require("./routes/messageApi");



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/member", memberRouter);
app.use("/verify", verifyRouter);
app.use("/RoomApi",roomApi);
app.use("/room",room);
app.use("/messageApi",messageApi);
app.use("/ger",generalCourse);






// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;





