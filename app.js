const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app);
//For writing stuff to the frontend
const socketIO = require('socket.io');
// Create socket.io instance be passing the server we created to the socket library
const io = socketIO(server);
//don't know if this is needed
const bodyParser = require('body-parser')
//for requesting the json from Rejseplanen
const request = require('request');
//to calculate time difference
var moment = require('moment');
const port = 3000

//To read incoming JSON
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));

//serve files from app folder
app.use(express.static('frontend'));

let url = "http://xmlopen.rejseplanen.dk/bin/rest.exe/departureBoard?id=851961602&format=json";
let options = {json: true};


var requestLoop = setInterval(function(){
request(url, options, (error, res, body) => {
  if (error) {
    return  console.log(error)
  };

  if (!error && res.statusCode == 200) {
    //Output entire JSON response
    //console.log(body.DepartureBoard.Departure);

    //Shorthand for pulling stuff from JSON
    var json = body.DepartureBoard.Departure;
    var today = new Date();
    var currentTime = today.getHours() + ":" + today.getMinutes();

    //Putting the different JSON arrays into arrays with names that makes more sense.
    lineID = [];
    lineID[0] = json[0].line;
    lineID[1] = json[1].line;
    lineID[2] = json[2].line;

    departureTimes = [];
    departureTimes[0] = json[0].time;
    departureTimes[1] = json[1].time;
    departureTimes[2] = json[2].time;

    //initialize array to use in the forEach loop
    waitTimes = [];

    //iterates time difference calculation over number of items in departureTimes array
    departureTimes.forEach((item, i) => {

      //Put times into moment variables to calculate difference
      var t1 = moment(item, "HH:mm:");
      var t2 = moment(currentTime, "HH:mm:");

      //calculating time difference
      var timeDif = moment.utc(t1.diff(t2)).format("mm");

      //This removes leading zeros from the final time difference
      waitTimes[i] = parseInt(timeDif, 10);
      console.log("waitTimes" + "[" + i + "]" + "is " + waitTimes[i]);
    });

    io.sockets.emit('waitTimes', {lineID: lineID, departureTimes: departureTimes, waitTimes: waitTimes});

  };
});
console.log("requestLoop has looped");
}, 3000);


server.listen(port, () => console.log(`Listening on port ${port}!`))
