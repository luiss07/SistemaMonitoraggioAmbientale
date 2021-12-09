// API GET for Sensor List

async function getSensorList() {
    let response = await fetch(variables.API_URL + 'sensoreGPS');
    let data = await response.json();
    return data;
}

getSensorList().then(data => {
    let sensorList = document.getElementById('listasensori');
    data.forEach(sensore => {
        if (sensore.Parco == sessionStorage.getItem("selectedPark")) {
            let li = document.createElement('li');
            let a = document.createElement('a');
            a.innerHTML = "Sen" + sensore.SenId + '-' + sensore.TipoAnimale;
            a.setAttribute("class", "dropdown-item");

            li.onclick = function () {
                sessionStorage["selectedSensor"] = sensore._id;
                setTableSensor(sensore.SenId, sensore.Posizione, sensore.TipoAnimale, sensore.Parco, sensore.Contenimento);
                enableDeleteButton(false);
            }

            li.appendChild(a);
            sensorList.appendChild(li);
        }

    })
})

//return formatted true & false value
contToStr = (s) => {
    if (s)
        return 'TRUE';
    else if (!s)
        return 'FALSE';
    else
        return '';
}

//set the sub-title of sensors page
setSensorName = () => {
    let sensorName = document.getElementById("sensorName");
    sensorName.innerHTML = sessionStorage.getItem("selectedPark");
}

//enable/disable delete button
enableDeleteButton = (enabled) => {
    document.getElementById("deleteButton").disabled = enabled;
}

//set table parameters
setTableSensor = (id, pos, tipoA, parco, cont) => {
    document.getElementById("senId").innerHTML = 'ID sensore parco: ' + id;
    document.getElementById("senPosizione").innerHTML = 'Posizione: ' + pos;
    document.getElementById("senTipoAnimale").innerHTML = 'Tipo Animale: ' + tipoA;
    document.getElementById("senParco").innerHTML = 'Parco: ' + parco;
    document.getElementById("senContenimento").innerHTML = 'Contenimento: ' + contToStr(cont);
}

// API call to delete one sensor
deleteSensor = () => {
    fetch(variables.API_URL + 'sensoreGPS/' + sessionStorage.getItem('selectedSensor'), {
        method: 'DELETE'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not OK');
            }
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });

    $("#loadJQuery").load("sensori.html"); //reload the page to update the sensor list
}

