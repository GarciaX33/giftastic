$(document).ready(function () {
    //Will create initial variable called topics that stores an array of strings with certain topics
    var topics = ["Dogs", "Cats", "Birds", "Rabbits", "Cows", "Horses", "Donkey"];
    //Will initialize createButtons function to loop through the array and create button for each topic
    function createButtons() {

        $("#buttonsDisplay").empty();
        $("#buttonsDisplay").text('');
        for (var i = 0; i < topics.length; i++) {
            // Will dynamicaly generate buttons for each topic in the array
            var a = $("<button>");
            a.addClass("giphy");
            a.attr("data-name", topics[i]);
            a.text(topics[i]);
            $("#buttonsDisplay").append(a);
        }
    }
    createButtons();

    $("#addTopic").on("click", function (e) {
        e.preventDefault();

        var topic = $("#giphyInput").val().trim();

        topics.push(topic);
        //Will call thhe createButtons function to generate new button
        createButtons();
    });



    function displayGiphyApi() {
        $('#giphysDisplay').empty('');
        var topic = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=LOFrsFnJo2X8B1nI1kpckUMIyA89asJR&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (res) {
            var results = res.data;
            console.log(res.data)
        }    
    };
});
