var repeatOnXAxis = false; // Do we need to repeat the image on the X-axis? Most likely you'll want to set this to false
var marker;
var map;
window.onload = function () {
    $('.btn-search').click(function () {
        if (searchValidate()) {
            searchLocation($('#location').val());
        }
    });
    $('.btn-routes').click(function () {
        $('#location').val('')
        $('#searchPanel').addClass('d-none');
        $('#routePanel').removeClass('d-none');
        getRoute();
    });
    $('.btn-back').click(function () {
        $('#location').val('')
        $('#startPoint').val('')
        $('#destination').val('')
        $('#startPoint').removeClass("error");
        $('.table-routes-panel').addClass("d-none");
        $('#destination').removeClass("error");
        $('#searchPanel').removeClass('d-none');
        $('#routePanel').addClass('d-none');
        clearConections()
        getLocations();
    });
    $('.btn-search-route').click(function () {
        if (routeValidate()) {
            searchRoute($('#startPoint').val(), $('#destination').val())
        }
    });
}
function routeValidate() {
    if ($('#startPoint').val() == '' || $('#destination').val()=='') {
        $('#startPoint').addClass("error");
        $('#destination').addClass("error");
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
    //TODO
    // $.ajax({
    //     url: 'http://localhost:3377/testLoc',
    //     data: {
    //         location: txtLocation
    //     },
    //     error: function (e) {
    //         console.error(e);

    //     },
    //     success: function (data) {
    //         fillLocationRoute(data);
    //     },
    //     type: 'POST'
    // });
}
function searchRoute(txtStartPoint,txtDestination) {
    //TODO
    // $.ajax({
    //     url: 'http://localhost:3377/testLoc',
    //     data: {
    //         location: txtLocation
    //     },
    //     error: function (e) {
    //         console.error(e);

    //     },
    //     success: function (data) {
    //         fillLocationRoute(data);
    //     },
    //     type: 'POST'
    // });
    //Probando la tabla
    $('.table-routes-panel').removeClass("d-none");
    
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






