app.factory('votesFactory', ['$http', function($http) {

	function votesFactory() {

		var vote  = {},
			votes = [];

		this.createUpVote = function(data, callback) {
			$http.post('/upvotes', data).then(function(res) {
				console.log(res.data);
				if(callback && typeof callback == 'function') {
					callback(res.data);
				}
			})
		}

		this.createDownVote = function(data, callback) {
			$http.post('/downvotes', data).then(function(res) {
				console.log(res.data);
				if(callback && typeof callback == 'function') {
					callback(res.data);
				}
			})
		}
	}

	return new votesFactory();
}])