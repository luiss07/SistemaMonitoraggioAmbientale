//API GET to set park image

async function setImageParco() {
    let response = await fetch(variables.API_URL + 'parco');
    let data = await response.json();
    return data;
}

setImageParco().then(data => {
    let count = 0;
    let mainDiv = document.getElementById("parkImages");
    data.forEach(park => {
        if (park.Parco == sessionStorage.getItem("selectedPark")) {
            park.Immagine.forEach(image => {
                let div = document.createElement("div");
                let img = document.createElement("img");
                if (count == 0) {    //different div & img element for first declaration
                    div.setAttribute('class', 'carousel-item active');
                    img.setAttribute('src', '../images/Parchi/' + image);
                    img.setAttribute('class', 'myImg-fluid');
                    img.setAttribute('alt', park.Tipo + 'image');
                    count++;
                    div.appendChild(img);
                } else {
                    div.setAttribute('class', 'carousel-item');
                    img.setAttribute('src', '../images/Parchi/' + image);
                    img.setAttribute('class', 'd-block w-100');
                    img.setAttribute('alt', '...');
                    div.appendChild(img);
                }
                mainDiv.appendChild(div);
            })
        }
    })
})

//--------------------------------------------------------------------

//API GET to set park map

async function setMapParco() {
    let response = await fetch(variables.API_URL + 'parco');
    let data = await response.json();
    return data;
}

setMapParco().then(data => {
    data.forEach(park => {
        if (park.Parco == sessionStorage.getItem("selectedPark")) {
            ParseDMS(park.Posizione);

            // MapBox map
            if (park.Parco == "La Mandria") {
                setZoom(12);
            } else if (park.Parco == "Stelvio") {
                setZoom(9);
            } else if (park.Parco == "Gran Paradiso") {
                setZoom(10);
            }
        }
    })
})

setZoom = (num) => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZG9uZ2kiLCJhIjoiY2t4MGk4ZDN1MThpbzJvcDhpd294ZDAyMSJ9.dlbCTLS_xF3wQ1kD2HEIQw';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        zoom: num,
        center: [lng, lat]
    });
    // Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.NavigationControl());
}

// used in park.html to set the H1 text
setParkName = () => {
    let parkName = document.getElementById("parkName");
    parkName.innerHTML = sessionStorage.getItem("selectedPark");
}