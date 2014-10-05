/***
 * PushOver.net Wrapper. 
 * Create Push Notifications using the PushOver.net API
 * 
 */
var Request = require("../models/Request"),
	validator = require("validator");

var PushOverWrapper = {
		
	host : "https://api.pushover.net/1/messages.json",
	apiToken : "YOUR API TOKEN",
	user : "YOUR USER ID",
	device : "DEVICE ID",
	
	
	/**
	 * Push a notification.
	 */
	sendMessage : function(message, title, url, urlTitle, callback){
		
		//Validate.
		if(message === ""){
			return callback("Invalid message.", null);
		}
		
		if(title === ""){
			return callback("Invalid title.", null);
		}
		
		if(url === ""){
			return callback("Invalid URL.", null);
		}
		
		if(urlTitle === ""){
			return callback("Invalid URL title.", null);
		}
		
		//Sanatize
		message = validator.escape(validator.trim(message));
		title = validator.escape(validator.trim(title));
		urlTitle = validator.escape(validator.trim(urlTitle));
		
		var options = {
				
			url: this.host,
			method: "POST",
			json: true,
			form : { token : this.apiToken,
				user: this.user,
				message: message,
				device : this.device,
				title: title,
				url: url,
				url_title : urlTitle,
				sound : "echo "
			}	
		};
		
		//Make the HTTP Request
		Request.call(options, callback);
		
	}
}

module.exports = PushOverWrapper;