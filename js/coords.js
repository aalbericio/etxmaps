var lat_min = 41.34802785;
var lat_max = 41.46320757;
var lon_min = 2.10684613;
var lon_max = 2.25857193;


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
