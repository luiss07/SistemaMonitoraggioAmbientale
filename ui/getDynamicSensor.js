// API GET for Sensor List

async function getSensorList(){
    let response = await fetch('http://localhost:49146/api/sensoreGPS');
    let data = await response.json();
    return data;
}

getSensorList().then(data =>{
    let sensorList = document.getElementById('listasensori');
    let count = 1;
    data.forEach(sensore => {
        let li = document.createElement('li');
        let a = document.createElement('a');
        a.innerHTML = "Sen" + count;
        count++;
        a.setAttribute("class", "dropdown-item");
        // settare cosa fa l'elemento quando cliccato 
        li.appendChild(a);
        sensorList.appendChild(li);
    })
})