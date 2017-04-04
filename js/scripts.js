function Cinephile(name, age) {
  this.name = name;
  this.age = age;
}

function Movie(title, showtimes, rating, img) {
  this.title = title;
  this.showtimes = showtimes;
  this.rating = rating;
  this.img = img;
}
// initialize new movies
var movie1 = new Movie("Batman", ["3pm", "9pm", "10pm"], "PG13", "batman.jpg");
var movie2 = new Movie("Power Rangers", ["11am", "2pm", "6pm"], "G");
var movie3 = new Movie("Trainspotting: T2", ["3pm", "8pm", "11pm"], "R");
var movie4 = new Movie("Sing", ["11am", "1pm", "4pm"], "G");
var movie5 = new Movie("Star Trek: Rogue 1", ["6pm", "9pm", "11pm"], "PG13");
var movie6 = new Movie("Pulp Fiction", ["2pm", "9pm", "11pm"], "R");

// all movies array
var movies = [movie1, movie2, movie3, movie4, movie5, movie6];

$(document).ready(function(){

  $("#user-info").submit(function(e){
    e.preventDefault();
    // collect user info
    var userName = $("input[name=user-name]").val();
    var userAge = parseInt($("input[name=user-age]").val());
    // assign info to parameters in new Cinephile object
    var newCinephile = new Cinephile(userName, userAge);

    // chack user age against rating ages
    if (newCinephile.age >= 18) {
      alert("adult");
      movies.forEach(function(movie) {
        $("#movie-list ul").append("<li>" + "<img class='poster' src='img/" + movie.img + "'>" + movie.title + "</li>");
        $("#movie-list").show();
      });
    }

    $("#movie-list ul li").click(function() {
      alert($(this).text());
    });

  });

});
