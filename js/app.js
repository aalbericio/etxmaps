//CONSTANTS

var MAPBOX_TOKEN = 'pk.eyJ1IjoiYWFsYmVyaWNpbyIsImEiOiJjaWtvNXNnZHIwMDh6dnBtNng0aWc1Z2tkIn0.ud0lxs910DHjIIvhKh0nIQ';
var NUMBER_OF_FEATURES = 30000;

var lat_min = 41.35272;
var lat_max = 41.45868;
var lon_min = 2.05547;
var lon_max = 2.31073;
var center_lat = 41.4056929;
var center_lon = 2.18316;
var initialZoom = 13;
var minZoom = 10;
var maxZoom = 19;

var USE_CLUSTERING = true;

var markers = new Pool();

var appWorker = new Worker("js/task.js");

appWorker.onmessage = function (workerEvent) {
	switch(workerEvent.data.type) {
		case "addOrMoveFeature":
			addOrMoveFeature(workerEvent.data.feature);
			break;
		
		case "addFeatures":
			initFeatures(NUMBER_OF_FEATURES);
			break;
	}
};

function stopGeneratingFeatures() {
	appWorker.postMessage({
		type: "stopGeneratingFeatures"
	});
}

function generateFeatures()
{
	appWorker.postMessage({
		type: "generateFeatures",
		size: NUMBER_OF_FEATURES
	});
}

function getGifIcon(){
  return '<img width="80" height="80" src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Rotating_earth_%28large%29.gif?seed='+String(Math.random())+'"/>';
}

var features = {
	'type': 'FeatureCollection',
	'crs': {
          'type': 'name',
          'properties': {
            'name': 'EPSG:4326'
          }
        },
	"features": [
		{
			"type": "Feature",
			"geometry": {
				"type": "Point",
				"coordinates": [2.183169, 41.4056929]
			},
			"properties": {
				"marker-symbol": "star",
				"marker-color": "#007FFF",
			}
		},
		{
			"type": "Feature",
			"geometry": {
				"type": "Point",
				"coordinates": [2.193169, 41.4156929]
			},
			"properties": {
				"marker-symbol": "star",
				"marker-color": "#007FFF",
			}
		}
	]
}

function generateMarkers(markersNum, generator){
  for (var i = 0; i < markersNum; i++)
    generator();
}

function leafLeftAndMapBoxSVGMarker(){
  /// Define an icon called cssIcon
  var marker = L.divIcon({
    // Specify a class name we can refer to in CSS.
    className: 'css-icon',
    html: getGifIcon()/*,
    // Set marker width and height
    iconSize: [60, 60]*/
  });

  // Create three markers and set their icons to marker
  L.marker([generateLat(), generateLon()], {icon: marker}).addTo(map);
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

function generateNCoords(num){
    var coords = [];
    while(coords.length < num){
        coords.push([generateLat(), generateLon()]);
    }

    return coords;
}
