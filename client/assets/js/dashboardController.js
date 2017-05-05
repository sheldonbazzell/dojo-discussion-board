app.controller('dashboardController', ['$scope', 'usersFactory', 'topicsFactory', 'categoriesFactory', '$location', function($scope,uF,tF,cF,$location){

	$scope.getUser = function() {
		uF.setUser( data => {
			if(data.name !== undefined) $scope.user = data;
		})
	}
	$scope.getUser();

	$scope.isLoggedIn = function() {
		$scope.user ? $scope.login = null : $scope.login = 'Please login';
	};
	$scope.isLoggedIn();

	$scope.getTopics = function() {
		tF.index( data => {
			$scope.topics = data;
			return;
		})
	}
	$scope.getTopics();

	$scope.logout = function(){
		$location.url('/');
	}

	$scope.create = function(){
		if($scope.user.name == undefined) $location.url('/');
		tF.create($scope.user, $scope.topic, data => {
			if(data.errors) {
				if(data.errors == 'Invalid category')
					$scope.topic_errors = [{message:data.errors}];
				else $scope.topic_errors = data.errors;
			} else $scope.topics = data;
		})
	}

	$scope.getCategories = function(){
		cF.index( data => {
			$scope.categories = data;
			return;
		})
	}
	$scope.getCategories();

	$scope.sorted = '';
	$scope.sortCat = function() {
		const cat = '_category.category', notCat = '-_category.category'
		$scope.sorted == cat ? $scope.sorted = notCat : cat;
	}
	$scope.sortUser = function() {
		const name = 'name', notName = '-name';
		$scope.sorted == name ? $scope.sorted = notName : name;
	}
	$scope.sortTopic = function() {
		const title = 'title', notTitle = '-title';		
		$scope.sorted == title ? $scope.sorted = notTitle : title;
	}
	$scope.sortPost = function() {
		let len = 'posts.length', notLen = '-posts.length';
		$scope.sorted == len ? $scope.sorted = notLen : len;
	}

}])