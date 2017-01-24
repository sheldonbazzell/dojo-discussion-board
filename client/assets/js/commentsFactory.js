console.log("commentsFactory")
app.factory("commentsFactory", ['$http', function($http){

	var comments = [],
		comment = {};

	function commentsFactory(){

		this.create = function(data, callback){
			console.log(data);
			$http.post('/comments', data).then(function(returned_data){
				if(!returned_data.data.errors){
					comment = returned_data.data;
				}
				if(callback && typeof(callback) == 'function'){
					callback(returned_data.data);
				}
			})
		}

	}

	return new commentsFactory;
}])