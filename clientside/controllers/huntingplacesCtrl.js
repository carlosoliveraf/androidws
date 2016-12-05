angular.module("main").controller("huntingplacesCtrl", function ($rootScope, $scope, $http, $location) {
	        
			$scope.huntingPlaces = [{'name': 'East Minos','city': 'Oramond', 'vocation': 'Rp/Mages', 'levelRange': '120-220', 'obs': "There`s a trapper over there."},
			{'name': 'Dragon Lords','city': 'Farmine', 'vocation': 'Eds', 'levelRange': '150-220', 'obs': "It's okay to hunt afk."}];

	        $scope.checkLogged = function(){
					if($rootScope.logged){
						$rootScope.menu = true;
					}else{
						$location.path('/loginview');
					}
	        };
	        
	        $scope.checkLogged();
		
});