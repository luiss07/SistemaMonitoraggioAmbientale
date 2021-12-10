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
                deleteButtonDisabled(false);
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
    document.getElementById("sensorPark").innerHTML = sessionStorage.getItem("selectedPark");
}

//enable/disable delete button
deleteButtonDisabled = (enabled) => {
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
    if (!confirm("Sei sicuro?")) {
        return;
    }
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
    getSensorList();
    deleteButtonDisabled(true);
}

//API call to add one sensor
addSensor = () => {
    let raw = {
        posizione: "50 50 50", 
        tipoAnimale: document.getElementById('animalField').value,
        parco: sessionStorage.getItem('selectedPark'),
        contenimento: document.getElementById('contField').value,
        senId: document.getElementById('idField').value
    };
    fetch(variables.API_URL + 'sensoreGPS', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(raw) //definire come generare la posizione
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not OK');
            }
            response.json();
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });

    $('#addSensorModal').modal('hide');
    getSensorList(); //reload the page to update sensor list
}

setAddButtonPopUp = () => {
    document.getElementById('parkField').setAttribute('value', sessionStorage.getItem("selectedPark"));
    fetch(variables.API_URL + 'sensoreGPS', {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
            let maxId = 0;
            data.forEach(sen => {
                if (sen.Parco == sessionStorage.getItem('selectedPark')) {
                    maxId = Math.max(maxId, sen.SenId);
                }
            })
            document.getElementById('idField').setAttribute('value', maxId+1);
        });
}