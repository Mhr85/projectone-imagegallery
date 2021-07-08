var superHerosGifs = ["Superman", "Batman", "Spiderman", "Hulk"];
$(document).ready(function(){
  function displayGifInfo(){
    var superHero = $(this).attr("data-name");
    var queryURLSuperHeros = "https://api.giphy.com/v1/gifs/search?api_key=zl9ZdkpIr4qTo1y58rRsPUqsylAYB6Ep&q=" + superHero + "&limit=100";

    $.ajax({
      url: queryURLSuperHeros,
      method: "GET"
    }).then(function(response){
      $("#gif-view").empty();
        console.log(response.data[0].rating);
        console.log(response.data[0].title);
        var gifyDiv = $("<div class='gify'>");
        var gifyRating = [
          response.data[0].rating,
          response.data[1].rating,
          response.data[2].rating,
          response.data[3].rating,
          response.data[4].rating,
          response.data[5].rating,
          response.data[6].rating,
          response.data[7].rating,
          response.data[8].rating,
          response.data[9].rating,
        ];
        var gifyStillURL = [
          response.data[0].images.original_still.url,
          response.data[1].images.original_still.url,
          response.data[2].images.original_still.url,
          response.data[3].images.original_still.url,
          response.data[4].images.original_still.url,
          response.data[5].images.original_still.url,
          response.data[6].images.original_still.url,
          response.data[7].images.original_still.url,
          response.data[8].images.original_still.url,
          response.data[9].images.original_still.url,
        ];
        var gifyAnimationURL = [
          response.data[0].images.original.url,
          response.data[1].images.original.url,
          response.data[2].images.original.url,
          response.data[3].images.original.url,
          response.data[4].images.original.url,
          response.data[5].images.original.url,
          response.data[6].images.original.url,
          response.data[7].images.original.url,
          response.data[8].images.original.url,
          response.data[9].images.original.url,
          response.data[10].images.original.url,
        ];


      $.each(gifyStillURL, function(i, gifyStill){
        var stillImages = $("<img>");
        stillImages.attr('src', gifyStillURL[i]);
        stillImages.attr('data-still', ('src', gifyStillURL[i]));
        stillImages.attr('data-animate', ('src', gifyAnimationURL[i]));
        stillImages.attr('data-state', 'still');
        stillImages.attr('id', 'images');
        stillImages.addClass("gif");

        var individualImagesDiv = $("<div>");
        individualImagesDiv.addClass("card bg-none text-success");
        individualImagesDiv.text("Rating: " + gifyRating[i]);
        individualImagesDiv.prepend(stillImages);

        (gifyDiv).prepend(individualImagesDiv);
        //(gifyDiv).prepend(stillImages);
        console.log(stillImages);
      });

      $.each(gifyRating, function(i, ratings){
        var pOne = $("<p>").text("Rating: " + gifyRating[i]);
        $("#images").append(pOne);
      });

      $("#gif-view").append(gifyDiv);
    });
  };

  $(".container").on("click", ".gif", function(){
      var state = $(this).attr("data-state");
      console.log(state);

      if(state === "still"){
        $(this).attr('src', $(this).attr('data-animate'));
        $(this).attr('data-state', 'animate');
      } else {
        $(this).attr('src', $(this).attr('data-still'));
        $(this).attr('data-state', 'still');
      }
  });

  function renderButtons(){

    $("#button-view").empty();

    $.each(superHerosGifs, function(i, buttonIndex){
      var generateButtons = $("<button>").addClass("gif-buttons btn btn-outline-warning m-2 p-2")
      generateButtons.attr('data-name', superHerosGifs[i]).text(superHerosGifs[i]).appendTo("#button-view");
    });

  };


  $("#add-gify").on("click", function(event){
    event.preventDefault();

    var gif = $("#gify-input").val().trim();

    superHerosGifs.push(gif);

    renderButtons();
  });

  $(document).on("click", ".gif-buttons", displayGifInfo);

  renderButtons();

});
