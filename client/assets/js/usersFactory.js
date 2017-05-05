console.log('usersFactory');
app.factory('usersFactory', ['$http', function($http) {
	
	function usersFactory() {
		
		let user = {};

		this.show = function(id, callback) {
			$http.get('/users/' + id).then( res => {
				if(callback && typeof callback === 'function') {
					callback(res.data);
				}
			})
		}

		this.create = function(newUser, callback){
			$http.post('/users', newUser).then( res => {
				if(!res.data.errors)
					user = res.data;
				callback(res.data);
			})
		}

		this.setUser = function(callback) {
			callback(user);
		}

		this.update = function(user, callback) {
			$http.put('/users', user).then( res => {
				if(callback && typeof callback === 'function')
					callback(res.data);
			})
		}

	}

	return new usersFactory();

}])
