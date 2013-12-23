var DetailView = Backbone.View.extend({
	el: '#details',

	template: require('../../templates/details.hbs'),

	initialize: function () {
  	this.listenTo(this.model, 'change', this.render);
  	this.render();
	},

	render: function () {
    if (this.model.get('currently')) {
        var context = this.buildContext();
        this.$el.html(this.template(context));
      };
    return this;
	},

  buildContext: function () {
    var curr = this.model.get('currently');      
    var context = {
      summary: curr.summary,
      apparentTemperature: Math.floor(curr.apparentTemperature),
      dewPoint: Math.floor(curr.dewPoint),
      humidity: curr.humidity * 100,
      ozone: Math.floor(curr.ozone),
      precipType: this.model.get('daily').data[0].precipType,
      precipProbability: curr.precipProbability * 100,
      temperature: Math.floor(curr.temperature),
      visibility: Math.floor(curr.visibility),
      windSpeed: Math.floor(curr.windSpeed),
      alerts: this.model.get("alerts") || {}
    };

    return context;
  }
});

module.exports = DetailView;