$(function () { //Wait for on-ready

	//Load Backbone app modules
	var SummaryView = require('./views/summary');
	var DetailView = require('./views/details');
	var ForecastView= require('./views/forecast');
  	var WeatherModel = require('./models/weather');

  	//App object
	var app = {};
	app.views = {};
	app.models = {};

	//Geolocation
	function success(position) {
	var latitude  = position.coords.latitude;
	var longitude = position.coords.longitude;
	
	//var imgMap = new Image();

	LatLong = latitude + "," + longitude;
	
	//imgMap.src = "http://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";

	weatherRequest(LatLong);
	};

	navigator.geolocation.getCurrentPosition(success);

  	//Console access to app
  	window.app = app;

	//Google reverse geocoding(forthcoming)

	//Forecast.io API access
	function weatherRequest(latlong) {
		var apiKey = "8fe624851e185eeb5c3007d021c41605"
		var url = "https://api.forecast.io/forecast/" + apiKey + '/' + latlong;

		$.getJSON(url + "?callback=?", null, function(weatherData) {
	  		app.models.currentWeather.set(weatherData);
		});
	};

	//Instantiate Backbone Model
	app.models.currentWeather = new WeatherModel();

	//Instantiate Backbone Views
	app.views.summary = new SummaryView({model: app.models.currentWeather});
	app.views.details = new DetailView({model: app.models.currentWeather});
	app.views.forecast = new ForecastView({model: app.models.currentWeather});

	//Console access to app
	window.app = app;
});
