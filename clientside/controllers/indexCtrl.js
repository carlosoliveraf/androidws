angular.module("main").controller("indexCtrl", function ($rootScope,$scope, $http, $location) {
	        $scope.helloWorld = "Bem vindo meu amigo ";
	        $scope.posts = [];

	        $scope.checkLogged = function(){
					if($rootScope.logged){
						$rootScope.menu = true;
					}else{
						$location.path('/loginview');
					}
	        };
	        
	        $scope.checkLogged();
	        
	        $scope.click = function(){
	        	console.log("click1");
	        };


		$scope.findCharacters = function () {
			$scope.onlineChars = [];
		//$http.get('http://localhost:5000/posts/').then(function (response) {
		$http.get('https://shrouded-refuge-17729.herokuapp.com/posts/').then(function (response) {
			
			delete $scope.posts;
			$scope.posts = response.data;
			

				

			
			
		});
		};

		$scope.findCharacters();


		
});