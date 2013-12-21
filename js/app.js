$(function () { //Wait for on-ready

	//Load Backbone app modules
	var MainView = require('./views/main');
  	var WeatherModel = require('./models/weather');

  	//App object
  	var app = {
  		views: {},
  		models: {}
  	};

  	//Console access to app
  	window.app = app;

	//Geolocation
	navigator.geolocation.getCurrentPosition(function (position) {
        var latitude  = ((Math.floor(10E5 * (position.coords.latitude)))/10E5);
        var longitude = ((Math.floor(10E5 * (position.coords.longitude)))/10E5);
        
        // var imgMap = new Image();

        LatLong = latitude + "," + longitude;
        
        // imgMap.src = "http://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";

        weatherRequest(apiKey, LatLong);
	});

	//Google reverse geocoding(forthcoming)

	//Forecast.io API access
	var apiKey = "8fe624851e185eeb5c3007d021c41605";

	function weatherRequest(api, latlong) {
        var url = "https://api.forecast.io/forecast/" + api + '/' + latlong;

        $.getJSON(url + "?callback=?", null, function(weatherData) {
                  app.models.currentWeather.set(weatherData);
        });
	};


	//Instantiate Backbone Framework
  	app.models.currentWeather = new WeatherModel();
  	app.views.main = new MainView({model: app.models.currentWeather});
});
