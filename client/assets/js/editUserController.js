app.controller('editUserController', ['$scope', '$routeParams', '$location', 'usersFactory', function($scope,$routeParams,$location,uF) {

	$scope.user = {};

	$scope.setUser = function() {
		uF.show($routeParams.id, data => {
			$scope.user = data;
			$scope.user.birthday = new Date($scope.user.birthday);
		})
	}
	$scope.setUser();

	$scope.update = function() {
		uF.update($scope.user, data => {
			let params;
			data._id ? params = '/users/' + data._id : '/dashboard'
			$location.url(params)
		})
	}

}])