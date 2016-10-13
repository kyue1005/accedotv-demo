'use strict';

/*
 * Module dependencies.
 */

const articles = require('../app/controllers/articles');
const comments = require('../app/controllers/comments');
const tags = require('../app/controllers/tags');

/**
 * Route middlewares
 */


/**
 * Expose routes
 */

module.exports = function (app, passport) {
  // article routes
  app.param('id', articles.load);
  app.get('/articles', articles.index);
  app.get('/articles/new', articles.new);
  app.post('/articles', articles.create);
  app.get('/articles/:id', articles.show);
  app.get('/articles/:id/edit', articles.edit);
  app.put('/articles/:id', articles.update);
  app.delete('/articles/:id', articles.destroy);

  // home route
  app.get('/', articles.index);

  // comment routes
  app.param('commentId', comments.load);
  app.post('/articles/:id/comments', comments.create);
  app.get('/articles/:id/comments', comments.create);
  app.delete('/articles/:id/comments/:commentId', comments.destroy);

  // tag routes
  app.get('/tags/:tag', tags.index);


  /**
   * Error handling
   */

  app.use(function (err, req, res, next) {
    // treat as 404
    if (err.message
      && (~err.message.indexOf('not found')
      || (~err.message.indexOf('Cast to ObjectId failed')))) {
      return next();
    }

    console.error(err.stack);

    if (err.stack.includes('ValidationError')) {
      res.status(422).render('422', { error: err.stack });
      return;
    }

    // error page
    res.status(500).render('500', { error: err.stack });
  });

  // assume 404 since no middleware responded
  app.use(function (req, res) {
    const payload = {
      url: req.originalUrl,
      error: 'Not found'
    };
    if (req.accepts('json')) return res.status(404).json(payload);
    res.status(404).render('404', payload);
  });
};
