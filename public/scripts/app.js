var app = angular.module('myApp', [
  'ngRoute',
  'controllersApp'
]);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/signin', {
        templateUrl: 'partials/registration/login.html',
        controller: 'SignInController'
    }).
      when('/signup', {
        templateUrl: 'partials/registration/signup.html',
        controller: 'SignUpController'
      }).
      otherwise({
        redirectTo: '/signin'
      });
}]);