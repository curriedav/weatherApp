var DetailView = Backbone.View.extend({
	el: '#details', // every Backbone view has an associated DOM element

  	template: require('../../templates/details.hbs'), //HBS is not javascript, it is actually a template file using a templating language called handlebars.

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
        humidity: Math.floor(curr.humidity),
        ozone: Math.floor(curr.ozone),
        precipProbability: Math.floor(curr.precipProbability) * 100,
        temperature: Math.floor(curr.temperature),
        visibility: Math.floor(curr.visibility),
        windSpeed: Math.floor(curr.windSpeed)
      };
    
    return context;
    }

});

module.exports = DetailView;