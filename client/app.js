var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'assets/partials/index.html',
      controller: 'indexController',
    })
    .when('/dashboard', {
      templateUrl: 'assets/partials/dashboard.html',
      controller: 'dashboardController'
    })
    .when('/topics/:id', {
      templateUrl: 'assets/partials/show.html',
      controller: 'topicsController'
    })
    .when('/users/:id', {
      templateUrl: 'assets/partials/profile.html',
      controller: 'profileController'
    })
    .otherwise('/');
});