angular.module("main").controller("404errorCtrl", function ($rootScope, $scope, $http,$location) {
	        $scope.errorMsg = "Under construction! I'm still working on this!";

	        $scope.checkLogged = function(){
					if($rootScope.logged){
						$rootScope.menu = true;
					}else{
						$location.path('/loginview');
					}
	        };
	        
	        
	        $scope.checkLogged();
		
});