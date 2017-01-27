app.controller('dashboardController', ['$scope', 'usersFactory', 'topicsFactory', 'categoriesFactory', '$location', function($scope,uF,tF,cF,$location){

	$scope.getUser = function(){
		uF.setUser(function(data){
			if(data.name !== undefined) {
				console.log(data);
				$scope.user = data;
			}
		})
	}
	$scope.getUser();

	$scope.isLoggedIn = function() {
		if($scope.user == undefined) {
			$scope.login = 'Please login';
		} else if($scope.user !== undefined){
			$scope.login = null;
		}
	};
	$scope.isLoggedIn();

	$scope.getTopics = function(){
		tF.index(function(data){
			for(var topic in $scope.topics) {
				console.log(topics[topic].posts);
			}
			$scope.topics = data;
		})
	}
	$scope.getTopics();

	$scope.logout = function(){
		$location.url('/');
	}

	$scope.create = function(){
		if($scope.user.name == undefined) {
			$location.url('/');
		}
		tF.create($scope.user, $scope.topic, function(data){
			if(data.errors) {
				if(data.errors == 'Invalid category') {
					$scope.topic_errors = [];
					$scope.topic_errors.push({message:data.errors});
				} else {
					$scope.topic_errors = data.errors;
				}
			} else {
				$scope.topics = data;
			}
		})
	}

	$scope.getCategories = function(){
		cF.index(function(data){
			$scope.categories = data;
		})
	}
	$scope.getCategories();

	$scope.sorted = '';
	$scope.sortCat = function() {
		if($scope.sorted == '_category.category') {
			$scope.sorted = '-_category.category';
		} else if($scope.sorted == '-_category.category') {
			$scope.sorted = '_.category.category'
		} else {
			$scope.sorted = '-_category.category';
		}
	}

	$scope.sortUser = function() {
		if($scope.sorted == 'name') {
			$scope.sorted = '-name';
		} else if($scope.sorted == '-name') {
			$scope.sorted = 'name'
		} else {
			$scope.sorted = '-name';
		}
	}

	$scope.sortTopic = function() {
		if($scope.sorted == 'title') {
			$scope.sorted = '-title';
		} else if($scope.sorted == '-title') {
			$scope.sorted = 'title'
		} else {
			$scope.sorted = '-title';
		}
	}

	$scope.sortPost = function() {
		if($scope.sorted == 'posts.length') {
			$scope.sorted = '-posts.length';
		} else if($scope.sorted == '-posts.length') {
			$scope.sorted = 'posts.length'
		} else {
			$scope.sorted = '-posts.length';
		}
	}

}])