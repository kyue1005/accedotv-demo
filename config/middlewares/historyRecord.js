'use strict';
/*
 *  User authorization routing middleware
 */
const mongoose = require('mongoose');
const { wrap: async } = require('co');
const History = mongoose.model('History');

exports.getList = async(function* (req, res, next) {
  if(typeof req.sessionID !== 'undefined') {
    console.log(req.sessionID);
    req.history = yield History.load(req.sessionID);
    if (!req.history) {
      var history = new History({session: req.sessionID});
      req.history = history.save();
    }
  }
  next();
})