var Router = Backbone.Router.extend({

  routes: {
    // "*path": "home"
    "home": "showArticle",
    "id/comments": "showComment"
  },

  showArticle: function() {
    $.ajax('article.html').then(function(page) {
      $('.content').html(page);

    });
  },

  showComment: function() {
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
  console.log('new router');
});
