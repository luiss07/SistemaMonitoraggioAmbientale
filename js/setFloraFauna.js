setFloraFaunaPage = () => {
    document.getElementById("faunaFloraName").innerHTML = sessionStorage.getItem("selectedAnimalPlant");
    document.getElementById("ffParkName").innerHTML = sessionStorage.getItem("selectedPark");
    document.getElementById("ffDescription").innerHTML = sessionStorage.getItem("description");

    // create map only for fauna
    if (sessionStorage.getItem("selectedPage") == "fauna" && sessionStorage.getItem("contenimento") == "true") {
        genMap();
    }
    // create years list and histogram
    if (sessionStorage.getItem("selectedPage") == "fauna") {
        document.getElementById('histogramDiv').setAttribute('class', 'col myHistogramDiv');
        document.getElementById('chart_div').setAttribute('class', 'myHistogram');
        createYearsForm();
        getYears();
    }
}

// API CALL to set dynamically the images

async function setImageFloraFauna() {
    let sPage = sessionStorage.getItem("selectedPage");
    let response = await fetch(variables.API_URL + sPage + '/' + sessionStorage.getItem('selectedAnimalPlant'));
    let data = await response.json();
    return data;
}

setImageFloraFauna().then(data => {
    let count = 0;
    let mainDiv = document.getElementById("ffImages");
    data[0].Immagine.forEach(image => {
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

                        let animalMap;
                        document.getElementById('mapFauna').setAttribute('class', 'map')
                        // set map zoom
                        if (park[0].Parco == "La Mandria") {
                            animalMap = setMapBox(12);
                        } else if (park[0].Parco == "Stelvio") {
                            animalMap = setMapBox(9);
                        } else if (park[0].Parco == "Gran Paradiso") {
                            animalMap = setMapBox(10);
                        }

                        data.forEach(sen => {
                            ParseDMS(sen.Posizione);
                            // marker creator
                            //let marker1 = new 
                            new mapboxgl.Marker()
                                .setLngLat([lng, lat])
                                .addTo(animalMap);
                        })
                    } else {
                        console.log('Questo animale non viene tracciato.');
                    }
                });
        });
}

// create MapBox
setMapBox = (num) => {
    // MapBox map
    mapboxgl.accessToken = 'pk.eyJ1IjoiZG9uZ2kiLCJhIjoiY2t4MGk4ZDN1MThpbzJvcDhpd294ZDAyMSJ9.dlbCTLS_xF3wQ1kD2HEIQw';
    let map = new mapboxgl.Map({
        container: 'mapFauna',
        style: 'mapbox://styles/mapbox/streets-v11',
        zoom: num,
        center: [lng, lat]
    });

    // Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.NavigationControl());

    return map;
}

// chech if fetch return empty json (animal is not tracked)
function isEmptyObject(obj) {
    return Object.keys(obj).length;
}


//---------------------------------------------------------------------------------------------

setYearsList = (typeList, years) => {
    typeList = document.getElementById(typeList);

    let count = 1;
    years.sort();
    years.forEach(year => {
        let option = document.createElement("option");
        option.innerHTML = year;
        option.setAttribute("value", count);

        count += 1;

        typeList.appendChild(option);
    })

}

// API call to GET years list

getYears = () => {
    fetch(variables.API_URL + 'storicoFauna/' + sessionStorage.getItem("selectedAnimalPlant") + "/" + sessionStorage.getItem("selectedPark"), {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
            let totalyears = new Array();
            let singleYears = new Array();
            let counter = 0;

            data.forEach(animal => {
                totalyears[counter] = animal.Anno;
                counter += 1;
            });

            if (counter > 0) {
                singleYears = [...new Set(totalyears)]
            }

            setYearsList('startList', singleYears);
            setYearsList('finishList', singleYears);
        })
}

createYearsForm = () => {
    let yearsForm = document.getElementById('yearsDiv');
    document.getElementById('yearsDiv').setAttribute('class', 'col myFFFormDiv');

    let h3 = document.createElement("h3");
    h3.innerHTML = "Seleziona l'anno iniziale e finale";
    h3.setAttribute("class", "myFFFormText");

    let form = document.createElement("form");
    form.setAttribute("class", "myFFForm");

    // container for start list
    let div = document.createElement("div");
    div.setAttribute("class", "form-floating mb-3");

    let select = document.createElement("select");
    select.setAttribute("class", "form-select");
    select.setAttribute("id", "startList");
    select.setAttribute("aria-label", "Floating label select example");

    let label = document.createElement("label");
    label.setAttribute("for", "floatingSelect");
    label.innerHTML = "Inizio";

    div.appendChild(select);
    div.appendChild(label);
    form.appendChild(div);

    // container for finish list
    div = document.createElement("div");
    div.setAttribute("class", "form-floating mb-3");

    select = document.createElement("select");
    select.setAttribute("class", "form-select");
    select.setAttribute("id", "finishList");
    select.setAttribute("aria-label", "Floating label select example");

    label = document.createElement("label");
    label.setAttribute("for", "floatingSelect");
    label.innerHTML = "Fine";

    let button = document.createElement("button");
    button.setAttribute("class", "btn btn-primary mt-3");
    button.setAttribute("type", "submit");
    button.onclick = () => {
        google.charts.load("current", { packages: ["corechart"] });
        drawChart();
    }
    button.innerHTML = "Conferma"; 

    div.appendChild(select);
    div.appendChild(label);
    form.appendChild(div);

    yearsForm.appendChild(h3);
    yearsForm.appendChild(form);
    yearsForm.appendChild(button);

}