'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myVOD.services', [])
  .factory('Movies', function(){
    var movies = {};

    movies.list = [];
  
    movies.add = function(movie){
      movies.list.push(movie);
    };
  
    return movies;
  })
  
  .factory('Histories', function(){
    var histories = {};

    histories.list = [];
  
    histories.add = function(record){
      histories.list.unshift(record);
    };
  
    return histories;
  });