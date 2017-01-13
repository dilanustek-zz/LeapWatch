var Leap = require('./node_modules/leapjs')
var net = require('net');


var mSocket;
var started = false;
var previousFrame;

var server = net.createServer(function(socket){
    mSocket = socket;
    started = true;

    console.log("client connected!");

    socket.on("disconnect", function(){
        started = false;
    })

});

Leap.loop({enableGestures: true}, function(frame) {
    if(started){
        if(frame !== undefined && frame.hands.length > 0){
            var hand = frame.hands[0];
            console.log(hand.palmPosition.toString());
            mSocket.write(hand.palmPosition.toString() + "\n");
        }
    }

})

server.listen(1337, '128.189.81.142')