angular.module("main").controller("usereditionCtrl", function ($rootScope, $scope, $http, $location) {
	
		$scope.username = $rootScope.username;
		$scope.userToEdit;
		var login =	$rootScope.login;
		$scope.users;
		$scope.emailAlreadyTaken = false;
		$scope.difPasswords = false;


		$scope.findUserToEdit = function(login){
			//$http.get('https://shrouded-refuge-17729.herokuapp.com/users/'+$rootScope.login).then(function (response) {
			$http.get('http://localhost:5000/users/'+$rootScope.login).then(function (response) {

			$scope.userToEdit = response.data;
						//return $location.path('/home');
					
		});


		};

		$scope.findUserToEdit(login);

		$scope.findUsers = function () {
				$scope.users = [];
				$http.get('http://localhost:5000/users/').then(function (response) {
				//$http.get('https://shrouded-refuge-17729.herokuapp.com/users/').then(function (response) {
					$scope.users = response.data;
				});
		};

		$scope.findUsers();

		$scope.update = function(user){
			if(user.name){ $scope.userToEdit.name = user.name};
			if(user.email){ $scope.userToEdit.email = user.email};
			if(user.password){ $scope.userToEdit.password = user.password};
			
			//var res = $http.put('https://shrouded-refuge-17729.herokuapp.com/users', user);			
			var res = $http.put('http://localhost:5000/users', $scope.userToEdit);

			res.success(function(data, status, headers, config) {
			$scope.message = data;
			alert( "User succefully edited!");
			$location.path('/home');

});

		};


			$scope.checkPassword = function(user){
		if(!user.password || !user.confirmPassword){
			return $scope.difPasswords = false;
		}
		if(user.password == user.confirmPassword){
			$scope.difPasswords = false;
		}else{
			$scope.difPasswords = true;
		}
	};

		$scope.checkEmail = function(user){
		var email = user.email;
		if(email){
		for(index in $scope.users){
				if($scope.users[index].email.toUpperCase() == email.toUpperCase()){
					return $scope.emailAlreadyTaken = true;
				}else{
					$scope.emailAlreadyTaken = false;
				}
		};
		}else{
			$scope.emailAlreadyTaken = false;
		}
	};

});