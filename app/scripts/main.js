// $(document).ready(function() {
//
// });

API_ROOT = "https://iron-news.herokuapp.com/articles/";

_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};

var Article = Backbone.Model.extend({
  url: function() {
    return API_ROOT + this.get('id');

    article.fetch().then(function() {
      console.log(article.get(model.get()))
    })
  }
})

var Articles = Backbone.Collection.extend({
  url: API_ROOT,
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

var NavView = Backbone.View.extend({
  template: _.template($('#navTemplate').text()),

  render: function() {
    $('nav li', this.$el).removeClass('active');

    return this.$el.html(this.template(this.model.attributes));
  }
});

var ArticleView = Backbone.View.extend({
  home: function() {
    var collection = new Articles();
    // this.$el.html($('#articleTemplate').text());
    $('ul').empty();
    collection.fetch().then(function() {
      _.each(this.articles, function(article) {
        $('ol').append('<li><a href="#' + article.get('id') +
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
      // equivalent of rendering a view instead
      _.each(article.get('comments'), function(comment) {
        $('ul').append('<li>' + comment.message + '</li>');
      });
    });
  }
});

var Article = Backbone.Model.extend({
  url: function() {
    return 'http://iron-news.herokuapp.com/articles/' + this.get('id');
  }
});

var ArticleCollection = Backbone.Collection.extend({
  url: 'http://iron-news.herokuapp.com/articles',
  model: Article
});
// }.bind(this));
//
// return this.$el.html(rendered);
//   },
//   initialize: function(options) {
//     this.articles = options.articles;
//   },
//
//   initialize: function() {
//     this.listenTo(this.model, 'change', this.render);
//   },
//
//   addAll: function() {
//     articles.each(this.addOne, this);
//   }
//
// });

$(this).navView = new NavView();
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
