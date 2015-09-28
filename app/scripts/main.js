$(document).ready(function() {

});
_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};

var Article = Backbone.Model.extend({
  url: function() {
    return "https://iron-news.herokuapp.com/articles/" + this.get('id');

    // article.fetch().then(function() {
    //   console.log(article.get(model.get()))
    // })
  }
})

var Articles = Backbone.Collection.extend({
  url: "https://iron-news.herokuapp.com/articles/",
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



var ArticleView = Backbone.View.extend({
  home: function() {
    var collection = new Articles();
    $('ul').empty();
    collection.fetch().then(function() {
      _.each(collection.articles, function(article) {
        $('ul').append('<li><a href="#' + this.get('id') +
          '/comments>"</li>');
      });
    });
  },

  comments: function(article_id) {
    var article = new Article({
      id: article_id
    });
    $('ul').empty();

    article.fetch().then(function() {
      _.each(article.get('comments'), function(comment) {
        $('ul').append('<li>' + comment.message + '</li>');
      });
    });
  }
});

$(this).articles = new ArticleView();



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
