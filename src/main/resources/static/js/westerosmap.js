var repeatOnXAxis = false; // Do we need to repeat the image on the X-axis? Most likely you'll want to set this to false
var marker;
var map;
var pathForm=false;
window.onload = function () {
    $('.btn-search').click(function () {
        if (searchValidate()) {
            searchLocation($('#location').val());
        }
    });
    $('.btn-routes').click(function () {
        $('#location').val('');
        $('.btn-refresh').removeClass('d-none');
        $('#searchPanel').addClass('d-none');
        $('.neighbor-panel').addClass('d-none');
        $('#routePanel').removeClass('d-none');
        clearConections(conections.locationRoutes);
        pathForm=true;
        getRoute();
    });
    $('.btn-back').click(function () {
        $('#location').val('');
        $('#startPoint').val('');
        $('#destination').val('');
        $('#startPoint').removeClass("error");
        $('.table-routes-panel').addClass("d-none");
        $('#destination').removeClass("error");
        $('#searchPanel').removeClass('d-none');
        $('.btn-refresh').addClass('d-none');
        $('#routePanel').addClass('d-none');
        refreshConections();
        pathForm = false;
        clearConections(conections.allRoutes);
        getLocations();
    });
    $('.btn-search-route').click(function () {
        if (routeValidate()) {
            searchRoute($('#startPoint').val(), $('#destination').val());
        }
    });
    $('.btn-refresh').click(function () {
        refreshRoutePanel();
        refreshConections();
    });
}
function refreshRoutePanel() {
    $('#startPoint').val('');
    $('#destination').val('');
    $('#startPoint').removeClass("error");
    $('.table-routes-panel').addClass("d-none");
    $('#destination').removeClass("error");
}
function routeValidate() {
    if ($('#destination').val() === '' && $('#startPoint').val() === '') {
        $('#startPoint').addClass("error");
        return false;
    } else if ($('#destination').val() === ''){
        $('#destination').addClass("error");
        return false;
    } else if ($('#startPoint').val() === '') {
        $('#destination').addClass("error");
        $('#startPoint').addClass("error");
        return false;
    }
    $('#startPoint').removeClass("error");
    $('#destination').removeClass("error");
    return true;

}
function searchValidate() {
    if($('#location').val()==''){
        $('#location').addClass("error");
        return false;
    }
    $('#location').removeClass("error");
    return true;

}
function searchLocation(txtLocation) {
    currentLocation=txtLocation;
    deleteConections(conections.locationRoutes);
    $(".table-neighbor tbody").empty();
    $('.neighbor-panel').removeClass('d-none');
    $.ajax({
        url: 'http://localhost:8080/routesLocation',
        type: 'POST',
        data: JSON.stringify({
            "name": txtLocation
        }),
        contentType: "application/json; charset=UTF-8",
        error: function (e) {
            console.error(e);

        },
        success: function (data) {
            fillRoute(data);
            
        }
    });
}
function searchRoute(txtStartPoint,txtDestination) {
    currentLocation = txtStartPoint;
    $(".table-routes tbody").empty();
    $('.table-routes-panel').removeClass('d-none');
    $.ajax({
        url: 'http://localhost:8080/shortestPath',
        type: 'POST',
        data: JSON.stringify([
            { "name": txtStartPoint }, { "name": txtDestination}
        ]),
        contentType: "application/json; charset=UTF-8",
        error: function (e) {
            console.error(e);

        },
        success: function (data) {
            printPath(data);
        }
    });
    
}
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
        minZoom: 2,
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
}






