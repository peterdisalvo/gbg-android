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

$('#fullPageMap').live('pageshow', function(event) {
    //Have to use this otherwise map is wrong size 
    //and the map.setCenter function will be off.
    initializeMap();
    google.maps.event.trigger(map, 'resize');
});

$('#selectSampleDataSet').live('pageshow', function(event) {
	$('[data-geolocation="startWatch"]').click(function(){
	    //user is starting drive sign up for geolocation services.
		startWatch();
	});
});

$('#dashboard').live('pageshow', function(event) {
	$('[data-geolocation="startWatch"]').click(function(){
	    //user is starting drive sign up for geolocation services.
		startWatch();
	});
});

$('#endDriveDialog').live('pageshow', function(event) {
	$('[data-geolocation="stopWatch"]').click(function(){
	    //user is starting drive sign up for geolocation services.
		clearWatch();
	});
});



function initializeMap() {
    
    var location;
    if (!currentLocation){
        location = new google.maps.LatLng(43.661471, -70.255326);
    }else
    {
        location = currentLocation;
    }
    var mapOptions = {
        //Portland maine is starting point
        center: location,
        zoom: 14,
        mapTypeControl: false,
        streetViewControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map_canvas"),
            mapOptions);
};

function startLocation(position) {
    startTime = moment();
    startLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    addMarker(startLocation, "Start Location")
    google.maps.event.trigger(map, 'resize');
    map.setCenter(startLocation);
}

function reportLocation(position) {
    //http://docs.phonegap.com/en/2.4.0/cordova_geolocation_geolocation.md.html#Geolocation

    //Set the speed
    var speed = 0;
    if (position.coords.speed != null) {
        //Speed is in meters per second
        speed = position.coords.speed * 2.2369;
    }
    $('#geolocationCurrentSpeed').html(speed);

    if (speed > maxSpeed) {
        maxSpeed = speed;
        $('#geolocationMaxSpeed').html(maxSpeed);
    }

    //Update Driving Time
    var tripTime = moment().diff(startTime, 'minutes', true)
    tripTime = Math.round(tripTime) 
    $('#geolocationTripTime').html(tripTime);

    //Update Map
    currentLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    $('#geolocationlat').html(currentLocation.lat());
    $('#geolocationlong').html(currentLocation.lng());
    currentDrive.push(currentLocation);
    map.panTo(currentLocation);
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
    navigator.geolocation.getCurrentPosition(startLocation, onError,{ enableHighAccuracy: true });
}

// clear the watch that was started earlier
function clearWatch() {
    endTime = moment();
    if (locationWatchId != null) {
        navigator.geolocation.clearWatch(locationWatchId);
        locationWatchId = null;
    }
}



function addMarker(location, title) {
    marker = new google.maps.Marker({
        position: location,
        map: map,
        title: title
    });
    mapMarkersArray.push(marker);
}
