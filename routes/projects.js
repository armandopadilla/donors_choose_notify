/***
 * Controller - Projects
 * Contains the endpoint to the only available trigger in the system.
 * 
 * @see http://HOST:PORT/projects/list
 */
var express = require('express'),
	router = express.Router(),
	DCW    = require('../models/DonorsChooseWrapper'),
	POW    = require('../models/PushOverWrapper');

/**
 * List new projects
 */
router.get('/list', function(req, res){
	
	DCW.query(function(err,body){
		
		if(err){
			return res.status(500).json(err);
		}

		//Fetch the total. 
		var total = body.totalProposals;
		if(total > 0){
			
			//Send off a notification using Pushover (POW)
			var message = "Found "+total+" new projects to support.",
				title = "Donors Choose Notify!",
				url = body.searchURL,
				urlTitle = "View Complete List Now";
			
			POW.sendMessage(message, title, url, urlTitle, function (err, body){
				
				if(err){
					return res.status(500).json(err);
				}
				
				res.status(200).json({"status":"OK"});
				
			}); //End POW
		} //End if
	}); //End DCW
});

module.exports = router;