console.log('usersFactory');
app.factory('usersFactory', ['$http', function($http){
	function usersFactory(){
		
		var user = {};

		this.create = function(newUser, callback){
			$http.post('/users', newUser).then(function(res){
				if(!res.data.errors){
					user = res.data;
				}
				callback(res.data);
			})
		}

		this.setUser = function(callback){
			callback(user);
		}

	}

	return new usersFactory;

}])
