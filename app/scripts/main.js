$(document).ready(function() {

});
_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};

var Article = Backbone.Model.extend({
  url: function() {
    return "https://iron-news.herokuapp.com/articles/" + this.get('id');

  }
});

var Articles = Backbone.Collection.extend({
  url: "https://iron-news.herokuapp.com/articles",
  model: Article
})

var articles = new Articles();

articles.fetch().then(function() {
  _.each(articles.models, function(article) {
    article.fetch().then(function() {
      console.log(article.get('title'))
    })
  })
})

var LineView = Backbone.View.extend({
  tagName: 'li',
  template: _.template($('#lineTemplate').text()),

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this.$el;
  }
});

var PageView = Backbone.View.extend({
  tagName: 'ol',

  render: function() {
    var self = this;
    this.collection.each(function(article) {
      var view = new Lineview({
        model: article
      });
      self.$el.append(view.render());
    })
    return this.$el;
  }
});

var CommentsView = Backbone.View.extend({
  tagName: 'ul',
  template: _.template($('#commentsTemplate').text()),

  render: function() {
    var self = this;
    _each(this.model.get('comments'), function(comment) {
      self.$el.append(self.template(comment));
    })
    return this.$el;
  }
});

//search stuff if I get there . . .
// $(function() {
//   var router = new Router();
//   $(document).on('change', 'form.search input[type=search]', function(event) {
//     router.navigate('#' + $(this).val(), {
//       trigger: true
//     });
//   });
//
//   $(document).on('submit', 'form.search', function(event) {
//     event.preventDefault();
//   });
// });
