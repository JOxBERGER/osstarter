
var packetCount = 100; // how many packets will be send.
var repetitions = 10; // repetion of udp datagramm.

var messageBlock = 0;
var messageID = -1;
var broadcastAdress = "255.255.255.255";
var broadcastPort = 5700;

  var dgram = require('dgram'); 
  var server = dgram.createSocket("udp4"); 
  server.bind( function() {
    server.setBroadcast(true)
    //server.setMulticastTTL(128);
    setInterval(sendMessage, 5);
    //process.exit();

  });
  
function sendMessage () {
  console.log("start   ")
  for (var i = 1; i <= repetitions; i++) {
    messageID++;
    
    //var messageObject = {"action": "RESTART", "time": Date.now(), "messageBlock": messageBlock, "messageRepetition": i}; 
    //var message = new Buffer(JSON.stringify(messageObject));
    var message = new Buffer(`!!reboot!!`);
    server.send(message, 0, message.length, broadcastPort, broadcastAdress, messageSent(i)); 
  }

}  

var rep = -1;
function messageSent (count) {


  process.stdout.write(`. ${count}`);
  
  if (count >= repetitions) {
    messageBlock++;
    console.log(`... send Block ${messageBlock} to ${broadcastAdress}:${broadcastPort}`);
    rep++;
  }

  if (rep >= packetCount-1) {
    process.exit();
  }
  
}


