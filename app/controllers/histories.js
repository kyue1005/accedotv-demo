'use strict';

/**
 * Module dependencies.
 */
 
const mongoose = require('mongoose');
const { wrap: async } = require('co');
const only = require('only');
const { respond, respondOrRedirect } = require('../utils');
const History = mongoose.model('History');

/**
 * Load
 */

exports.load = async(function* (req, res, next) {
  try {
    req.history = yield History.load(req.sessionID);
    if (!req.article) return next(new Error('History not found'));
  } catch (err) {
    return next(err);
  }
  next();
});

/**
 * XMLList
 */
 
exports.list = function (req, res) {
  var history = req.history;
  
  history.records.forEach(function(history, i) {
    
  });
  
  res.json({
    history: history.records
  });
};

/**
 * Create
 */

exports.create = async(function* (req, res, next) {
  var history = new History({session: req.sessionID});
  yield history.save();
  
  res.send('New History created')
});