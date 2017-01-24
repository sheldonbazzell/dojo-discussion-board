console.log('indexController');
app.controller('indexController', ['$scope', 'usersFactory', '$location', function($scope, uF, $location){

	$scope.create = function(){
		uF.create($scope.user, function(data){
			if(data.errors){
				$scope.errors = data.errors;
			}
			else{
				console.log(data);
				$location.url('/users/' + data._id)
			}
		})
	}

}])