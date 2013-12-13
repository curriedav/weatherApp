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
	getWeekDays: function () {
	
		var today = new Date().getDay();
		var weekDays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
		var currentWeekDays = [];

		for (var i = today; i <= 6; i++) {
			currentWeekDays.push(weekDays[i]);
		};

		if (today !== 0) {
			for (var i = 0; i < today; i++) {
				currentWeekDays.push(weekDays[i]);
			};
		}

		return currentWeekDays;
	},
	buildContext: function () {
		var daily = this.model.get('daily');
		var weekDays = this.getWeekDays();
		var context = {};
		context.forecastDay = [];
		var arr = context.forecastDay;

		for (var i = 0; i <= 6; i++) {
			arr[i] = {	
				weekDay: weekDays[i],
				summary: daily.data[i].summary,
				temperatureMax: Math.floor(daily.data[i].temperatureMax),
				temperatureMin: Math.floor(daily.data[i].temperatureMin),
				precipProbability: Math.floor(daily.data[i].precipProbability * 100),
				precipType: daily.data[i].precipType		
			}
		};

		return context;
	}

});


module.exports = ForecastView;