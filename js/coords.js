var LEAFLET_TOKEN = 'pk.eyJ1IjoiYWFsYmVyaWNpbyIsImEiOiJjaWtvNXNnZHIwMDh6dnBtNng0aWc1Z2tkIn0.ud0lxs910DHjIIvhKh0nIQ';

var lat_min = 41.35272;
var lat_max = 41.45868;
var lon_min = 2.05547;
var lon_max = 2.31073;
var center_lat = 41.4056929;
var center_lon = 2.18316;

var NUM_OF_MARKERS = 100;

var CAMERA_ICON = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">'+
'<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">'+
'<g id="Group" transform="translate(-67.000000, -69.000000)">'+
  '<g id="camera-marker" transform="translate(81.000000, 83.000000)">'+
      '<circle id="glow" fill="#2994EA" cx="18.5" cy="18.5" r="18.5"></circle>'+
      '<circle id="Oval-1" fill="#000000" cx="18.5" cy="18.5" r="18.5"></circle>'+
    '<g id="camera" transform="translate(2.000000, 6.000000)" fill="#FFFFFF">'+
          '<path d="M11.1481411,17.6031198 L11.1732794,14.5914311 L18.0688956,19.1070762 L11.1750898,23.65267 L11.1938143,20.8809336 C11.1938143,20.8809336 0.125333955,19.8958475 0.00137925337,14.3682959 C-0.122575448,8.84074425 8.14967449,8.51612903 8.14967449,8.51612903 C8.14967449,8.51612903 2.09328881,9.91175652 2.82752787,13.9019334 C3.56176693,17.8921103 11.1481411,17.6031198 11.1481411,17.6031198 Z" id="Path-2"></path>'+
          '<path d="M21.8239803,10.3076147 L21.798842,13.3193034 L14.9032258,8.80365834 L21.7970316,4.25806452 L21.7783072,7.02980087 C21.7783072,7.02980087 32.8467875,8.01488696 32.9707422,13.5424386 C33.0946969,19.0699902 24.8224469,19.3946055 24.8224469,19.3946055 C24.8224469,19.3946055 30.8788326,17.998978 30.1445935,14.0088011 C29.4103545,10.0186242 21.8239803,10.3076147 21.8239803,10.3076147 Z" id="Path-2"></path>'+
          '<rect id="Rectangle-1" x="5.32258065" y="0" width="17.5158837" height="13.9470224" rx="2"></rect>'+
          '<path d="M23.4193548,3.16439612 L29.1627067,1.06451613 L29.0876302,13.2177471 L23.4193548,11.0710543" id="Path-1"></path>'+
      '</g>'+
  '</g>'+
'</g>'+
'</g>'+
'</svg>';

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
