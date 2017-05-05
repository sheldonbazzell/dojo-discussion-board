app.factory('postsFactory', ['$http', function($http) {

	function postsFactory() {
		let post  = {}, posts = [];
		this.create = function(newPost, callback) {
			$http.post('/posts', newPost).then( res => {
				if(callback && typeof callback === 'function')
					callback(res.data);
			})
		}
	}
	return new postsFactory();
}])