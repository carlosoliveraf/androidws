angular.module("main").controller("loginCtrl", function ($rootScope, $scope, $http, $routeParams, $location, criptography) {
	
	$rootScope.logged = false;
	$rootScope.menu = false;
	$scope.user;
    $scope.params = {};
    $scope.showPassword = false;
    $scope.error = false;
    $rootScope.isAdmin = false;

    $scope.toggleShowPassword = function() {
        $scope.showPassword = !$scope.showPassword;
    }



    $scope.login = function (params) {
		//$http.get('http://localhost:5000/users/').then(function (response) {
		$http.get('https://shrouded-refuge-17729.herokuapp.com/users/'+params.login).then(function (response) {
			$scope.user = response.data;
			var login = params.login;
			var passw = criptography.encode(params.password);

				if($scope.user.username.toUpperCase() == login.toUpperCase() ){
					if($scope.user.password == passw){
						$rootScope.login = login;
						$rootScope.logged = true;
						$rootScope.menu = true;
						if($scope.user.isAdmin){
							$rootScope.isAdmin = true;
						}
						var nameParts = ($scope.user.name).split(" ");
						$rootScope.username = nameParts[0];
						$scope.error = false;
						return $location.path('/home');
						//return $location.url('/home');
					}
				}

			
			$scope.error = true;

		});
			


		};







});

