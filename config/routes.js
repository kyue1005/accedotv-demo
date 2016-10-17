'use strict';

/*
 * Module dependencies.
 */
const express = require('express');
const site = require('../app/controllers/site');
const movies = require('../app/controllers/movies');
const histories = require('../app/controllers/histories');
const records = require('../app/controllers/records');
const historyRecord = require('./middlewares/historyRecord');

/**
 * Route middlewares
 */

/**
 * Expose routes
 */

module.exports = function (app) {
  // partials routes
  app.get('/partials/:name', site.partials);

  // JSON API
  app.get('/api/movies', movies.movies);
  app.get('/api/movie/:name', movies.getMovie);
  app.get('/api/history', historyRecord.getList, histories.list);
  
  // histories routes
  app.param('vid', records.load);
  
  app.post('/histories/records', historyRecord.getList, records.create);
  app.delete('/histories/records/:vid', historyRecord.getList, records.destroy);

  // home route
  app.get('/', historyRecord.getList, site.home);
  app.get('/movies', historyRecord.getList, site.home);
  app.get('/video/:videoName', historyRecord.getList, site.home);
  
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
