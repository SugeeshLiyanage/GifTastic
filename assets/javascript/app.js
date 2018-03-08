$(document).ready(function() {
  //initial array of animals
  var animals = ["Cat","Dog","Rabbit","Elephant","Donkey","Mouse","Pig","Bat","Parrot","Monkey","Lion","Zebra"];
  
  //function for displaying all animal buttons
  function renderButtons() {
  
     //Deleting the animals prior to adding new animals, so that it doesn’t duplicate the results
    $("#buttons-view").empty();
  
    for (var i = 0; i < animals.length; i++) {
  
      //Then dynamically generating buttons for each animal in the array
      var aBtn = $("<button>");
      //adding a class
      aBtn.addClass("animal");
      //adding a data attribute
      aBtn.attr("data-name",animals[i]);
      //provided the initial button text
      aBtn.text(animals[i]);
      //added the button to the html
      $("#buttons-view").append(aBtn);
    }
  }
  //This function handles events where one button is clicked
  function addNewButton() {
  $("#add-animal").on("click", function() {
    //this line grabs the input from the textbox
   var animal = $("#animal-input").val().trim();
  if (animal == "" ) {
  return false;  // added so user cannot add a blank button
  }
    //the animal from the textbox is then added to our array
    animals.push(animal);
  
    //calling renderButtons which handles the processing of our animal array
    renderButtons();
  return false;
  });
  }
  //Function that displays all of the GIFs
  function displayAnimal() {
    var animal = $(this).attr("data-name");
    //constructing a URL to search Giphy for the animal
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";
    console.log(queryURL);  // displays the constructed URL
  
      //performing our ajax GET request
      $.ajax ({
        url: queryURL,
        method: 'GET'
      })
    //After the data comes back from the API
    .done(function(response) {
      console.log(response); // console test to make sure something returns
  
      //Deleting the animals prior to adding new animals
    $("#animalView").empty();
     var results = response.data;
  if ( results == "" ) {
  alert ("There is no animal for this selected button !");
  }
    //looping through the array of animals
    for (var i = 0; i < results.length; i++) {
  
  // div for the animalgifs to go inside
  var gifDiv = $("<div>");
  gifDiv.addClass("gifDiv");
  //getting rating of animalGifs
  var gifRating = $("<p>").text("Rating: " + results[i].rating);
  gifDiv.append(gifRating);
  
      //Creating an image tag
  var animalImage = $("<img>");
  // still image stored into src of image
      animalImage.attr('src', results[i].images.fixed_height_small_still.url);
  // still image
      animalImage.attr ("data-still",results[i].images.fixed_height_small_still.url);
  //Animated image
      animalImage.attr ("data-animate",results[i].images.fixed_height_small.url);
  // Set the image state
    animalImage.attr ("data-state", "still");
  animalImage.addClass("image");
  gifDiv.append(animalImage);
  // Pulling still image of gif 
  // adding div of gifs to Buttons-View
  $("#animalView").prepend(gifDiv);
  }
  });
  }
  // Calling Functions & Methods
  renderButtons();
  addNewButton();
  
  //We're adding a click event listener to all elements with the class "movie"
  $(document).on("click", ".animal", displayAnimal);
  $(document).on("click",".image",function(){
  //in this case, the "this" keyword refers to the button that was clicked
    var state = $(this).attr("data-state");
    if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).data("still"));
          $(this).attr("data-state", "still");
        }
      });
    });
  