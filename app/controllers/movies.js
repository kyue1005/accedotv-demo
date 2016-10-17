'use strict';

/**
 * Module dependencies.
 */
 
const { wrap: async } = require('co');
const moviesModel = require('../models/movie');

function parseMovieObj (movie, index) {
  var coverImg = movie.images.filter(function( img ) {
    return img.type == 'cover';
  });
  return {
    id: index,
    vid: movie.id,
    title: movie.title,
    text: movie.description.substr(0, 50) + '...',
    cover: {
      w: coverImg[0].width,
      h: coverImg[0].height,
      url: coverImg[0].url
    },
    info: movie.contents
  }
}

exports.movies = async(function* (req, res) {
  var movies = [];
  var limit = -1;
  var offset = 0;
  var dataObj =  yield moviesModel;
  
  if (req.query && typeof req.query.limit !== 'undefined' && req.query.limit) {
    limit = parseInt(req.query.limit, 10);
  }
  
  if (req.query && typeof req.query.offset !== 'undefined' && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
  }
  
  if (limit > 0 && offset >= 0) {
    dataObj.entries.slice(offset, offset + limit).forEach(function (movie, i) {
      movies.push(parseMovieObj(movie, i + offset));
    });
  }
  
  res.json({
    movies: movies
  });
});

exports.getMovie = async(function* (req, res) {
  var result = {};
  var dataObj =  yield moviesModel;
  if (req.params && typeof req.params.name !== 'undefined' && req.params.name) {
    dataObj.entries.filter(function(movie, i) {
      result = parseMovieObj(movie, i);
    });
  }
  res.json({
    movie: result
  });
});