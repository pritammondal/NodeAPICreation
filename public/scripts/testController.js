var controllersApp = angular.module('controllersApp', []);

controllersApp.controller('signInController', ['$scope', '$http', '$location',
  function($scope, $http, $location) {
    
    $scope.accountLogin = function (userdetails) {
    	$http({
        	method  : 'POST',
        	url     : 'devapi/login',
			data    : userdetails
        })
        .success(function(res) {
        	if (res.success) {
        		$location.path('profile');
        	}
        });
    };

  }]);

controllersApp.controller('signUpController', ['$scope', '$routeParams',
  function($scope, $routeParams) {
      $scope.AppName = 'Test';
  }]);

controllersApp.controller('profileController', ['$scope', '$routeParams',
  function($scope, $routeParams) {
      $scope.AppName = 'Test';
  }]);
