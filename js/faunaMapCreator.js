
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

//questa posizione è la posizione del parco da prendere dinamicamente (rimuovere commento quando hai fatto)
position = "";
ParseDMS(position);

// MapBox map
mapboxgl.accessToken = 'pk.eyJ1IjoiZG9uZ2kiLCJhIjoiY2t4MGk4ZDN1MThpbzJvcDhpd294ZDAyMSJ9.dlbCTLS_xF3wQ1kD2HEIQw';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    zoom: 9,
    center: [lng, lat]
});


// N è il numero di animali di un tipo e in un parco
// tipo e parco presi quando si carica la pagina dell'animale
//(elimina il commento quando hai fatto)
var animalPosition; // = db.posizioneAnimale
for (i = 0; i < N; i++) {
    ParseDMS(animalPosition);
    // marker creator
    let marker1 = new mapboxgl.Marker()
        .setLngLat([lng, lat])
        .addTo(map);
}


