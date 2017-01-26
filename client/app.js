var app = angular.module('app', ['ngRoute']);
console.log(app)
/* configuration for angular route */
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
    .otherwise('/');
});