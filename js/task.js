var lat_min = 41.35272;
var lat_max = 41.45868;
var lon_min = 2.05547;
var lon_max = 2.31073;
var NUMBER_OF_FEATURES;
var REFRESH_RATE = 100;
var featuresTimeout;

var markers = [];

initFeatures();

onmessage = function (oEvent) {
	switch(oEvent.data.type) {
		case "generateFeatures":
			if(!featuresTimeout) {
				NUMBER_OF_FEATURES = oEvent.data.size;
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

function initFeatures() {
	postMessage({
		type: "addFeatures",
		features: []
	});
}

function startGeneratingFeatures() {
	featuresTimeout = setInterval(function() {
		sendNewFeature();
	}, REFRESH_RATE);
}

function sendNewFeature() {
	var markerId = Math.round(Math.random()*(NUMBER_OF_FEATURES-1));
	var newMarker = generateGeoJSONFeature(markerId);
		
	postMessage({
		type: "addOrMoveFeature",
		feature: newMarker
	});
}

function generateGeoJSONFeature(id) {
	return {
		"id": id,
		"category": "CAT" + Math.round(Math.random()*3),
		"weight": Math.round(Math.random()*5),
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