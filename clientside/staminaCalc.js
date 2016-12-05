angular.module("main").service('staminaCalc', function() {
   
		//var x = 200;
		//var a = [37,0];
		

		//
		//var x = timePassed;
		//var a = lastStamina;
		//

	

	var minLeftToGreenAFn = function(array){
		var minutesLeft;
		if(array[0] <= 40){
				var hr = 40 - array[0];
				var min;
		
			if (array[1] > 0) {
				min = 60 - array[1];
				hr = hr - 1;
			}
			if(array[1] === 0){
				minutesLeft = (hr*60);
				return 	minutesLeft;
			}

				minutesLeft = (hr*60) + min;
				return 	minutesLeft;
			
		}else{
			return 0;
		}
	};




    this.calcTime = function (x,a) {
    	// var t calcula os minutos de jogo que faltam para 40
    	var b = [40,0];
		var t =x-(minLeftToGreenAFn(a)*3);
		// testa se o stamina está completo
		if(t >= 1200 || a[0] == 42){
			return [42,0]
		}else{
			//se sobrou minutos para exceder os 40
			if(t>=0){
				var a1 = Math.floor((t/60)/10);
				var a2= (((t/60)/10) % 1)*60;
				b[0] = b[0] + a1;
				b[1] = Math.floor(b[1]+a2);
				return b;
			}else{
			//se nao chega a 40, calcula o restante
				var a1 =   Math.floor((x/60)/3);
				var a2= 60*((x/60)/3);
				a[0] = a[0] + a1;
				a[1] = Math.floor(a[1]+a2);
				if(a[1] >= 60){
					a[1] = a[1] - 60;
				}
				return a;
			
			}
		}





    }




});
