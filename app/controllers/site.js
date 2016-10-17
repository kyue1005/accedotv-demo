'use strict';

/**
 * Module dependencies.
 */

const { respond, respondOrRedirect } = require('../utils');

/**
 * Update article
 */

exports.home = function (req, res){
   res.render('index');
};

exports.partials = function (req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
};