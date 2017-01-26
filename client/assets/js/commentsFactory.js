console.log("commentsFactory")
app.factory("commentsFactory", ['$http', function($http){

	function commentsFactory(){
		var comments = [],
			comment  = {};

		this.create = function(data,callback) {
			$http.post('/comments', data).then(function(res) {
				if(!res.data.errors) {
					comment = res.data;
				}
				if(callback && typeof callback == 'function') {
					callback(res.data);
				}
			})
		}
	}

	return new commentsFactory;
}])