function UserModel(){
	self.userName = ko.observable();
}

var commuterResults = {
	maxSpeed: 70,
	rapidAccelCount:4,
	speedingTime:2,
	distanceTraveled:20,
	tripTime:25
};

var hardBrakesResults = {
	maxSpeed: 65,
	rapidAccelCount:1,
	speedingTime:5,
	distanceTraveled:20,
	tripTime:30
};

var speedyResults = {
	maxSpeed: 75,
	rapidAccelCount:10,
	speedingTime:10,
	distanceTraveled:20,
	tripTime:35
};
       
var racerResults = {
	maxSpeed: 70,
	rapidAccelCount:6,
	speedingTime:20,
	distanceTraveled:20,
	tripTime:30
};
       
 function ResultsModel() {
	 var self = this;
	 self.myDriveResults = {};
     self.opponentsResults = {};
 }   ;          

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
