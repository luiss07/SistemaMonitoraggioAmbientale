// API GET for Sensor List

async function getSensorList(){
    let response = await fetch(variables.API_URL+'sensoreGPS');
    let data = await response.json();
    return data;
}

getSensorList().then(data =>{
    let sensorList = document.getElementById('listasensori');
    data.forEach(sensore => {
        if(sensore.Parco == sessionStorage.getItem("selectedPark")){
            let li = document.createElement('li');
            let a = document.createElement('a');
            a.innerHTML = "Sen" + sensore.SenId + '-' + sensore.TipoAnimale;
            a.setAttribute("class", "dropdown-item");

            li.onclick = function(){
                sessionStorage["selectedSensor"] = sensore._id;
                document.getElementById("senId").innerHTML = 'ID sensore parco: '+sensore.SenId;
                document.getElementById("senPosizione").innerHTML = 'Posizione: '+sensore.Posizione;
                document.getElementById("senTipoAnimale").innerHTML = 'Tipo Animale: '+sensore.TipoAnimale;
                document.getElementById("senParco").innerHTML = 'Parco: '+sensore.Parco;
                document.getElementById("senContenimento").innerHTML = 'Contenimento: '+ contToStr(sensore.Contenimento);
            }
            // settare cosa fa l'elemento quando cliccato 
            li.appendChild(a);
            sensorList.appendChild(li);
        }

    })
})

contToStr = (s) =>{
    if(s)
        return 'TRUE';
    else
        return 'FALSE';
}

function setSensorName(){
    let sensorName = document.getElementById("sensorName");
    sensorName.innerHTML = sessionStorage.getItem("selectedPark");
}