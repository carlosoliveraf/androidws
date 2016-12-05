angular.module("main").controller("adminCtrl", function ($rootScope, $scope, $http, $location) {
	$scope.categories = [ 'news', 'tutorials', 'updates', 'other'];
	$scope.tags = [];
	$scope.tagsString;
	$scope.tag;
	$scope.lastTag;
	$scope.message;
	$scope.post;

	$scope.addTag = function(tag){
		if(tag){
		$scope.tags.push(tag);
		var index = $scope.tags.length;
			if(index < $scope.tags.length && index > 1){
				$scope.tagsString = $scope.tagsString + ', ' + tag;
			}else{
				if(index == 1){
					$scope.tagsString = tag + '.';
				}else{
					$scope.tagsString = $scope.tagsString.slice(0, -1);
					$scope.tagsString = $scope.tagsString + ', ' + tag + '.';
				}

			}
		$scope.lastTag = tag + '.'
		delete $scope.tag;
	}
	};

	$scope.removeTag = function(){
		if($scope.tags.length == 0){
			$scope.tags = [];
			delete $scope.lastTag;
			delete $scope.tagsString;

		}else{
		if($scope.tags.length == 1){
			$scope.tags = [];
			delete $scope.lastTag;
			delete $scope.tagsString;
		}else{
		var pos = $scope.tagsString.search($scope.lastTag);
		$scope.tagsString = $scope.tagsString.substring(0,pos-2);
		$scope.tagsString = $scope.tagsString + '.';
		$scope.tags.pop();
		if($scope.tags.length == 0){
			$scope.tags = [];
			delete $scope.lastTag;
			delete $scope.tagsString;
		}
		
		var temp = $scope.tagsString.split(', ');
		console.log($scope.tagsString);
		temp = temp[temp.length-1];
		temp = temp.substring(0,temp.length-1);
		$scope.lastTag = temp;
	}}
	};
	

	$scope.submitPost = function(post){
		post.date = new Date();
		if($scope.tags.length > 0){
		post.tags = $scope.tags;
		}
		post.username = $rootScope.login;


		var res = $http.post('https://shrouded-refuge-17729.herokuapp.com/posts', post);
		//var res = $http.post('http://localhost:5000/posts', post);
			
			res.success(function(data, status, headers, config) {
			$scope.message = data;
			delete $scope.post;
			});
			res.error(function(data, status, headers, config) {
			alert( "failure message: " + JSON.stringify({data: data}));
			});


	};

	$scope.clear = function(){
		delete $scope.post;
		$scope.tags = [];
		delete $scope.lastTag;
		delete $scope.tagsString;
		delete $scope.tag;
	};


		
});