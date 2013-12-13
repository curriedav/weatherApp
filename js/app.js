$(function () { // wait for on-ready

var SummaryView = require('./views/summary');
var DetailView = require('./views/details');
var ForecastView= require('./views/forecast');
var WeatherModel = require('./models/weather');

var app = {};
app.views = {};
app.models = {};

//Geolocation
function success(position) {
	var latitude  = ((Math.floor(10E5 * (position.coords.latitude)))/10E5);
	var longitude = ((Math.floor(10E5 * (position.coords.longitude)))/10E5);
	
	var imgMap = new Image();

	LatLong = latitude + "," + longitude;
	
	imgMap.src = "http://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";

	weatherRequest(APIKey, LatLong);
};

 navigator.geolocation.getCurrentPosition(success);

//Forecast.io API access
var APIKey = "8fe624851e185eeb5c3007d021c41605"

function weatherRequest(api, latlong) {
	var url = "https://api.forecast.io/forecast/" + api + '/' + latlong;

	$.getJSON(url + "?callback=?", null, function(weatherData) {
  		app.models.currentWeather.set (weatherData); //AJAX request (JSONP to get around the same origin policy which JQUERY is wrapping for us)
	});
};

//Backbone Models
app.models.currentWeather = new WeatherModel();

//Backbone Views
app.views.summary = new SummaryView({model: app.models.currentWeather});
app.views.details = new DetailView({model: app.models.currentWeather});
app.views.forecast = new ForecastView({model: app.models.currentWeather});

//Console access to app
window.app = app;

});