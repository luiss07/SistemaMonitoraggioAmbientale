setFloraFaunaPage = () => {
    document.getElementById("faunaFloraName").innerHTML = sessionStorage.getItem("selectedAnimalPlant");
    document.getElementById("ffParkName").innerHTML = sessionStorage.getItem("selectedPark");
    document.getElementById("ffDescription").innerHTML = sessionStorage.getItem("description");
    if (sessionStorage.getItem("selectedPage") == "fauna") {
        genMap();
    }
}

// API CALL to set dynamically the images

async function setImageFloraFauna() {
    let sPage = sessionStorage.getItem("selectedPage");
    let response = await fetch(variables.API_URL + sPage);
    let data = await response.json();
    return data;
}

setImageFloraFauna().then(data => {
    let count = 0;
    let mainDiv = document.getElementById("ffImages");
    data.forEach(elem => {
        if (elem.Tipo == sessionStorage.getItem("selectedAnimalPlant")) {
            elem.Immagine.forEach(image => {
                let div = document.createElement("div");
                let img = document.createElement("img");
                if (count == 0) {    //different div & img element for first declaration
                    div.setAttribute('class', 'carousel-item active');
                    img.setAttribute('src', '../images/FloraFauna/' + image);
                    img.setAttribute('class', 'myImg-fluid');
                    img.setAttribute('alt', sessionStorage.getItem("selectedPark") + 'image');
                    count++;
                    div.appendChild(img);
                } else {
                    div.setAttribute('class', 'carousel-item');
                    img.setAttribute('src', '../images/FloraFauna/' + image);
                    img.setAttribute('class', 'd-block w-100');
                    img.setAttribute('alt', '...');
                    div.appendChild(img);
                }
                mainDiv.appendChild(div);
            })
        }
    })
})

// function to generate the selected animal Map
genMap = () => {

    fetch(variables.API_URL + 'parco/' + sessionStorage.getItem('selectedPark'), {
        method: 'GET'
    })
        .then(response => response.json())
        .then(park => {
            ParseDMS(park[0].Posizione);

            fetch(variables.API_URL + 'sensoreGPS/' + sessionStorage.getItem('selectedAnimalPlant') + '/' + sessionStorage.getItem('selectedPark'), {
                method: 'GET'
            })
                .then(response => response.json())
                .then(data => {
                    if (isEmptyObject(data)) {
                        let animalMap = setMapBox(); // init map
                        data.forEach(sen => {
                            ParseDMS(sen.Posizione);
                            // marker creator
                            //let marker1 = new 
                            new mapboxgl.Marker()
                                .setLngLat([lng, lat])
                                .addTo(animalMap);

                        })
                    }else{
                        console.log('Questo animale non viene tracciato.');
                    }
                });
        });
}

// create MapBox
setMapBox = () => {
    // MapBox map
    mapboxgl.accessToken = 'pk.eyJ1IjoiZG9uZ2kiLCJhIjoiY2t4MGk4ZDN1MThpbzJvcDhpd294ZDAyMSJ9.dlbCTLS_xF3wQ1kD2HEIQw';
    let map = new mapboxgl.Map({
        container: 'mapFauna',
        style: 'mapbox://styles/mapbox/streets-v11',
        zoom: 9,
        center: [lng, lat]
    });
    return map;
}

// chech if fetch return empty json == animal is not tracked
function isEmptyObject(obj) {
    return Object.keys(obj).length;
}