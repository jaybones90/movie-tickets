// ------------------------------------- BUISINESS LOGIC
// ------------------------------------- BUISINESS LOGIC
// ------------------------------------- BUISINESS LOGIC
function Cinephile(name, age) {
  this.name = name;
  this.age = age;
}
function Movie(title, showtimes, rating, minAge, img) {
  this.title = title;
  this.showtimes = showtimes;
  this.rating = rating;
  this.minAge = minAge;
  this.img = img;
}
// initialize new movies
var movie1 = new Movie("Batman", ["3pm", "9pm", "10pm"], "PG13", 13, "batman.jpg");
var movie2 = new Movie("Power Rangers", ["11am", "2pm", "6pm"], "G", 0, "power-rangers.jpg");
var movie3 = new Movie("Trainspotting: T2", ["3pm", "8pm", "11pm"], "R", 18, "trainspotting-2.jpg");
var movie4 = new Movie("Sing", ["11am", "1pm", "4pm"], "G", 0, "sing.jpg");
var movie5 = new Movie("Star Trek: Rogue 1", ["6pm", "9pm", "11pm"], "PG13", 13, "startreks.jpg");
var movie6 = new Movie("Pulp Fiction", ["2pm", "9pm", "11pm"], "R", 18, "pulp-fiction.jpg");
// all movies array
var movies = [movie1, movie2, movie3, movie4, movie5, movie6];

function Ticket(purchaser, movie, time, cost, qty) {
  this.purchaser = purchaser;
  this.movie = movie;
  this.time = time;
  this.cost = cost;
  this.qty = qty;
}
Ticket.prototype.finalCost = function(t){
  this.cost = 15;
  if (this.age >= 60) {
    this.cost += -5;
  }
  if (t === "11am" || t === "1pm" || t === "2pm" || t === "3pm" || t === "4pm") {
    this.cost += -5;
  }
  this.cost = this.cost * this.qty;
  return this.cost;
}



// ------------------------------------------ UI LOGIC
// ------------------------------------------ UI LOGIC
// ------------------------------------------ UI LOGIC
$(document).ready(function(){

  $("#user-info").submit(function(e){
    e.preventDefault();
    // clear movie list
    $("#movie-list ul").text("");
    // collect user info
    var userName = $("input[name=user-name]").val();
    var userAge = parseInt($("input[name=user-age]").val());

    // assign info to parameters in new Cinephile object
    var newCinephile = new Cinephile(userName, userAge);
    // create new ticket and assign it's purchaser parameter equal to newCinephile's name property
    var newTicket = new Ticket();
    newTicket.purchaser = newCinephile.name;

    // add name to movie list H3
    $("#movie-list h3").text("Thanks " + newCinephile.name + ", here are the movies showing near you:");

    // loop through all movies and check user age against minAge
    movies.forEach(function(movie) {
      if (newCinephile.age >= movie.minAge) {
          $("#movie-list ul").append("<li>" + "<img class='poster' src='img/" + movie.img + "'><br>" + movie.title + "</li>");
      }
    });

    // show movie-list div
    $("#movie-list").show();

    // ----------------- click handler for movie list items
    $("#movie-list ul li").click(function() {
      $("#movie-list ul li").find("img").removeClass("enlarged");
      $(this).find("img").toggleClass("enlarged");
      // create a variable that takes the text from each list item (title)
      var title = $(this).text();
      newTicket.movie = title;
      console.log(newTicket);
      $(".display-showtimes").show();
      $(".display-showtimes h3").text("Ok, " + newCinephile.name + ". Here are the showtimes for " + title + ":");
      $("#showtimes-form").text("");

      // loop through each movie in movies array
      movies.forEach(function(movie) {
        // loop until title equals currently clicked item
        if (movie.title === title) {
          // loop through showtimes
          movie.showtimes.forEach(function(time) {
            $("#showtimes-form").append("<input type='radio' name='times' value='" + time + "'>" + time + "<br>");
          });
          $("#showtimes-form").append("<h3></h3>");
          $("#showtimes-form").append("<span class='qty-span'></span><br>");
          $("#showtimes-form").append("<button id='purchase-button' type='button'>Purchase Tickets</button>");
        }
        });
        $("input[name=times]").change(function(){
          $("#showtimes-form h3").text("Enter your ticket quantity:");
          $(".qty-span").html("<input id='qty' type='number' min='1' max='50'>");
        });
        $("#purchase-button").click(function(){
          var userTime = $("input[name=times]:checked").val();
          var ticketQty = parseInt($("#qty").val());
          newTicket.time = userTime;
          newTicket.qty = ticketQty;
          newTicket.finalCost(userTime);

          $("#wrapper").hide();
          $("#show-final").html(
            "<h3>" + newTicket.purchaser + "</h3>" +
            "<p>purchased " + newTicket.qty + " ticket(s)</p>" +
            "<p>for: <strong>" + newTicket.movie + "</strong></p>" +
            "<p>showing at: " + newTicket.time + "</p>" +
            "<p><strong>Total Cost: $" + newTicket.cost + "</strong></p>"
          );

          console.log(newTicket);

      });
    });

    this.reset();

  });

});
