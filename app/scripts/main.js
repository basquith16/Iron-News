$(function() {

})

var Article = Backbone.Model.extend({

  defaults: function() {
    return {
      title: " ",
      url: ' ',
      submitter: " "
    };
  },
})
var ArticleList = Backbone.Collection.extend({
  model: Article,
})


var ArticleView = Backbone.View.extend({
  tagName: "li",
  template: _.template($('#item-template').html()),
  events: {},

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
  },

  addAll: function() {
    articles.each(this.addOne, this);
  }

});

var News = new ArticleView;
