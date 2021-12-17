setFloraFaunaPage = () => {
    document.getElementById("faunaFloraName").innerHTML = sessionStorage.getItem("selectedAnimalPlant");
    document.getElementById("ffParkName").innerHTML = sessionStorage.getItem("selectedPark");
    document.getElementById("ffDescription").innerHTML = sessionStorage.getItem("description");
    if (sessionStorage.getItem("selectedPage") == "fauna") {
        genMap();
    }
    if (sessionStorage.getItem("contenimento") == "true") {
        google.charts.load("current", { packages: ["corechart"] });
        google.charts.setOnLoadCallback(drawChart);
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


// chech if fetch return empty json == animal is not tracked
function isEmptyObject(obj) {
    return Object.keys(obj).length;
}


//---------------------------------------------------------------------------------------------

setYearsList = (typeList, years) => {
    typeList = document.getElementById(typeList);

    let count = 1;

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
    fetch(variables.API_URL + 'storicoFauna', {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
            if (sessionStorage.getItem("selectedPark") != null) {

                let totalyears = new Array();
                let singleYears = new Array();
                let counter = 0;

                data.forEach(animal => {
                    if (animal.Parco == sessionStorage.getItem("selectedPark")) {
                        totalyears[counter] = animal.Anno;

                        counter += 1;
                    }

                });

                if (counter > 0) {
                    singleYears = [...new Set(totalyears)]
                }

                setYearsList('startList', singleYears);
                setYearsList('finishList', singleYears);

            } else {
                console.log("seleziona parco");
            }
        })
}

function createYearsForm() {
    let yearsForm = document.getElementById('yearsDiv');
    
    let h3 = document.createElement("h3");
    h3.innerHTML = "Seleziona l'anno iniziale e finale";
    h3.setAttribute("class", "myFFFormText");

    let form = document.createElement("form");
    form.setAttribute("class", "myFFForm");

    let div1 = document.createElement("div");
    div1.setAttribute("class", "form-floating mb-3");

    let select1 = document.createElement("select");
    select1.setAttribute("class", "form-select");
    select1.setAttribute("id", "startList");
    select1.setAttribute("aria-label", "Floating label select example");
    
    let label1 = document.createElement("label");
    label1.setAttribute("for", "floatingSelect");
    label1.innerHTML = "Inizio";

    let div2 = document.createElement("div");
    div2.setAttribute("class", "form-floating mb-3");

    let select2 = document.createElement("select");
    select2.setAttribute("class", "form-select");
    select2.setAttribute("id", "finishList");
    select2.setAttribute("aria-label", "Floating label select example");

    let label2 = document.createElement("label");
    label2.setAttribute("for", "floatingSelect");
    label2.innerHTML = "Fine";

    div1.appendChild(select1);
    div1.appendChild(label1);
    form.appendChild(div1);

    div2.appendChild(select2);
    div2.appendChild(label2);
    form.appendChild(div2);

    yearsForm.appendChild(h3);
    yearsForm.appendChild(form);

}