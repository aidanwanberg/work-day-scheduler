// this pushes the current date to the p tag below the jumbotron
var currentDay = function() {

    var date = moment();

    $("#currentDay").append(date.format("dddd, MMMM do"))
};

currentDay();
