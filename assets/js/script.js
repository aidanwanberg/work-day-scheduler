// this pushes the current date to the p tag below the jumbotron
var currentDay = function() {

    var date = moment();

    $("#currentDay").append(date.format("dddd, MMMM do"))

    checkTime();
};

// display the tasks from the local storage and place into appropriate time sections
var displayTasks = function() {
    
    if (!localStorage.getItem("tasks")) {
        
        currentDay();

    } else {

        var taskArray = localStorage.getItem("tasks");

        taskArray = JSON.parse(taskArray);

        for (i = 0; i < taskArray.length; i++) {

            var text = taskArray[i].text;

            $("." + (i + 9)).val(text);
        }

        currentDay();
    }
};

// checks the current time and changes colors of different divs accordingly
var checkTime = function() {

    var currentTime = parseInt(moment().format("H"));
    
    var timeArray = [];

    $("div", ".container").each(function() {
        timeArray.push($(this).attr("id"));
    });

    for (i = 0; i < timeArray.length; i++) {

        var timeId = parseInt(timeArray[i]);

        if ( timeId === currentTime ) {
            $("." + timeId).addClass("present");
        } else if (timeId < currentTime) {
            $("." + timeId).addClass("past");
        } else if (timeId > currentTime) {
            $("." + timeId).addClass("future");
        }
    }
};

// when a save button is clicked, get all the tasks from time sections and send them to local storage
$(".saveBtn").on("click", function() {

    var taskArray = [];

    for (i = 9; i < 18; i++) {

        var text = $("." + i).val();

        taskArray.push({
            id: parseInt(i),
            text: text,
        });
    }

    localStorage.setItem("tasks", JSON.stringify(taskArray));
});

displayTasks();