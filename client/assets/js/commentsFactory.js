console.log("commentsFactory")
app.factory("commentsFactory", ['$http', function($http){

	function commentsFactory(){
		this.create = function(data,callback) {
			$http.post('/comments', data).then( res => {
				if(callback && typeof callback == 'function')
					callback(res.data);
			})
		}
	}
	return new commentsFactory;
}])