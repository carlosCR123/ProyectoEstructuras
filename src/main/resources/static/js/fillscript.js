
var westerosMap;
function fillMap(map) {

    westerosMap=map;
    getLocations();
    getRoute();
}
function getLocations() {
    $.ajax({
        url: 'http://localhost:3377/testLoc',
        data: {
            format: 'json'
        },
        error: function (e) {
            console.error(e);

        },
        success: function (data) {
            fill(data);
        },
        type: 'GET'
    });
}
function fill(data) {
    $.each(data, function (index, value) {
        var marker;
        marker = new google.maps.Marker({
            position: {lat: (value.latitude), lng: (value.longitude)},
            map: westerosMap,
            title: value.name,
            draggable: false,
            icon: '../imgs/Winterfell.png'
        });
    });
    getRoute();
}
function getRoute() {
    $.ajax({
        url: 'http://localhost:3377/testRou',
        data: {
            format: 'json'
        },
        error: function (e) {
            console.error(e);

        },
        success: function (data) {
            fillRoute(data);
        },
        type: 'GET'
    });
}
function fillRoute(data) {
    $.each(data, function (index, value) {
        var flight = new google.maps.Polyline({
            path: [ {lat: value.locationOne.latitude, lng:value.locationOne.longitude},{lat: value.locationTwo.latitude, lng:value.locationTwo.longitude}],
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2
        });

        flight.setMap(westerosMap);
    });
}