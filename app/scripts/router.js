var Router = Backbone.Router.extend({

  routes: {
    " ": "index",
    ":articleId/comments": "comments"
  },

  index: function() {
    var articles = new ArticleCollection();
    $('ul').empty();
    collection.fetch().then(function() {
      _.each(collection.models, function(article) {
        $('ul').append(
          '<li><a href="#' + article.get('id') + '/comments">' +
          article.get('title') + '</a></li>'
        );
      });
    });
    $.ajax('article.html').then(function(page) {
      $('.content').html(page);

    });
  },

  comments: function(articleId) {
    var article = new Article({
      id: articleId
    });
    $('ul').empty();

    article.fetch().then(function() {
      _.each(article.get('comments'), function(comment) {
        $('ul').append('<li>' + comment.message + '</li>');
      });
    });
    $.ajax('comments.html').then(function(page) {
      $('.content').html(page)
    });
  },

  initialize: function() {
    Backbone.history.start();
  }
});

$(function() {
  var router = new Router();
});
