var SummaryView = Backbone.View.extend({
  el: '#current', 

  template: require('../../templates/summary.hbs'),

  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
    this.render();
  },

  render: function () {
      if (this.model.get('currently')) {
        this.$el.html(this.template(this.model.get('currently')));
      }
    return this;
  }
});

module.exports = SummaryView;