// API call to GET Sensor List

async function getSensorList() {
    let response = await fetch(variables.API_URL + 'sensoreGPS/' + sessionStorage.getItem("selectedPark"));
    let data = await response.json();
    return data;
}

getSensorList().then(data => {
    let sensorList = document.getElementById('listasensori');
    data.forEach(sensore => {
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
    sessionStorage['selectedPage'] = 'Sensori';
}

//enable/disable delete button
deleteButtonDisabled = (enabled) => {
    document.getElementById("deleteButton").disabled = enabled;
}

//set table parameters
setTableSensor = (id, pos, tipoA, parco/*, cont*/) => {
    document.getElementById("senId").innerHTML = 'ID sensore parco: ' + id;
    document.getElementById("senPosizione").innerHTML = 'Posizione: ' + pos;
    document.getElementById("senTipoAnimale").innerHTML = 'Tipo Animale: ' + tipoA;
    document.getElementById("senParco").innerHTML = 'Parco: ' + parco;
    //document.getElementById("senContenimento").innerHTML = 'Contenimento: ' + contToStr(cont);
}

// API call to delete one sensor
deleteSensorAlert = () => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            deleteSensor();
        }
      })
}

deleteSensor = () => {
    fetch(variables.API_URL + 'sensoreGPS/' + sessionStorage.getItem('selectedSensor'), {
        method: 'DELETE'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not OK');
            }
            Swal.fire(
                'Deleted!',
                'Your sensor has been deleted.',
                'success',
                )
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                footer: error
              })
        });

        $("#loadJQuery").load("../ui/sensori.html");
        deleteButtonDisabled(true);
}

//API call to add one sensor
addSensor = () => {
    let raw = {
        posizione: randomPositionGenerator(sessionStorage.getItem('parkPos')),
        tipoAnimale: document.getElementById("animalField").options[document.getElementById("animalField").selectedIndex].text,
        parco: sessionStorage.getItem('selectedPark'),
        senId: document.getElementById('idField').value
    };
    fetch(variables.API_URL + 'sensoreGPS', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(raw)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not OK');
            }
            response.json();
            alert('Sensor added successfully!');
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            alert('There has been a problem with your fetch operation: ' + error);
        }); 

    $("#loadJQuery").load("../ui/sensori.html"); //return to sensors page
    getSensorList(); //reload sensors list
    $('#addSensorModal').modal('hide'); //hide form add button

}

// Used in onclick event of "Aggiungi sensore" button to set precompiled fields
setAddButtonPopUp = () => {
    // set animals selector
    fetch(variables.API_URL + 'fauna/cont/' + true, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
            let count = 1;
            let select = document.getElementById('animalField');
            data.forEach(animal => {
                animal.Parco.forEach(park => {
                    if (park == sessionStorage.getItem('selectedPark')){
                        let option = document.createElement('option');
                        option.setAttribute('value', count);
                        option.innerHTML = animal.Tipo;
                        select.appendChild(option);
                        count++;
                    }
                })
            })
        });
    // set park field
    document.getElementById('parkField').setAttribute('value', sessionStorage.getItem("selectedPark"));
    
    // set sensor number
    fetch(variables.API_URL + 'sensoreGPS/' + sessionStorage.getItem("selectedPark"), {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
            let maxId = 0;
            data.forEach(sen => {
                    maxId = Math.max(maxId, sen.SenId);
            })
            document.getElementById('idField').setAttribute('value', maxId + 1);
        });
}