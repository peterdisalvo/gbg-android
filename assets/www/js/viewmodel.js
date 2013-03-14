function UserModel(){
	self.userName = ko.observable();
}

var commuterResults = {
	overSpeedLimit: 0,
	fastAccelerations:1,
	hardBreaks:1,
	idling:5,
	timesTexting:0
};

var hardBrakesResults = {
		overSpeedLimit: 3,
		fastAccelerations:1,
		hardBreaks:7,
		idling:2,
	timesTexting:0
};

var speedyResults = {
		overSpeedLimit: 6,
		fastAccelerations:3,
		hardBreaks:4,
		idling:1,
	timesTexting:0
};
       
var racerResults = {
		overSpeedLimit: 6,
		fastAccelerations:6,
		hardBreaks:3,
		idling:0,
	timesTexting:0
};
       
 function ResultsModel() {
	 var self = this;
	 self.myDriveResults = {};
     self.opponentsResults = {};
     self.result = "";
     self.displayCharityLinks =  ko.observable(false) ;
     self.displayFacebookPost =  ko.observable(true) ;
     self.postResultToFaceBook = function(){
    	 var msg = "Do you GBG?";
    	 if (self.result == "won"){
    		 msg+= " I just won a challenge!";
    	 }
    	 else if (self.result == "lost")
         {
    		 msg+= " I just donated a dollar to a charity to promote safe driving habits. Texting and driving isn't cool.";
         }
    	 
    	 msg+="  www.greenbuttongamer.com";    	 
    	 
    	 facebookConnect.post(msg, function(result) {
		    // Check for cancellation/error
    		 result = JSON.parse(result);

		    if(result.cancelled || result.error) {
		        console.log("failed to connect:" + result.error);
		        var loggedin= false;
		        facebookConnect = window.facebookConnect;
	  			 facebookConnect.login({permissions: ["email", "user_about_me", "publish_actions"], appId: "613385095354844"}, function(result) {
	    			    // Check for cancellation/error
	    			    if(result.cancelled || result.error) {
	    			        console.log("FacebookConnect.login:failedWithError:" + result.message);
	    			        return; 
	    			    }
	    			    loggedin = true;
	  			});
	  			 
	  			 if (!loggedin){
	  				return; 
	  			 }
		    }
		    alert("Message Posted!");
	 	});
     };
     self.computeResult = function(){
    	var score =0;
    	var opponentScore =0;
    	
    	if (!self.myDriveResults || !self.opponentsResults){
    		self.result = "are waiting";
    		self.displayFacebookPost = false;
    		return;
    	}
    	
    	if (self.myDriveResults.overSpeedLimit < self.opponentsResults.overSpeedLimit)
		{
    		score++;
		}
    	else if(self.myDriveResults.overSpeedLimit > self.opponentsResults.overSpeedLimit)
    	{
    		opponentScore++;
    	}
    	
    	if (self.myDriveResults.fastAccelerations < self.opponentsResults.fastAccelerations)
		{
    		score++;
		}
    	else if(self.myDriveResults.fastAccelerations > self.opponentsResults.fastAccelerations)
    	{
    		opponentScore++;
    	}
    	
    	if (self.myDriveResults.idling < self.opponentsResults.idling)
		{
    		score++;
		}
    	else if(self.myDriveResults.idling > self.opponentsResults.idling)
    	{
    		opponentScore++;
    	}
    	
    	if (self.myDriveResults.overSpeedLimit < self.opponentsResults.overSpeedLimit)
		{
    		score++;
		}
    	else if(self.myDriveResults.overSpeedLimit > self.opponentsResults.overSpeedLimit)
    	{
    		opponentScore++;
    	}
    	
    	if (self.myDriveResults.timesTexting > 0)
		{
    		score =0;
		}
    	else if(self.myDriveResults.timesTexting > self.opponentsResults.timesTexting)
    	{
    		opponentScore++;
    	}
    	  	
    	if(score > opponentScore)
		{
    		self.result = "WON";
		}
    	else if (score < opponentScore)
    	{
    		self.result = "LOST";
    		self.displayCharityLinks(true);
    	} 
    	else
		{
		self.result = "tied";
		}
     };
 };          

function DriveModel() {
	var self = this;

	self.dataSets = [
	      {name:"Commuter", value:"commuter"	},
	      {name: "Hard Brakes", value:"hardBrakes"	},
	      {name: "Speedy", value:"speedy"	},
	      {name: "Racer", value:"racer"	}
	];
	
	self.myDriveType = ko.observable(null);
	self.opponentsDriveType = ko.observable(null);
	self.driveDetails = ko.observable();
	self.getMyDriveResults = function(){
		var myDriveType = ko.utils.unwrapObservable(self.myDriveType); 
		
		switch(myDriveType.value)
		{
				case('commuter'):
						return commuterResults;
						break;
				case('hardBrakes'):
					return hardBrakesResults;
					break;
				case('speedy'):
					return speedyResults;
					break;
				case('racer'):
					return racerResults;
					break;
		}
	};
	self.getopponentsDriveResults = function(){		
		var opponetsDriveType = ko.utils.unwrapObservable(self.opponentsDriveType); 
		
		switch(opponetsDriveType.value)
		{
				case('commuter'):
					return commuterResults;
						break;
				case('hardBrakes'):
					return hardBrakesResults;
					break;
				case('speedy'):
					return speedyResults;
					break;
				case('racer'):
					return racerResults;
					break;
		}
	};
}

var driveModel;
$('#selectSampleDataSet').live('pageshow', function(event) {
	//Throw away the old drive model.
	driveModel = new DriveModel();
	ko.applyBindings(driveModel, $("#selectSampleDataSet")[0]);
});

var resultsModel;
$('#driveResults').live('pageshow', function(event) {
	ko.applyBindings(resultsModel,$("#driveResults")[0] );
});
