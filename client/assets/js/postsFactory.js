app.factory('postsFactory', ['$http', function($http) {

	function postsFactory() {
		var post  = {},
			posts = [];
		this.create = function(newPost, callback) {
			console.log(newPost);
			$http.post('/posts', newPost).then(function(res) {
				console.log(res.data);
				if(!res.data.errors) {
					post = res.data;
				}
				if(callback && typeof(callback) == 'function') {
					callback(res.data);
				}
			})
		}
	}
	return new postsFactory();
}])