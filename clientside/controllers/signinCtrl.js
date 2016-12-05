angular.module("main").controller("signinCtrl", function ($rootScope, $scope, $http, $routeParams, $location, criptography) {
	
	$scope.user;
	$scope.users;
	$scope.difPasswords;
	$scope.userAlreadyTaken;
	$scope.emailAlreadyTaken;



	$scope.findUsers = function () {
		//$http.get('http://localhost:5000/users/').then(function (response) {
		$http.get('https://shrouded-refuge-17729.herokuapp.com/users/').then(function (response) {
			$scope.users = response.data;
		});
	};

	$scope.checkLogin = function(user){
		var username = user.username;
		if(username){
			for(index in $scope.users){
					if($scope.users[index].username.toUpperCase() == username.toUpperCase() ){
						return $scope.userAlreadyTaken = true;
					}else{
						$scope.userAlreadyTaken = false;
					}
			}
		}else{
			$scope.userAlreadyTaken = false;
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


	$scope.signin = function (user) {
    	if(!$scope.userAlreadyTaken && !$scope.emailAlreadyTaken){
    		//user.email = criptography.encode(user.email);
    		
    		user.password = criptography.encode(user.password);
    		user.created_at = new Date();
    		var userString = JSON.stringify(user);
    		var welcomeMail = $http.post('https://shrouded-refuge-17729.herokuapp.com/welcome', user);
			//var res = $http.post('http://localhost:5000/users', user);
			var res = $http.post('https://shrouded-refuge-17729.herokuapp.com/users', user);
			
			res.success(function(data, status, headers, config) {
			$scope.message = data;
			alert( "User registered, please log in!");
			$location.path('/');
			});
			res.error(function(data, status, headers, config) {
			alert( "failure message: " + JSON.stringify({data: data}));
			});				
    	}
	};



	$scope.findUsers();




});

