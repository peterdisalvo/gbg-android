/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var DEBUG = 1;

//Current Drive Variables
var maxSpeed = 0;
var locationWatchId;
var startlocation;
var startTime;  //http://momentjs.com/
var endTime;
var currentDrive = [];  //Store lat/long in here then draw on google Maps
var currentLocation;

//Map varabiles
var map;
var mapMarkersArray = [];


$('#selectSampleDataSet').live('pageshow', function(event) {
	$('[data-geolocation="startWatch"]').click(function(){
	    //user is starting drive sign up for geolocation services.
		if (driveModel){
			
			var myResults = ko.utils.unwrapObservable(driveModel.myDriveType); 
			var opponentResults = ko.utils.unwrapObservable(driveModel.opponentsDriveType); 
			if(myResults && opponentResults)
			{
				startWatch();
				$.mobile.changePage('currentDrive.html'); 
				
				resultsModel = new ResultsModel;
				resultsModel.myDriveResults = driveModel.getMyDriveResults();
			    resultsModel.opponentsResults = driveModel.getopponentsDriveResults();	
			    resultsModel.computeResult();
			}
			else{
				alert('Please select a sample drive for both.');
			}
		}
		else{
			console.log('Something when wrong');
		}
	});
});

$('#dashboard').live('pageshow', function(event) {
	$('[data-geolocation="startWatch"]').click(function(){
		startWatch();
		resultsModel = new ResultsModel;
		resultsModel.myDriveResults =commuterResults;
	    resultsModel.opponentsResults = speedyResults;	
	    resultsModel.computeResult();
	});
	$('[data-waiting="waiting"]').click(function(){
		resultsModel = new ResultsModel;
		resultsModel.myDriveResults = hardBrakesResults;
	    resultsModel.opponentsResults = null;	
	    resultsModel.computeResult();
	});
	
	$('[data-waiting="lost"]').click(function(){
		resultsModel = new ResultsModel;
		resultsModel.myDriveResults = hardBrakesResults;
	    resultsModel.opponentsResults = commuterResults;	
	    resultsModel.computeResult();
	});
	
});

$('#currentDrive').live('pageshow', function(event) {
	//disable back button
	document.addEventListener("backbutton", disableBackButton, true);
	
	$('[data-geolocation="stopWatch"]').click(function(){
	    //user is starting drive sign up for geolocation services.
		clearWatch();
	});
});



function disableBackButton(){
	console.log("Back button selected");
	$('#popupDialog').popup("open");
 };

function reportLocation(position) {
    //http://docs.phonegap.com/en/2.4.0/cordova_geolocation_geolocation.md.html#Geolocation

    //Set the speed
    var speed = 0;
    if (position.coords.speed != null) {
        //Speed is in meters per second
        speed = Math.round( position.coords.speed * 2.2369);
    }
    $('#geolocationCurrentSpeed').html(speed);

    if (speed > maxSpeed) {
        maxSpeed = speed;
        $('#geolocationMaxSpeed').html(maxSpeed);
    }

    //Update Driving Time
    if (!startTime)
	{
    	startTime = moment();
    	console.log('initial start time: ' + startTime.format("MMM Do YY"));
	}
    
    console.log('start time: ' + startTime.format("MMM Do YY"));
    var now = moment();
    var tripTime = now.diff(startTime, 'minutes');
    console.log("triptime: " + tripTime);
    $('#geolocationTripTime').html(tripTime);
}

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: ' + error.code + '\n' +
            'message: ' + error.message + '\n');
}

//Watch


$('[data-geolocation="stopWatch"]').click(function(){
	clearWatch();
});

//Start watch
function startWatch() {
	locationWatchId = navigator.geolocation.watchPosition(reportLocation, onError, { enableHighAccuracy: true });
   // navigator.geolocation.getCurrentPosition(startLocation, onError,{ enableHighAccuracy: true });
}

// clear the watch that was started earlier
function clearWatch() {
    endTime = moment();
    if (locationWatchId != null) {
        navigator.geolocation.clearWatch(locationWatchId);
        locationWatchId = null;
    }
}
