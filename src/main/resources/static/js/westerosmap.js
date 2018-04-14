/*
			 * = PS_Bramus.GoogleMapsTileCutter Config
			 * ----------------
			 */

var repeatOnXAxis = false; // Do we need to repeat the image on the X-axis? Most likely you'll want to set this to false
var marker;
var map;


/*
 * Helper function which normalizes the coords so that tiles can repeat across the X-axis (horizontally) like the standard Google map tiles.
 * ----------------
 */

function getNormalizedCoord(coord, zoom) {
    if (!repeatOnXAxis) return coord;

    var y = coord.y;
    var x = coord.x;

    // tile range in one direction range is dependent on zoom level
    // 0 = 1 tile, 1 = 2 tiles, 2 = 4 tiles, 3 = 8 tiles, etc
    var tileRange = 1 << zoom;

    // don't repeat across Y-axis (vertically)
    if (y < 0 || y >= tileRange) {
        return null;
    }

    // repeat across X-axis
    if (x < 0 || x >= tileRange) {
        x = (x % tileRange + tileRange) % tileRange;
    }

    return {
        x: x,
        y: y
    };

}


/*
 * Main Core
 * ----------------
 */

function initMap() {

    // Define our custom map type
    var customMapType = new google.maps.ImageMapType({
        getTileUrl: function (coord, zoom) {
            var normalizedCoord = getNormalizedCoord(coord, zoom);
            if (normalizedCoord && (normalizedCoord.x < Math.pow(2, zoom)) && (normalizedCoord.x > -1) && (normalizedCoord.y < Math.pow(2, zoom)) && (normalizedCoord.y > -1)) {
                return '../imgs/tiles/'+zoom + '_' + normalizedCoord.x + '_' + normalizedCoord.y + '.jpg';
            } else {
                return '../imgs/tiles/empty.jpg';
            }
        },
        tileSize: new google.maps.Size(256, 256),
        maxZoom: 3,
        name: 'PS_Bramus.GoogleMapsTileCutter'
    });

    // Basic options for our map
    var myOptions = {
        center: new google.maps.LatLng(0, 0),
        zoom: 6,
        minZoom: 0,
        streetViewControl: false,
        mapTypeControl: false,
        mapTypeControlOptions: {
            mapTypeIds: ["custom"]
        }
    };


    // Init the map and hook our custom map type to it
    map= new google.maps.Map(document.getElementById('map'), myOptions);
    map.mapTypes.set('custom', customMapType);
    map.setMapTypeId('custom');
    fillMap(map);
    google.maps.event.addListener(map, 'click', function (event) {

        placeMarker(event.latLng);
    });

}
function placeMarker(location) {
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
    console.info(marker.getPosition().lat());
    console.info(marker.getPosition().lng());
    $('#startPoint').val(marker.getPosition().lat());
    $('#destination').val(marker.getPosition().lng());
    
}