
var packetCount = 100;
var messageBlock = 0;
var messageID = -1;
var broadcastAdress = "255.255.255.255";
var broadcastPort = 5700;

  var dgram = require('dgram'); 
  var server = dgram.createSocket("udp4"); 
  server.bind( function() {
    server.setBroadcast(true)
    server.setMulticastTTL(128);
    setInterval(sendMessage, 2000);
    //process.exit();

  });
  
function sendMessage () {
  console.log("start   ")
  for (var i = 1; i <= packetCount; i++) {
    messageID++;
    
    var messageObject = {"action": "RESTART", "time": Date.now(), "messageBlock": messageBlock, "messageRepetition": i}; 
    //var message = new Buffer(JSON.stringify(messageObject));
    var message = new Buffer(`!!reboot!!`);
    server.send(message, 0, message.length, broadcastPort, broadcastAdress, messageSent(i));
    
  }

}  

function messageSent (repetition) {

  process.stdout.write(`. ${repetition}`);
  
  if (repetition >= packetCount) {
    messageBlock++;
    console.log(`... send Block ${messageBlock} to ${broadcastAdress}:${broadcastPort}`);
  }
  
    
    //process.exit();
}
