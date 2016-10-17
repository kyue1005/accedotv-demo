'use strict';

/* Directives */

angular.module('myVOD.directives', [])
  .directive('html5vfix', function() {
    return {
      restrict: 'A',
      link: function(scope, element, attr) {
        attr.$set('src', attr.vsrc);
      }
    }
  })
  
  .directive('videoListener', function($rootScope, $location, $timeout) {
    return {
      restrict: 'A',
      link: function(scope, element, attr) {
        var mouseTimer;
        var titleFader = function() {
          angular.element(document).find(".video-player h4, .video-player i").fadeOut(100);
        };
        
        element.on('loadedmetadata', function(e) {
          mouseTimer = $timeout(titleFader, 500);
        });
        element.on('mousemove', function(e) {
          $timeout.cancel(mouseTimer);
          angular.element(document).find(".video-player h4, .video-player i").fadeIn(200);
          mouseTimer = $timeout(titleFader, 3000);
        });
        element.on('ended', function() {
          $rootScope.$apply(function() {
            $location.path($rootScope.previousRoute);
          });
        });
        element.parent('.video-player').on('mouseleave', function(e) {
          e.stopPropagation();
          titleFader();
        });
        element.parent('.video-player').find('i').on('click', function(e) {
          $rootScope.$apply(function() {
            $location.path($rootScope.previousRoute);
          });
        });
      }
    }
  })
  
  .directive('historyBtn', function($document) {
    return {
      restrict: 'A',
      link: function(scope, element, attr) {
        element.on('click', function(e) {
          e.stopPropagation();
          element.siblings('.history-popup').fadeIn().slideDown();
        });
        $document.find('body').on('click', function(e) {
          element.siblings('.history-popup').fadeOut().slideUp();
        });
      }
    }
  });