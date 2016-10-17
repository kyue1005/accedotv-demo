'use strict';

/**
 * Module dependencies.
 */

const { wrap: async } = require('co');
const { respondOrRedirect } = require('../utils');

/**
 * Load record
 */

exports.load = function (req, res, next, vid) {
  req.record = req.history.records
    .find(record => record.vid === vid);
    
  if (!req.record) return next(new Error('Record not found'));
  next();
};

/**
 * Create record
 */

exports.create = async(function* (req, res) {
  const history = req.history;
  yield history.addRecord(req.body);
  res.send('Added video record');
});

/**
 * Delete record
 */

exports.destroy = async(function* (req, res) {
  yield req.history.removeComment(req.params.vid);
  res.send('Removed video record');
});