var ForecastView = Backbone.View.extend({
	el: "#forecast",
	template: require('../../templates/forecast.hbs'),
	initialize: function() {
		this.listenTo(this.model, 'change', this.render);
  		this.render();
  	},
	render: function () {
  		this.$el.html(this.template(this.model.get('daily')));
  		return this;
	}
});


module.exports = ForecastView;