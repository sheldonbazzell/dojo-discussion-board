console.log('usersFactory');
app.factory('usersFactory', ['$http', function($http){
	var user = {};
	function usersFactory(){


		this.create = function(data, callback){
			$http.post('/users', data).then(function(returned_data){
				console.log(returned_data)
				if(!returned_data.data.errors){
					user = returned_data.data;
				}
				callback(returned_data.data);
			})
		}

		this.setUser = function(callback){
			callback(user);
		}

		this.getUsers = function(callback){
			$http.get('/users').then(function(returned_data){
				callback(returned_data.data);
			})
		}
	}

	return new usersFactory;

}])
