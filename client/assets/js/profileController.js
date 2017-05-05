app.controller('profileController', ['$scope', '$routeParams', 'usersFactory', 'votesFactory', function($scope,$routeParams,uF,vF) {
	
	$scope.topicStr   = '';
	$scope.postStr    = '';
	$scope.commentStr = '';
	$scope.reputation = 0;

	$scope.user = function() {
		uF.show($routeParams.id, data => {
			let topics   = data.topics.length,
				posts    = data.posts.length,
				comments = data.comments.length;
			topics    == 1 ? $scope.topicStr     = 'topic'   : $scope.topicStr       = 'topics';
			posts     == 1 ? $scope.postStr      = 'post'    : $scope.postStr         = 'posts';
			comments  == 1 ? $scope.commentStr   = 'comment' : $scope.commentStr   = 'comments';
			$scope.user = data;
			$scope.reputation = data.upVotes.length - data.downVotes.length;
		})
	}
	$scope.user();
}])