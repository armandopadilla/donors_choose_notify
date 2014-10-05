/***
 * Donors Choose Wrapper - Wrapper which makes calls into the 
 * Donors Choose API.  At the moment very minimal since I only 
 * want push notifications coming my way. 
 * 
 */
var Request = require("../models/Request"),
	moment  = require ("moment");

var DonorsChooseWrapper = {
		
	host: "http://api.donorschoose.org/",
	endpoint: "common/json_feed.html",
	APIKey : "YOUR API KEY",
	zip	: "90047",
	subject4 : "-4",
	highLevelPoverty: "true",
	
	
	/**
	 * Search functinality.  In this specific ase we 
	 * Search for inner city, Math and Science and high poverty. 
	 */
	query : function(callback){
		
		//1 day ago.
		var currentDate = new moment();
		var newSince = currentDate.subtract(1, "days").valueOf();
	
		//Default My prefference.
		var query = "?zip="+this.zip+
				    "&subject4="+this.subject4+
				    "&highLevelPoverty="+this.highLevelPoverty+
				    "&newSince="+newSince+"&",
			url = this.host+this.endpoint+query+"APIKey="+this.APIKey;
		
		//Construct the request then make the call to Donors Choose API.
		var options = {
				url: url,
				method: "GET",
				json: true
		};
		
		//Make the call!
		Request.call(options, callback);
		
	}
				
}

module.exports = DonorsChooseWrapper;