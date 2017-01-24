console.log("showController")
app.controller('showController', ['$scope', 'messagesFactory', 'usersFactory', 'commentsFactory', function($scope, mF, uF, cF){
	
	$scope.user = {};
	$scope.messages = [];
	$scope.message = {};
	$scope.users = [];
	$scope.comment = {};

	uF.setUser(function(data){
		$scope.user = data;
	})

	mF.index(function(data){
		$scope.messages = data;
	})

	$scope.create = function(){
		$scope.message.user = $scope.user;
		mF.create($scope.message, function(data){
			if(data.errors){
				$scope.msg_errors = data.errors
			}
			else{
				$scope.messages = data;
			}
		})
	}

	$scope.newComment = function(index, message){
		$scope.comment = $scope.comment[index]
		$scope.comment.user = $scope.user;
		$scope.comment.message = message;
		cF.create($scope.comment, function(data){
			if(data.errors){
				$scope.comment_errors = data.errors;
			}
			else{
				$scope.messages = data;
			}
		})
	}
}])