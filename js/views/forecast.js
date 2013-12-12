var ForecastView = Backbone.View.extend({
	el: "#forecast",
	template: require('../../templates/forecast.hbs'),
	initialize: function() {
		this.listenTo(this.model, 'change', this.render);
  		this.render();
  	},
	render: function () {
  		var context = {};
  		context.daily = this.model.get('daily') || {};
  		context.weekDays = this.getWeekDays();

  		this.$el.html(this.template(context));
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
	}
});


module.exports = ForecastView;