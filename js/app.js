$(function () { // wait for on-ready

var SummaryView = require('./views/summary');
var DetailView = require('./views/details');
var WeatherModel = require('./models/weather');

var app = {};
app.views = {};
app.models = {};

var APIKey = "8fe624851e185eeb5c3007d021c41605"
var LatLong = "45.532814,-122.689296" //Potentially create user input.

var url = "https://api.forecast.io/forecast/" + APIKey + '/' + LatLong;

app.models.currentWeather = new WeatherModel();

app.views.summary = new SummaryView({model: app.models.currentWeather});
app.views.details = new DetailView({model: app.models.currentWeather});
// app.views.forecast = new ForecastView({model: app.models.currentWeather});

window.app = app;

$.getJSON(url + "?callback=?", null, function(weatherData) {
  app.models.currentWeather.set (weatherData); //AJAX request (JSONP to get around the same origin policy which JQUERY is wrapping for us)
});

});