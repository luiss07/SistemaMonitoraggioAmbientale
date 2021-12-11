// divide the part of the DMS notation
var lat;
var lng;
function ParseDMS(input) {
    var parts = input.split(/[^\d\w]+/);
    lat = ConvertDMSToDD(parts[0], parts[1], parts[2], parts[3]);
    lng = ConvertDMSToDD(parts[4], parts[5], parts[6], parts[7]);
    return {
        lat,
        lng
    };
}

// converts Degrees Minutes Seconds in Decimal Degrees
function ConvertDMSToDD(degrees, minutes, seconds, direction) {
    degrees = parseFloat(degrees);
    minutes = parseFloat(minutes);
    seconds = parseFloat(seconds);

    var dd = (degrees) + (minutes / 60) + (seconds / (60 * 60));

    if (direction == "S" || direction == "W") {
        dd = dd * -1;
    }
    return dd;
}

//--------------------------------------------------------------------

async function setMapParco() {
    let sPage = sessionStorage.getItem("selectedPage");
    let response = await fetch(variables.API_URL + 'parco');
    let data = await response.json();
    return data;
}

setMapParco().then(data => {
    let div = document.getElementById("map");
    data.forEach(park => {
        if (park.Parco == sessionStorage.getItem("selectedPark")) {
            var position = park.Posizione;
            console.log(position);
            ParseDMS(position);

            // MapBox map
            if (park.Parco == "La Mandria") {
                mapboxgl.accessToken = 'pk.eyJ1IjoiZG9uZ2kiLCJhIjoiY2t4MGk4ZDN1MThpbzJvcDhpd294ZDAyMSJ9.dlbCTLS_xF3wQ1kD2HEIQw';
                var map = new mapboxgl.Map({
                    container: 'map',
                    style: 'mapbox://styles/mapbox/streets-v11',
                    zoom: 12, 
                    center: [lng, lat]
                });
                // Add zoom and rotation controls to the map.
                map.addControl(new mapboxgl.NavigationControl());

            } else if (park.Parco == "Stelvio") {
                mapboxgl.accessToken = 'pk.eyJ1IjoiZG9uZ2kiLCJhIjoiY2t4MGk4ZDN1MThpbzJvcDhpd294ZDAyMSJ9.dlbCTLS_xF3wQ1kD2HEIQw';
                var map = new mapboxgl.Map({
                    container: 'map',
                    style: 'mapbox://styles/mapbox/streets-v11',
                    zoom: 9,
                    center: [lng, lat]
                });
                map.addControl(new mapboxgl.NavigationControl());

            } else if (park.Parco == "Gran Paradiso") {
                mapboxgl.accessToken = 'pk.eyJ1IjoiZG9uZ2kiLCJhIjoiY2t4MGk4ZDN1MThpbzJvcDhpd294ZDAyMSJ9.dlbCTLS_xF3wQ1kD2HEIQw';
                var map = new mapboxgl.Map({
                    container: 'map',
                    style: 'mapbox://styles/mapbox/streets-v11',
                    zoom: 10,
                    center: [lng, lat]
                });
                map.addControl(new mapboxgl.NavigationControl());
            }
        }
    })
})