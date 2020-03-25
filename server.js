var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
 
io.on('connection', function (socket) {
 
  socket.on('add-message', (message) => {

    let sender = message.sender_id
    let receiver = message.receiver_id
    let prefix = ""

    if(receiver < sender)
      prefix = receiver+"-"+sender
    else
      prefix = sender+"-"+receiver

    console.log(prefix)
    io.emit("message-"+prefix, {text: message.message, sender_id: message.sender_id, receiver_id: message.receiver_id})
  })
 
});

var port = process.env.PORT || 3001;

http.listen(port, function(){
  console.log("listening in http://localhost:" + port);
})