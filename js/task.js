var lat_min = 41.35272;
var lat_max = 41.45868;
var lon_min = 2.05547;
var lon_max = 2.31073;
var center_lat = 41.4056929;
var center_lon = 2.18316;
var initialZoom = 13;
var minZoom = 6;
var maxZoom = 19;

var featuresTimeout;

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
			break;
	}
};

function startGeneratingFeatures() {
	featuresTimeout = setInterval(function() {
		sendNewFeature();
	}, 100);
}

function sendNewFeature() {
	postMessage({
		type: "generatedFeature",
		feature: generateGeoJSONFeature()
	});
}

function generateGeoJSONFeature() {
	return {
		"type": "Feature",
		"geometry": {
			"type": "Point",
			"coordinates": [generateLon(), generateLat()]
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