console.log('indexController');
app.controller('indexController', ['$scope', 'usersFactory', '$location', function($scope, uF, $location){

	$scope.user = {};

	$scope.create = function(){
		console.log($scope.user);
		uF.create($scope.user, function(data){
			if(data.errors){
				$scope.log_errors = data.errors;
			} else{
				$scope.user = data;
				$location.url('/dashboard')
			}
		})
	}

}])