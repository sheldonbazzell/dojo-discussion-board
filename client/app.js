var app = angular.module('app', ['ngRoute']);
console.log(app)
/* configuration for angular route */
app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'assets/partials/index.html',
      controller: 'indexController',
    })
    .when('/users/:id', {
      templateUrl: 'assets/partials/show.html',
      controller: 'showController'
    })
    .otherwise('/');
});