var app = angular.module('myApp', [
  'ngRoute',
  'controllersApp'
]);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/signin', {
        templateUrl: 'view/partials/registration/login.html',
        controller: 'signInController'
      }).
      when('/signup', {
        templateUrl: 'view/partials/registration/signup.html',
        controller: 'signUpController'
      }).
      when('/profile', {
        templateUrl: 'view/partials/profile/profile.html',
        controller: 'profileController'
      }).
      otherwise({
        redirectTo: '/signin'
      });
}]);