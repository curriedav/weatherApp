var SummaryView = require('./summary');
var DetailView  = require('./details');
var ForecastView = require('./forecast');

var MainView = Backbone.View.extend({
  el: 'body',

  template: require('../../templates/main.hbs'),

  initialize: function () {
    this.render();
    this.model.fetch();
  },

  render: function () {
    this.$el.html(this.template());

    this.summaryView = new SummaryView({model: this.model});
    this.detailsView = new DetailView({model: this.model});
    this.forecastView = new ForecastView({model: this.model});

    return this;
  }

});

module.exports = MainView;