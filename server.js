
var packetCount = 30; // how many packets will be send.
var repetitions = 100; // repetion of udp datagramm.
var command = "reboot";

var messageBlock = 0;
var messageID = -1;
var broadcastAdress = "255.255.255.255";
var broadcastPort = 5700;

  var dgram = require('dgram'); 
  var server = dgram.createSocket("udp4"); 
  server.bind( function() {
    server.setBroadcast(true)
    server.setMulticastTTL(255);
    setInterval(sendMessage, 5);
    //process.exit();

  });
  
console.log(process.argv.length);
console.log(process.argv[2]);
if (process.argv.length === 3) {
  command = process.argv[2];
}


function sendMessage () {
  var message = `!!${command}!!`
  var messageB = new Buffer(`${message}`);
  console.log(`\nStart.\nMessage: ${message} `)

  for (var i = 1; i <= repetitions; i++) {
    messageID++;
    
    //var messageObject = {"action": "RESTART", "time": Date.now(), "messageBlock": messageBlock, "messageRepetition": i}; 
    //var message = new Buffer(JSON.stringify(messageObject));
    
    server.send(messageB, 0, messageB.length, broadcastPort, broadcastAdress, messageSent(i)); 
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


