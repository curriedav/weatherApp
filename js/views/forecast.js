var ForecastView = Backbone.View.extend({
	el: "#forecast",
	template: require('../../templates/forecast.hbs'),
	initialize: function() {
		this.listenTo(this.model, 'change', this.render);
  		this.render();
  	},
	render: function () { 
		var context = {};

		if (this.model.get('daily')) { 
  			context = this.buildContext();
  			console.log(context);
  			this.$el.html(this.template(context));
  		}
  		
  		return this;
	},
	// getWeekDays: function () {
	
	// 	var today = new Date().getDay();
	// 	var weekDays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
	// 	var currentWeekDays = [];

	// 	for (var i = today; i <= 6; i++) {
	// 		currentWeekDays.push(weekDays[i]);
	// 	};

	// 	if (today !== 0) {
	// 		for (var i = 0; i < today; i++) {
	// 			currentWeekDays.push(weekDays[i]);
	// 		};
	// 	}

	// 	return currentWeekDays;
	// },
	buildContext: function () {
		var daily = this.model.get('daily') || { data:[] };
		var weekDays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
		var context = {};
		context.forecastDay = [];
		var arr = context.forecastDay;



			// daily.data.forEach(function (day) {
			// 	var contextData = {}
			// 	arr[day] = {	
			// 		weekDay: weekDays[day],
			// 		summary: daily.data[day].summary,
			// 		temperatureMax: Math.floor(daily.data[day].temperatureMax),
			// 		temperatureMin: Math.floor(daily.data[day].temperatureMin),
			// 		precipProbability: Math.floor(daily.data[day].precipProbability * 100),
			// 		precipType: daily.data[day].precipType,
			// 		weekDay: weekDays[new Date(daily.data[day].time * 1000).getDay()]

			// 	}
			// });

		for (var i = 0; i <= 7; i++) {
			arr[i] = {	
				summary: daily.data[i].summary,
				temperatureMax: Math.floor(daily.data[i].temperatureMax),
				temperatureMin: Math.floor(daily.data[i].temperatureMin),
				precipProbability: Math.floor(daily.data[i].precipProbability * 100),
				precipType: daily.data[i].precipType,
				sunriseTime: new Date(daily.data[i].sunriseTime * 1000).toLocaleTimeString("en-us"),
				sunsetTime: new Date(daily.data[i].sunsetTime * 1000).toLocaleTimeString("en-us"),
				weekDay: weekDays[new Date(daily.data[i].time * 1000).getDay()]		
			}
		};

		return context;
	}

});


module.exports = ForecastView;