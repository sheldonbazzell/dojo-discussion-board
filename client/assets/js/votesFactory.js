app.factory('votesFactory', ['$http', function($http) {

	function votesFactory() {

		let vote  = {}, votes = [];

		this.createUpVote = function(data, callback) {
			$http.post('/upvotes', data).then( res => {
				if(callback && typeof callback === 'function')
					callback(res.data);
			})
		}

		this.createDownVote = function(data, callback) {
			$http.post('/downvotes', data).then( res => {
				if(callback && typeof callback === 'function')
					callback(res.data);
			})
		}
	}

	return new votesFactory();
}])