//API GET to set park image

async function setImageParco() {
    let response = await fetch(variables.API_URL + 'parco/' + sessionStorage.getItem("selectedPark"));
    let data = await response.json();
    return data;
}

setImageParco().then(data => {
    let count = 0;
    let mainDiv = document.getElementById("parkImages");
    data[0].Immagine.forEach(image => {
        let div = document.createElement("div");
        let img = document.createElement("img");
        if (count == 0) {    //different div & img element for first declaration
            div.setAttribute('class', 'carousel-item active');
            img.setAttribute('src', '../images/Parchi/' + image);
            img.setAttribute('class', 'myImg-fluid');
            img.setAttribute('alt', data[0].Tipo + 'image');
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
})

//API GET to set park map

async function setMapParco() {
    let response = await fetch(variables.API_URL + 'parco/' + sessionStorage.getItem("selectedPark"));
    let data = await response.json();
    return data;
}

setMapParco().then(data => {
    ParseDMS(data[0].Posizione);

    // set map zoom
    if (data[0].Parco == "La Mandria") {
        setZoom(12);
    } else if (data[0].Parco == "Stelvio") {
        setZoom(9);
    } else if (data[0].Parco == "Gran Paradiso") {
        setZoom(10);
    }
})

// function to set zoom
setZoom = (num) => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZG9uZ2kiLCJhIjoiY2t4MGk4ZDN1MThpbzJvcDhpd294ZDAyMSJ9.dlbCTLS_xF3wQ1kD2HEIQw';
    let map = new mapboxgl.Map({
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