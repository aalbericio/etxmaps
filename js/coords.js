var lat_min = 41.35272;
var lat_max = 41.45868;
var lon_min = 2.05547;
var lon_max = 2.31073;
var center_lat = 41.4056929;
var center_lon = 2.18316;

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
			}
		}, 
		{
			"type": "Feature",
			"geometry": {
				"type": "Point",
				"coordinates": [2.193169, 41.4156929]
			}
		}
	]
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
