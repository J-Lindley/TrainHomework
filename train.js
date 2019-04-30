// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBTAs4GCP23So0OrfSjGjuoDbMRqihkZ9M",
    authDomain: "trainschedule-bb31d.firebaseapp.com",
    databaseURL: "https://trainschedule-bb31d.firebaseio.com",
    projectId: "trainschedule-bb31d",
    storageBucket: "trainschedule-bb31d.appspot.com",
    messagingSenderId: "235261451347"
  };
 
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  // 2. Button for adding trains
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();
    var firstTrainTime = $("#firstTime-input").val().trim(); 
  
    // Creates local "temporary" object for holding train data
    var newTrain = {
      name: trainName,
      destination: trainDestination,
      frequency: trainFrequency,
      firstTime: firstTrainTime
    };
    console.log(newTrain)
    // Uploads train data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
  
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#frequency-input").val("");
    $("#next-input").val("");
  });
  
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var tFrequency = childSnapshot.val().frequency;
    var firstTime = childSnapshot.val().firstTime;
  
    // Employee Info
    console.log({trainName});
    console.log({trainDestination});
    console.log({tFrequency});
    console.log({firstTime});
  
    //var tFrequency = 3;

    // Time is 3:30 AM
    //var firstTime = "03:30";

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log(currentTime);
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    // Calculate the total billed rate
    var nextArrival = moment(nextTrain).format("hh:mm A")
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDestination),
      $("<td>").text(tFrequency),
      $("<td>").text(nextArrival),
      $("<td>").text(tMinutesTillTrain),
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });
  
  // Example Time Math
  // -----------------------------------------------------------------------------
  // Assume Employee start date of January 1, 2015
  // Assume current date is March 1, 2016
  
  // We know that this is 15 months.
  // Now we will create code in moment.js to confirm that any attempt we use meets this test case
  