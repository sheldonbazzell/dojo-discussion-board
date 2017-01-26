app.factory('categoriesFactory', ['$http', function($http){

	function categoriesFactory(){
		var categories = [];

		this.index = function(callback){
			$http.get('/categories').then(function(res){
				if(!res.data.errors){
					categories = res.data;
				}
				callback(res.data);
			})
		}
	}
	
	return new categoriesFactory();
}])