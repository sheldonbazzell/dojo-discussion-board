app.controller('topicsController', ['$scope', '$location', 'topicsFactory', 'usersFactory', 'postsFactory', 'commentsFactory', '$routeParams', function($scope,$location,tF,uF,pF,cF,$routeParams){
	$scope.getTopic = function() {
		tF.show($routeParams.id, function(data) {
			if(data.errors) {
				$location.url('/dashboard')
			}
			$scope.topic = data;
		})
	}
	$scope.getTopic();

	$scope.getUser = function() {
		uF.setUser(function(data) {
			if(data == undefined) {
				$location.url('/');
			}
			$scope.user = data;
		})
	}
	$scope.getUser();

	$scope.createPost = function() {
		if($scope.topic.title !== undefined 
			&& $scope.user.name !== undefined
			&& $scope.post !== undefined) {
			$scope.post.topic_id = $scope.topic._id;
			$scope.post.user_id = $scope.user._id;
			pF.create($scope.post, function(data) {
				if(data.errors) {
					$scope.post_errors = data.errors.content;
				}
				$scope.topic = data;
			})
		} 
		else if($scope.post == undefined) {
			$scope.post_errors = [{message:'Post is required'}];
		} else {
			$location.url('/')
		}
	}

	$scope.createComment = function(post, comment) {
		if(comment !== undefined && 
			post.content !== undefined && 
			$scope.user.name !== undefined) {
			comment.post_id = post._id;
			comment.user_id = $scope.user._id;
			comment.topic_id = $scope.topic._id;
			cF.create(comment, function(data) {
				if(data.errors) {
					$scope.comment_errors = data.errors;
				}
				console.log(data);
				$scope.topic = data;
			})
		} else {
			$location.url('/')
		}
	}
}])