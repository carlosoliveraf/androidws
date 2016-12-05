angular.module("main").controller("blacklistCtrl", function ($rootScope, $scope, $http, $location) {
	
		$scope.newCharacter = false;
		$scope.charactersList = false;
		$scope.charactersStats = false;
		$scope.characters = [""];
		$scope.edition = false;
		$scope.showChars = false;
		$scope.onlineChars = [];
		$scope.field = 'isOnline';

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
					var teste = online.some(checkContain);
					if(teste){
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

		$scope.checkOn = function(char){
			if(char.isOnline){ 
				return 'onlineColor bold'
			}else{
				//style for offline
			};
			

		};


		$scope.orderBy = function(field){
				$scope.field = field;
				$scope.order = !$scope.order;

		};


	    $scope.checkLogged = function(){
					if($rootScope.logged){
						$rootScope.menu = true;
					}else{
						$location.path('/loginview');
					}
	        };
	        
	    $scope.checkLogged();

		$scope.findCharacters = function () {
			$scope.onlineChars = [];
		//$http.get('http://localhost:5000/blacklist/').then(function (response) {
		$http.get('https://shrouded-refuge-17729.herokuapp.com/blacklist/').then(function (response) {
			
			delete $scope.characters;
			$scope.characters = [];
			for(index in response.data){
				if(response.data[index].listedBy == $rootScope.username){

					$scope.characters.push(response.data[index]);
				};
			};

			$http.get('https://shrouded-refuge-17729.herokuapp.com/isonline/').then(function (response) {
			$scope.resp = response.data;
			//console.log(response.data);
			for(index in $scope.resp){
				$scope.onlineChars.push(new String($scope.resp[index].name).valueOf());
			}
			//console.log($scope.onlineChars);
			$scope.isOnline();
		});
			
		});
		};

		$scope.findCharacters();

	

		

		//https://blooming-headland-84997.herokuapp.com/characters/

		$scope.saveCharacter = function(character){
			if(character){
			character.listedBy = $rootScope.username;
			var characString = JSON.stringify(character);
//
			//var res = $http.post('http://localhost:5000/blacklist', character);
			var res = $http.post('https://shrouded-refuge-17729.herokuapp.com/blacklist', character);

			res.success(function(data, status, headers, config) {
			$scope.message = data;
			alert( "Character created!");
			delete $scope.newcharacter;
			delete $scope.oficialResp;
			$scope.findCharacters();
			});
			res.error(function(data, status, headers, config) {
			alert( "failure message: " + JSON.stringify({data: data}));
			});		
    		}else{
    			alert( "Please find an existing character before trying to save!");
    		}
		};




		$scope.eraseCharacter = function (character) {
			var confirmBox = confirm("This character will be deleted from your favorites. Are you sure?");
			if (confirmBox == true) {
			var id = character._id;
			//var res = $http.delete('http://localhost:5000/blacklist/'+id);
			var res = $http.delete('https://shrouded-refuge-17729.herokuapp.com/blacklist/'+id);
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
		$scope.direction = !$scope.direction;
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
					var teste = online.some(checkContain);
					if(teste){
						$scope.characters[index].isOnline = true;
						//console.log($scope.characters[index]);
					}
				}


			} while (!$scope.characters || !$scope.onlineChars);

		};



	// $scope.itens = itens.data;

	// $scope.pedidos = [];
	// $scope.total = 0;
	// $scope.addItem = function (item) {
	// 	$scope.itens.push(item);
	// 	delete $scope.item;
	// };

	// $scope.fazerPedido = function (pedido) {
	// 	pedido.date = new Date();
	// 	pedido.subtotal = pedido.quantidade * pedido.item.price;
	// 	pedido.imposto = impostoService.calcular(pedido.subtotal);
	// 	$scope.pedidos.push(pedido);
	// 	delete $scope.pedido;
	// 	$scope.total = calcularTotal($scope.pedidos);
	// 	$scope.pedidoForm.$setPristine();
	// };

	// var calcularTotal = function (pedidos) {
	// 	var total = 0;
	// 	pedidos.forEach(function (pedido) {
	// 		total += pedido.subtotal;
	// 	});
	// 	return total + impostoService.calcular(total);
	// };

	// $scope.cancelarPedido = function (pedido) {
	// 	var posicao = $scope.pedidos.indexOf(pedido);
	// 	$scope.pedidos.splice(posicao, 1);
	// 	$scope.total = calcularTotal($scope.pedidos);
	// };

	// $scope.setOrdem = function (campo) {
	// 	$scope.campo = campo;
	// 	$scope.direcao = !$scope.direcao;
	// };
});