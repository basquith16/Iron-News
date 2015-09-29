var Router = Backbone.Router.extend({

  routes: {
    " ": "index",
    ":articleId/comments": "comments"
  },

  index: function() {
    var self = this;
    this.articles.fetch().then(function() {
      $('.jumbotron').html(self.pageView.render())
    });
  },

  comments: function(articleId) {
    var article = new Article({
      id: articleId
    });
    article.fetch().then(function() {
      var view = new CommentsView({
        model: article
      });
      $('.jumbotron').html(view.render());
    })
  },

  initialize: function() {
    this.articles = new Articles();
    this.pageView = new PageView({
      collection: this.articles
    })
    Backbone.history.start();
  }
});

$(function() {
  var router = new Router();
});
