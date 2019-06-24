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


    //will initialize displlayGiphyApi function to call on giphy api to return gifs with a limit of 10 onto display
    function displayGiphyApi() {
        $('#giphysDisplay').empty('');
        var topic = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=LOFrsFnJo2X8B1nI1kpckUMIyA89asJR&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (res) {
            var results = res.data;

            for (var i = 0; i < results.length; i++) {

                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

                    var rating = results[i].rating;
                    var p = $("<p>").html("Rating: " + rating);
                    var image = $('<img>');

                    image.attr('src', results[i].images.fixed_height_still.url);
                    image.attr('data-still', results[i].images.fixed_height_still.url)
                    image.attr('data-animate', results[i].images.fixed_height.url)
                    image.attr('data-move', 'still')
                    $("#giphysDisplay").append(p);
                    $("#giphysDisplay").append(image);
                    //will display rating and gif image after the loop on #giphysDisplay
                }

            }
        });

    }
    // document on click function for the gifs to determine if the gif is still or animated
    $(document).on("click", "img", function () {

        if ($(this).attr('data-move') === 'still') {
            $(this).attr('src', $(this).attr('data-animate'))
            $(this).attr('data-move', 'animate')
        } else {
            $(this).attr('src', $(this).attr('data-still'));
            $(this).attr('data-move', 'still')
        }
    })


    $(document).on("click", ".giphy", displayGiphyApi);

});
