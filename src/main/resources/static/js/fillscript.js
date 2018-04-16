var westerosMap;
function fillMap(map) {
    westerosMap = map;
    getLocations();
}
function getLocations() {
    $.ajax({
        url: 'http://localhost:8080/testLoc',
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
        var image;
        marker = new google.maps.Marker({
            position: { lat: (value.latitude), lng: (value.longitude) },
            map: westerosMap,
            title: value.name,
            draggable: false,
            icon: '../imgs/Winterfell.png'
        });
        marker.addListener('click', function () {
            console.log("test");
            
            $('.locationName').text(value.name);
        });
    });
}