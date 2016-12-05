angular.module("main").controller("characterCtrl", function ($rootScope, $scope, $http, $location, staminaCalc) {
	
		$scope.newCharacter = false;
		$scope.charactersList = false;
		$scope.charactersStats = false;
		$scope.characters = [""];
		$scope.edition = false;
		$scope.showChars = true;
		$scope.onlineChars = [];
		$scope.field = 'level';
		$scope.order = true;

		$scope.selectChar = function(char){
			$scope.showChars = false;
			$scope.character = char;

		};

		$scope.orderBy = function(field){
				$scope.field = field;
				$scope.order = !$scope.order;

		};

		$scope.staminaClass = function(char){
			if(char.stamina){
				var staminaArr = char.stamina.split(":");
				for(var i in staminaArr){
					staminaArr[i] = parseInt(staminaArr[i]);
				}
			
				if(staminaArr[0] == 42){
					return 'fullStamina bold';
				}
				if(staminaArr[0] >= 40 && staminaArr[0] < 42){
					return 'bonusStamina';
				}
				if(staminaArr[0] < 40){
					return 'lowStamina';
				}

			}

		};

		$scope.checkVoc = function(char){
			if(char.vocation == 'Elite Knight') return 'blueColor bold';
			if(char.vocation == 'Knight') return 'blueColor';
			if(char.vocation == 'Royal Paladin') return 'yellowColor bold';
			if(char.vocation == 'Paladin') return 'yellowColor';
			if(char.vocation == 'Master Sorcerer') return 'pinkColor bold';
			if(char.vocation == 'Sorcerer') return 'pinkColor';
			if(char.vocation == 'Elder Druid') return 'greenColor bold';
			if(char.vocation == 'Druid') return 'greenColor';

		};

		$scope.checkOn = function(char){
			if(char.isOnline){ 
				return 'onlineColor bold'
			}else{
				//style for offline
			};
			

		};


	$scope.isOnline = function(){

			do {
				var name;
    			var names = [];
    			var online = $scope.onlineChars;
    			for(index in $scope.characters){
					names.push(new String($scope.characters[index].name).valueOf());
				}
				    			//console.log(names);
				    			//console.log(online);

				function checkContain(online) {

					var nameFrmt = name.replace(/[^A-Za-z]/ig, "");
					var onlineFrmt = online.replace(/[^A-Za-z]/ig, "");

					return (nameFrmt === onlineFrmt );
				}
				for(var index in names){
					name = names[index];
					var testArray = online.some(checkContain);
					if(testArray){
						$scope.characters[index].isOnline = true;
						//console.log($scope.characters[index]);
					}
				}


			} while (!$scope.characters || !$scope.onlineChars);

		};

	

		$scope.checkCharacter = function(oficial){
			if(oficial){
			//$http.get('http://localhost:5000/oficial/'+oficial.name).then(function (response) {
			$http.get('https://shrouded-refuge-17729.herokuapp.com/oficial/' + oficial.name).then(function (response) {
			$scope.oficialResp = response.data;
			delete $scope.oficial;
			}
			

		);
		}
		};

		$scope.showAll = function(){
			$scope.showChars = !$scope.showChars;
			$scope.character = null;
		};

		


	    $scope.checkLogged = function(){
					if($rootScope.logged){
						$rootScope.menu = true;
					}else{
						$location.path('/loginview');
					}
	        };
	        
	        $scope.checkLogged();


		$scope.vocations = [ 'Knight' ,'Elite Knight','Paladin' ,'Royal Paladin','Sorcerer' , 'Master Sorcerer','Druid', 'Elder Druid'];

		$scope.findCharacters = function (character) {
			$scope.onlineChars = [];
		//$http.get('http://localhost:5000/characters/').then(function (response) {
		$http.get('https://shrouded-refuge-17729.herokuapp.com/characters/').then(function (response) {
			//$scope.characters = response.data;
			delete $scope.characters;
			$scope.characters = [];
			for(index in response.data){
				if(response.data[index].owner == $rootScope.username){
					if(response.data[index].staminaUpdate && response.data[index].stamina != '0'){
						

						var collectionDate = response.data[index].staminaUpdate; 
	 	   				var newDate = new Date(collectionDate);
	 					

						var timePassed = newDate.getTime() - (new Date()).getTime();
						var seconds = Math.floor((timePassed)/(1000));
						var minPassed = (seconds/60)*-1;
						
						var sta = response.data[index].stamina.split(":");

						for(var i in sta){
							sta[i] = parseInt(sta[i]);
						}
																	
					
						var abc = staminaCalc.calcTime(minPassed, sta);
						
						if(abc[1].toString().length == 1){	
							abc[1] = "0"+ abc[1];
						};
						if(abc[1].toString().length >= 3){
							abc[1] = abc[1].toString().charAt(0) + abc[1].toString().charAt(1);
						};
						
						abc = abc[0] + ":" + abc[1];
						
						response.data[index].stamina = abc;
					}
					$scope.characters.push(response.data[index]);
				};
			};

			
$http.get('https://shrouded-refuge-17729.herokuapp.com/isonline/').then(function (response) {
			$scope.resp = response.data;
			//console.log(response.data);
			for(index in $scope.resp){
				$scope.onlineChars.push(new String($scope.resp[index].name).valueOf());
			}
			
			$scope.isOnline();
		});

        
  


			

		});

		};

		$scope.findCharacters();

	

		

		//https://blooming-headland-84997.herokuapp.com/characters/

		$scope.saveCharacter = function(character){
			if(character){
			character.owner = $rootScope.username;
			var characString = JSON.stringify(character);
			character.staminaUpdate = new Date();
			character.stamina = " ";
			character.balance = 0;

			//var res = $http.post('http://localhost:5000/characters', character);
			var res = $http.post('https://shrouded-refuge-17729.herokuapp.com/characters', character);

			res.success(function(data, status, headers, config) {
			$scope.message = data;
			alert( "Character created!");
			delete $scope.newcharacter;
			delete $scope.oficialResp;
			});
			res.error(function(data, status, headers, config) {
			alert( "failure message: " + JSON.stringify({data: data}));
			});		
    		}else{
    			alert( "Please find an existing character before trying to save!");
    		}
		};

		$scope.editCharacter = function(character){
			//console.log($scope.onlineChars);
			$scope.edition = true;
		};

		$scope.updateCharacter = function(character){
			character.staminaUpdate = new Date();
			//var res = $http.put('http://localhost:5000/characters', character);
			var res = $http.put('https://shrouded-refuge-17729.herokuapp.com/characters', character);
			res.success(function(data, status, headers, config) {
			$scope.message = data;
			alert( "Character updated!");
			});
			res.error(function(data, status, headers, config) {
			alert( "failure message: " + JSON.stringify({data: data}));
			});		
			$scope.edition = false;
		};


		$scope.eraseCharacter = function (character) {
			var confirmBox = confirm("This character will be deleted from your favorites. Are you sure?");
			if (confirmBox == true) {
			var id = character._id;
			//var res = $http.delete('http://localhost:5000/characters/'+id);
			var res = $http.delete('https://shrouded-refuge-17729.herokuapp.com/characters/'+id);
			res.success(function(data, status, headers, config) {
			$scope.message = data;
			var posicao = $scope.characters.indexOf(character);
			$scope.characters.splice(posicao, 1);
			alert( "Character removed!");

			});
			res.error(function(data, status, headers, config) {
			alert( "failure message: " + JSON.stringify({data: data}));
			});
			}
		// var id = character.id;
		// $http.delete('http://127.0.0.1:5000/characters/'+id).then(function (response) {
		// 	$scope.characters = response.data;
		// });
		};

		$scope.setOrder = function (field) {
		$scope.field = field;
		$scope.order = !$scope.order;
		};


		

		$scope.showCharactersStats = function(){
			$scope.charactersStats = !$scope.charactersStats;
			$scope.newCharacter = false;
			$scope.charactersList = false;
			delete $scope.character;
			delete $scope.newcharacter;




		}

		$scope.clearFields = function(newcharacter){
			delete $scope.newcharacter;

		}



});