var controllersApp = angular.module('controllersApp', []);

controllersApp.controller('SignInController', ['$scope', '$http',
  function($scope, $http) {
    $scope.AppName = 'Test';
  }]);

controllersApp.controller('SignUpController', ['$scope', '$routeParams',
  function($scope, $routeParams) {
      $scope.AppName = 'Test';
  }]);
