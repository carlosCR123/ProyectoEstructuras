var repeatOnXAxis = false; // Do we need to repeat the image on the X-axis? Most likely you'll want to set this to false
var marker;
var map;

function getNormalizedCoord(coord, zoom) {
    if (!repeatOnXAxis) return coord;

    var y = coord.y;
    var x = coord.x;

    var tileRange = 1 << zoom;

    if (y < 0 || y >= tileRange) {
        return null;
    }
    if (x < 0 || x >= tileRange) {
        x = (x % tileRange + tileRange) % tileRange;
    }

    return {
        x: x,
        y: y
    };

}

function initMap() {

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


    map= new google.maps.Map(document.getElementById('map'), myOptions);
    map.mapTypes.set('custom', customMapType);
    map.setMapTypeId('custom');
    fillMap(map);
    google.maps.event.addListener(map, 'click', function (event) {

        placeMarker(event.latLng);
    });

<<<<<<< HEAD
=======
/*
    var flightPlanCoordinates = [
        {lat: 60.90262003187983, lng: 10.283203125},
        {lat: 10.283203125, lng: -2.548828125},
        {lat: 29.178946061598406, lng: 5.888671875}
    ];

    var flightPlan = [
        { lat:  -55.00915529806209, lng:  -30.238199714500922},
        { lat: -39.520651593083336, lng:   1.654074633577693}
    ];
    var flightPath = new google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
    });

    var flight = new google.maps.Polyline({
        path: flightPlan,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
    });

    flightPath.setMap(map);
    flight.setMap(map);*/

>>>>>>> kevin
}
function placeMarker(location) {
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
    console.info(marker.getPosition().lat());
    console.info(marker.getPosition().lng());

}




