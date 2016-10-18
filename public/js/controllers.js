
angular.module('myVOD.controllers', ['ksSwiper'])
  .controller('MovieIndexCtrl', function($scope, $http, $timeout, $location, Movies, Histories) {
    $scope.swiper = {};
    $scope.movies = Movies;
    $scope.histories = Histories;
    $scope.total = $scope.movies.list.length;
    $scope.limit = $scope.limit || 5;
    $scope.offset = $scope.offset || $scope.total;
    $scope.fetching = false;
    
    $scope.onReadySwiper = function (swiper) {
      swiper.on('onSlideChangeStart', $scope.checkSlideVisibility);
      $scope.addVideo(swiper);
    };
    
    $scope.checkSlideVisibility = function (swiper) {
      var visibleSlides = angular.element(document).find(".swiper-slide-visible");
      // last visible slide is 2 slides from the end, fetch more
      if (visibleSlides.last().index() + 2 >= swiper.slides.length) {
        $scope.addVideo();
      }
    };
    // function to fetch movies
    $scope.addVideo = function (swiper) {
      if ($scope.fetching) return;
      $scope.fetching = true;
      
       $http.get('/api/movies?limit=' + $scope.limit + '&offset=' + $scope.offset)
        .success(function(data, status, headers, config) {
          if (data.movies.length) {
            data.movies.forEach(function(movie) {
              $scope.movies.add(movie);
            });
            $scope.offset += $scope.limit;
            // Create intruption, wait for HTML rendering
            $timeout(function() {
              $scope.fetching = false;
              $scope.swiper.update(true);
              $scope.checkSlideVisibility($scope.swiper);
            });
          }
        });
    };
    
    $scope.recordHistory = function($event) {
      $event.preventDefault();
      var target = $event.currentTarget;
      var record = {
        vid: target.getAttribute('data-vid'),
        title: target.getAttribute('data-title')
      }
      
      $http.post('/histories/records', record)
        .success(function(data, status, headers, config) {
          $scope.histories.add(record);
          $location.path('/video/' + record.vid);
        });
    };
  })
  
  .controller('VideoCtrl', function($scope, $routeParams, $http, Movies) {
    $scope.movies = Movies;
    $scope.movie = $scope.movies.list.filter(function(movie) {
      if ($routeParams.vid === movie.vid) {
        return true;
      }
    })[0];
    
    if (!$scope.movie) {
      $http.get('/api/movie/' + $routeParams.vid ).
        success(function(data, status, headers, config) {
          if (data.movie) {
            $scope.movie = data.movie;
          }
        });
    }
  })
  
  .controller('HistoryCtrl', function($scope, $http, Histories) {
    $scope.histories = Histories;
    
    $http.get('/api/history')
      .success(function(data, status, headers, config) {
        if (data.history) {
          // Reverse order, due to record always add to array head
          data.history.reverse().forEach(function(record) {
            $scope.histories.add(record);
          });
        }
      });
  });