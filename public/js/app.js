'use strict';

// Declare app level module which depends on filters, and services
angular.module('myVOD', [
  'ngRoute',
  'angularMoment',
  'myVOD.controllers',
  'myVOD.directives',
  'myVOD.services'
  ])
  
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider.when('/movies', {
          templateUrl: 'partials/listMovie',
          controller: 'MovieIndexCtrl'
        })
        .when('/video/:vid', {
          templateUrl: 'partials/video',
          controller: 'VideoCtrl'
        })
        . otherwise({
          redirectTo: '/movies'
        });
    $locationProvider.html5Mode(true);
  })
  
  .run(function ($rootScope) {
    $rootScope.$on('$locationChangeSuccess', function (evt, to, from) {
      $rootScope.previousRoute = from;
    });
  });
