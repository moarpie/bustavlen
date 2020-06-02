socket.on('busData', function (bus) {
  console.log("departure time 1 is " +  bus.departureTimes[0]);
  console.log("wait 1 is " +            bus.waitTimes[0]);
  console.log("departure time 2 is " +  bus.departureTimes[1]);
  console.log("wait 2 is " +            bus.waitTimes[1]);
  console.log("departure time 3 is " +  bus.departureTimes[2]);
  console.log("wait 3 is " +            bus.waitTimes[2]);

  var green =   "#388E3C";
  var orange =  "#F57F17";
  var red =     "#B71C1C";

  $('#waitTime0').html(bus.waitTimes[0]);
  $('#lineID0').html(bus.lineID[0]);
  $('#departureTime0').html(bus.departureTimes[0]);

  $('#waitTime1').html(bus.waitTimes[1]);
  $('#lineID1').html(bus.lineID[1]);
  $('#departureTime1').html(bus.departureTimes[1]);

  $('#waitTime2').html(bus.waitTimes[2]);
  $('#lineID2').html(bus.lineID[2]);
  $('#departureTime2').html(bus.departureTimes[2]);

  //re-make arrays because the ones from socket.io don't work in the if statements for some reason
  var waitTimes = [
    bus.waitTimes[0],
    bus.waitTimes[1],
    bus.waitTimes[2]
  ];

  //Loop over each wait time and color cards accordingly.
  waitTimes.forEach((item, i) => {
    if (waitTimes[i] > 12) {
      $('#color' + [i]).css('background', green);
    }
    if (waitTimes[i] < 12) {
      $('#color' + [i]).css('background', orange);
    }
    if (waitTimes[i] < 5) {
      $('#color' + [i]).css('background', red);
    }
  });

});


// TO SEND RESPONSE TO SERVER
//socket.emit('greeting-from-client', {
//  greeting: 'Hello Server'
//});

//BACKEND code:
//socket.on('greeting-from-client', function (bus) { console.log(bus); });
