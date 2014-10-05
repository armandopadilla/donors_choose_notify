/***
 * General Object to make HTTP Request calls 
 * using the request npm package.
 * 
 */
var request = require("request");

var Request = {
	
			
	/**
	 * General HTTP Request
	 * @param options JSON 
	 * @param callback Function 
	 */
	call : function(options, callback){
		
		request(options, function(err, response, body){
			
			if(err){
				return callback(err, null);
			}
			
			if(typeof callback === "function"){
				return callback(null, body);
			}
			
		});
	
	}

}


module.exports = Request;