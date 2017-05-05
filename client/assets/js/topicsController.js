app.controller('topicsController', ['$scope', '$location', 'topicsFactory',
	'usersFactory', 'postsFactory', 'commentsFactory', 'votesFactory', '$routeParams',
	function($scope,$location,tF,uF,pF,cF,vF,$routeParams){
	$scope.getTopic = function() {
		tF.show($routeParams.id, data => {
			if(data.errors) $location.url('/dashboard')
			$scope.topic = data;
		})
	}
	$scope.getTopic();

	$scope.getUser = function() {
		uF.setUser( data => {
			if(data == undefined) $location.url('/');
			$scope.user = data;
		})
	}
	$scope.getUser();

	$scope.clearErrors = function() {
		$scope.comment_errors = '';
		$scope.post_errors = '';
		$scope.downVote_error = '';
		$scope.upVote_error = '';
	}
	$scope.clearErrors();

	$scope.createPost = function() {
		$scope.clearErrors();
		if($scope.topic.title !== undefined 
			&& $scope.user.name !== undefined
			&& $scope.post !== undefined) {
			$scope.post.topic_id = $scope.topic._id;
			$scope.post.user_id = $scope.user._id;
			pF.create($scope.post, data => {
				if(data.errors) $scope.post_errors = data.errors.content;
				$scope.topic = data;
			})
		} 
		else if($scope.post == undefined && $scope.user.name !== undefined)
			$scope.post_errors = [{message:'Post is required'}];
		else $location.url('/')
	}

	$scope.createComment = function(post, comment) {
		$scope.clearErrors();
		if(comment !== undefined && 
			post.content !== undefined && 
			$scope.user.name !== undefined) {
			comment.post_id = post._id;
			comment.user_id = $scope.user._id;
			comment.topic_id = $scope.topic._id;
			cF.create(comment, data => {
				if(data.errors) $scope.comment_errors = data.errors;
				$scope.topic = data;
			})
		} else if(comment == undefined && $scope.user.name !== undefined)
			$scope.comment_errors = [{message:'Comment is required'}];
		else $location.url('/')
	}

	$scope.createUpvote = function(post) {
		$scope.clearErrors();
		if(post !== undefined && $scope.user !== undefined) {
			if(post._user !== undefined) {
				$scope.upVote = {};
				$scope.upVote.topic_id = $scope.topic._id;
				$scope.upVote.post_id = post._id;
				$scope.upVote.user_id = $scope.user._id;
				vF.createUpVote($scope.upVote, data => {
					if(data[0] && data[0].error) 
						$scope.upVote_error = data[0].error;
					else 
						$scope.topic = data;
				})
			}
		} else if($scope.user.name == undefined)
			$scope.vote_error = "Please login to enable voting";
	}

	$scope.createDownvote = function(post) {
		$scope.clearErrors();
		if(post !== undefined && $scope.user !== undefined) {
			if(post._user !== undefined) {
				$scope.downVote = {};
				$scope.downVote.topic_id = $scope.topic._id;
				$scope.downVote.post_id = post._id;
				$scope.downVote.user_id = $scope.user._id;
				vF.createDownVote($scope.downVote, data => {
					if(data[0] && data[0].error)
						$scope.downVote_error = data[0].error;
					else
 						$scope.topic = data;
				})
			}
		} else if($scope.user.name == undefined)
			$scope.vote_error = "Please login to enable voting";
	}
}])