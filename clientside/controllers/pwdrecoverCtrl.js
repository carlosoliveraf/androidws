angular.module("main").controller("pwdrecoverCtrl", function ($rootScope, $scope, $http, $location) {
	
		$scope.users;
		$scope.error = false;
		$scope.msgSent = false;

		$scope.findUsers = function () {
		//$http.get('http://localhost:5000/users/').then(function (response) {
		$http.get('https://shrouded-refuge-17729.herokuapp.com/users/').then(function (response) {
			$scope.users = response.data;
		});
	};

	$scope.findUsers();
	
		
			$scope.checkUserMail = function(user){

				for(index in $scope.users){
					if($scope.users[index].username.toUpperCase() == user.username.toUpperCase() ){
						if($scope.users[index].email == user.email){
							var userDest = $scope.users[index];
							console.log(userDest);
							$http.post('https://shrouded-refuge-17729.herokuapp.com/forgotpasswordmail', userDest);
							//$http.post('http://localhost:5000/forgotpasswordmail', userDest);
							$scope.msgSent = true;
							$scope.user = null;
							return $scope.error = false;
							
						}
					}

				};
				$scope.error = true;
			};
	   
	        
	    

		

	

		
});