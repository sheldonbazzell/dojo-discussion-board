app.factory('categoriesFactory', ['$http', function($http) {

	function categoriesFactory(){
		let categories = [];

		this.index = function(callback){
			$http.get('/categories').then(res => {
				if(!res.data.errors)
					categories = res.data;
				callback(res.data);
			})
		}
	}
	return new categoriesFactory();
}])