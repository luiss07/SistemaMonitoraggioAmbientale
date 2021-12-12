
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


