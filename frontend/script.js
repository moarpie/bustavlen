socket.on('waitTimes', function (message) {
  console.log("departure time 1 is " +  message.departureTimes[0]);
  console.log("wait 1 is " +            message.waitTimes[0]);
  console.log("departure time 1 is " +  message.departureTimes[1]);
  console.log("wait 2 is " +            message.waitTimes[1]);
  console.log("departure time 1 is " +  message.departureTimes[2]);
  console.log("wait 3 is " +            message.waitTimes[2]);

  $('#waitTime1').html(message.waitTimes[0]);
});



// TO SEND RESPONSE TO SERVER
//socket.emit('greeting-from-client', {
//  greeting: 'Hello Server'
//});

//BACKEND code:
//socket.on('greeting-from-client', function (message) { console.log(message); });
