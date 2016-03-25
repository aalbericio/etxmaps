var lat_min = 41.35272;
var lat_max = 41.45868;
var lon_min = 2.05547;
var lon_max = 2.31073;
var NUMBER_OF_FEATURES = 500;
var REFRESH_RATE = 100;
var featuresTimeout;

var markers = [];

onmessage = function (oEvent) {
	switch(oEvent.data) {
		case "generateFeatures":
		if(!featuresTimeout) {
				startGeneratingFeatures();
			}
			break;
			
		case "stopGeneratingFeatures":
			clearInterval(featuresTimeout);
			featuresTimeout = null;
			markers = [];
			break;
	}
};

function startGeneratingFeatures() {
	featuresTimeout = setInterval(function() {
		sendNewFeature();
	}, REFRESH_RATE);
}

function sendNewFeature() {
	var markerId = Math.round(Math.random()*(NUMBER_OF_FEATURES-1));
	var foundMarker = markers[markerId]; 
	
	if(foundMarker === undefined) {
		var newMarker = generateGeoJSONFeature(markerId);
		
		markers[markerId] = newMarker;
		postMessage({
			type: "generatedFeature",
			feature: newMarker
		});
	} else {
		foundMarker.geometry.coordinates = [generateLon(), generateLat()];
		
		postMessage({
			type: "moveFeature",
			feature: foundMarker
		});
	}
	
}

function generateGeoJSONFeature(id) {
	return {
		"id": id,
		"type": "Feature",
		"geometry": {
			"type": "Point",
			"coordinates": [generateLon(), generateLat()]
		},
		"properties": {
			"marker-symbol": "star",
        	"marker-color": "#007FFF",
		}
	}
}

function generateRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

function generateLat(){
	return generateRandomNumber(lat_min, lat_max);
}

function generateLon(){
	return generateRandomNumber(lon_min, lon_max);
}