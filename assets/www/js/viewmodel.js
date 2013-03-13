function userModel(){
	self.userName = ko.observable();
}

function driveModel() {
	var self = this;
	
	
	self.dataSets = [
	      {name:"Commuter", value:"commuter"	},
	      {name: "Hard Brakes", value:"Hard Brakes"	},
	      {name: "Speedy", value:"Speedy"	},
	      {name: "Racer", value:"Racer"	}
	];
	
	self.myResults = ko.observable(null);
	self.opponentsResults = ko.observable(null);
	self.driveDetails = ko.observable();
}

var driveModel;
$('#selectSampleDataSet').live('pageshow', function(event) {
	//Throw away the old drive model.
	driveModel = new driveModel();
	ko.applyBindings(driveModel);
});
