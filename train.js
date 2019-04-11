// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
<script src="https://www.gstatic.com/firebasejs/5.9.3/firebase.js"></script>
<script>
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBTAs4GCP23So0OrfSjGjuoDbMRqihkZ9M",
    authDomain: "trainschedule-bb31d.firebaseapp.com",
    databaseURL: "https://trainschedule-bb31d.firebaseio.com",
    projectId: "trainschedule-bb31d",
    storageBucket: "trainschedule-bb31d.appspot.com",
    messagingSenderId: "235261451347"
  };
</script>  
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  // 2. Button for adding trains
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainFrequency = moment($("#frequency-input").val().trim(), "MM/DD/YYYY").format("X");
    var trainArrival = $("#next-input").val().trim();
  
    // Creates local "temporary" object for holding train data
    var newTrain = {
      name: trainName,
      destination: trainDestination,
      frequency: trainFrequency,
      nextTime: nextArrival
    };
  
    // Uploads train data to the database
    database.ref().push(newtrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.frequency);
    console.log(newTrain.nextTime);
  
    alert("Train successfully added");
  
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
    var trainDestination = childSnapshot.val().role;
    var trainFrequency = childSnapshot.val().start;
    var trainArrival = childSnapshot.val().rate;
  
    // Employee Info
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainFrequency);
    console.log(trainArrival);
  
    // Prettify the train arrival
    var trainStartPretty = moment.unix(trainArrival).format("hh:mm");
  
    // Calculate the months worked using hardcore math
    // To calculate the minutes away
    var minutesAway = moment().diff(moment(minutesAway, "X"), "minutes");
    console.log(minutesAway);
  
    // Calculate the total billed rate
    var empBilled = empMonths * empRate;
    console.log(empBilled);
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDestination),
      $("<td>").text(trainFrequency),
      $("<td>").text(trainStartPretty),
      $("<td>").text(minutesAway),
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
  