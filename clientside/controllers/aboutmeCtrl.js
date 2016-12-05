angular.module("main").controller("aboutmeCtrl", function ($rootScope, $scope, $http,$routeParams, $location) {
	        $scope.aboutme = "olivera rullezz!";

	        $scope.checkLogged = function(){
					if($rootScope.logged){
						$rootScope.menu = true;
					}else{
						$location.path('/loginview');
					}
	        };
	        
	        $scope.checkLogged();
});