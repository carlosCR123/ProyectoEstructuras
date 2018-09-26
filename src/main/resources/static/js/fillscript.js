
var westerosMap;
var markers = [];
var conections = { allRoutes: [], locationRoutes: [], path: [] };
var currentLocation;
function fillMap(map) {
    westerosMap = map;
    getLocations();
}
function getLocations() {
    if (markers.length == 0) {
        $.ajax({
            url: 'http://localhost:8080/allLocations',
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
    } else {

        setMapOnAll(westerosMap)
    }

}
function fill(data) {
    $.each(data, function (index, value) {
        var marker;
        marker = new google.maps.Marker({
            position: { lat: (value.latitude), lng: (value.longitude) },
            map: westerosMap,
            title: value.name,
            draggable: false,
            icon: '../imgs/Winterfell.png'
        });
        marker.addListener('click', function () {
            if (pathForm) {
                $(".modal-title").text(value.name);
                $("#optionRoutesModal").modal('show');
                $('.btn-startPoint').click(function () {
                    if (isLocationValid(value.name, $('#destination').val())) {
                        $('#startPoint').val(value.name);
                    }
                    $("#optionRoutesModal").modal('hide');
                });
                $('.btn-destination').click(function () {
                    if (isLocationValid(value.name, $('#startPoint').val())) {
                        $('#destination').val(value.name);
                    }
                    $("#optionRoutesModal").modal('hide');
                });
            } else {
                $('#location').val(value.name);

            }

        });
        markers.push(marker);
    });
}
function isLocationValid(txtOne, txtTwo) {
    if (txtOne == txtTwo) {
        return false;
    }
    return true;
}
function getRoute() {
    if (conections.allRoutes.length == 0) {
        $.ajax({
            url: 'http://localhost:8080/allRoutes',
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
    } else {
        setConectionsOnAll(conections.allRoutes, westerosMap)
    }

}
function fillRoute(data) {
    $.each(data, function (index, value) {
        var flight = new google.maps.Polyline({
            path: [{ lat: value.locationOne.latitude, lng: value.locationOne.longitude }, { lat: value.locationTwo.latitude, lng: value.locationTwo.longitude }],
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2
        });

        flight.setMap(westerosMap);
        if (pathForm)
            conections.allRoutes.push(flight);
        else {
            conections.locationRoutes.push(flight);
            fillTable({
                'duration': value.tripDuration, 'nameOne': value.locationOne.name
                , 'nameTwo': value.locationTwo.name
            }, $('.table-neighbor tbody'),false);
        }

    });
}
function fillTable(value, table,path) {

    console.log(value);
    var daysTxt = ' día';
    if (value.duration > 1) daysTxt = ' días';
    var rowContent = '<tr>' + '<td>' + getLocationName(value,path) + '</td>' + '<td>' + value.duration + daysTxt + '</td>' + '</tr>';
    $(rowContent).appendTo(table)
}
function getLocationName(data, path) {
    if (path) {
        console.log(currentLocation);
        if (data.nameOne === currentLocation){
            currentLocation = data.nameTwo;
            return data.nameTwo;
        }
        currentLocation = data.nameOne;
        return data.nameOne;
    }
    return data.nameOne === currentLocation ? data.nameTwo : data.nameOne;
    
}

function printPath(data) {
    refreshConections()
    var sumDuration = 0;
    data.reverse();
    $.each(data, function (index, value) {
        sumDuration += value.tripDuration;
        for (var index = 0; index < conections.allRoutes.length; index++) {
            var locOne = new google.maps.LatLng(value.locationOne.latitude, value.locationOne.longitude);
            var locTwo = new google.maps.LatLng(value.locationTwo.latitude, value.locationTwo.longitude);
            var line = locOne + ',' + locTwo;

            if (conections.allRoutes[index].getPath().getArray().toString() === line) {
                conections.allRoutes[index].setOptions({ strokeColor: '#000', strokeWeight: 4 });
            }
        }
        fillTable({
            'duration': sumDuration, 'nameOne': value.locationOne.name
            , 'nameTwo': value.locationTwo.name
        }, $('.table-routes tbody'),true);

    });
}
function refreshConections() {

    for (var i = 0; i < conections.allRoutes.length; i++) {
        conections.allRoutes[i].setOptions({ strokeColor: '#FF0000', strokeWeight: 2 });
    }
}
function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}
function clearMarkers() {
    setMapOnAll(null);
}
function setConectionsOnAll(linesArray, map) {
    for (var i = 0; i < linesArray.length; i++) {
        linesArray[i].setMap(map);
    }
}
function clearConections(linesArray) {
    setConectionsOnAll(linesArray, null);
}
function deleteConections(array) {
    clearConections(array);
    array = [];
}