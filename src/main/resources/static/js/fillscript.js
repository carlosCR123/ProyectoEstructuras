
var westerosMap;
var markers=[];
var conections=[];
var test;
function fillMap(map) {
    westerosMap=map;
    getLocations();
}
function getLocations() {
    if (markers.length==0) {
        $.ajax({
            url: 'http://localhost:3377/allLocations',
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
    }else{
        
        setMapOnAll(westerosMap)
    }
    
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
        marker.addListener('click',function () {
           $('#location').val(value.name);
        });
        markers.push(marker);
    });
}
function getRoute() {
    if (conections.length==0) {
        $.ajax({
            url: 'http://localhost:3377/allRoutes',
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
    }else{
        setConectionsOnAll(westerosMap)
    }
    
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
        conections.push(flight);
    });
}
function printPath(data) {
    $.each(data, function (index, value) {
        var flight = new google.maps.Polyline({
            path: [{ lat: value.locationOne.latitude, lng: value.locationOne.longitude }, { lat: value.locationTwo.latitude, lng: value.locationTwo.longitude }],
            geodesic: true,
            strokeColor: '#CCC',
            strokeOpacity: 1.0,
            strokeWeight: 2
        });

        flight.setMap(westerosMap);
    });
}
function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}
function clearMarkers() {
    setMapOnAll(null);
}
function deleteMarkers() {
    clearMarkers();
    markers = [];
}
function setConectionsOnAll(map) {
    for (var i = 0; i < conections.length; i++) {
        conections[i].setMap(map);
    }
}
function clearConections() {
    setConectionsOnAll(null);
}
function deleteConections() {
    clearConections();
    conections = [];
}