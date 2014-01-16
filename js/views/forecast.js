var ForecastView = Backbone.View.extend({
	el: "#forecast",
	
	template: require('../../templates/forecast.hbs'),
	
	initialize: function() {
		this.listenTo(this.model, 'change', this.render);
  		this.render();
  	},
	
	render: function () { 
		if (this.model.get('daily')) {
			var context = this.buildContext();
    		this.$el.html(this.template(context));
    	}
  		return this;
	},
	
	buildContext: function () {
		var context = {
			sevenDayForecast: [],
		};
		
		var daily = this.model.get('daily') || { data:[] };

		var weekDays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

		daily.data.forEach(function (day) {
      		var contextData = {};

      		var timestamp = new Date(day.time * 1000);
			
			contextData = {
	      		weekDay: weekDays[timestamp.getDay()],
	      		date: timestamp.getMonth() + 1 + '/' + timestamp.getDate(),
	      		sunrise: new Date(day.sunriseTime * 1000).toLocaleTimeString("en-us"),
	      		sunset: new Date(day.sunsetTime * 1000).toLocaleTimeString("en-us"),
	      		maxTemp: day.temperatureMax,
	      		minTemp: day.temperatureMin,
	      		summary: day.summary,
	      		precipProb: Math.floor(day.precipProbability * 100),
	      		dateId: timestamp.getDate(),
      		};

      		context.sevenDayForecast.push(contextData);
    	});

		return context;
	}
});

module.exports = ForecastView;