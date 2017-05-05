console.log('indexController');
app.controller('indexController', ['$scope', 'usersFactory', '$location', function($scope, uF, $location){

	$scope.user = {};

	$scope.create = function(){
		uF.create($scope.user, data => {
			if(data.errors)
				$scope.log_errors = data.errors;
			else
				$scope.user = data;
				$location.url('/dashboard')
		})
	}

}])