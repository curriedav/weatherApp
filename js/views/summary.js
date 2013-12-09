var SummaryView = Backbone.View.extend({
  el: '#current', // every Backbone view has an associated DOM element

  template: require('../../templates/summary.hbs'), //HBS is not javascript, it is actually a template file using a templating language called handlebars.

  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
    this.render();
  },

  render: function () {
    this.$el.html(this.template(this.model.get('currently')));
    return this;
  }
});

module.exports = SummaryView;