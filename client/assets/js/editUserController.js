app.controller('editUserController', ['$scope', '$routeParams', '$location', 'usersFactory', function($scope,$routeParams,$location,uF) {

	$scope.user = {};

	$scope.setUser = function() {
		uF.show($routeParams.id, function(data) {
			$scope.user = data;
			$scope.user.birthday = new Date($scope.user.birthday);
		})
	}
	$scope.setUser();

	$scope.update = function() {
		uF.update($scope.user, function(data) {
			console.log(data);
			if(data._id) {
				$location.url('/users/' + data._id)
			} else {
				$location.url('/dashboard');
			}
		})
	}

}])