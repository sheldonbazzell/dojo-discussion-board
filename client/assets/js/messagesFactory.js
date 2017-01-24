app.factory('messagesFactory', ['$http', function($http){

		var message = {},
			messages = [];
		function messagesFactory(){

			this.index = function(callback){
				$http.get('/messages').then(function(returned_data){
					console.log('got messages')
					callback(returned_data.data);
				})
			}

			this.create = function(data, callback){
				$http.post('/messages', data).then(function(returned_data){
					console.log(returned_data)
					if(!returned_data.data.error){
						message = returned_data.data;
					}
					else{

					}
					callback(returned_data.data);
				})
			}
		}


	return new messagesFactory;

}])