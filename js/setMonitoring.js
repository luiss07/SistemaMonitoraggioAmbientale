setSensorName = () => {
    document.getElementById("monitoringPark").innerHTML = sessionStorage.getItem("selectedPark");
}

async function setMonitoring() {
    let response = await fetch(variables.API_URL + 'rischioAmbientale');
    let data = await response.json();
    return data;
}

setMonitoring().then(data => {
    data.forEach(risk => {
        if (risk.parco == sessionStorage.getItem("selectedPark")) {
            setImgPerc(risk.allagamento, 'Allagamento');
            setImgPerc(risk.incendio, 'Incendio');
            setImgPerc(risk.meteo, 'Meteo');
            setImgPerc(risk.risorseIdriche, 'RiIdriche');
            setImgPerc(risk.siccita, 'Siccita');
        }
    })
})

setImgPerc = (perc, tipo) => {
    if (perc < 20) {
        document.getElementById('img'+tipo).setAttribute('src', '../images/cerchi/cerchio.png');
    }else if (perc >= 20 && perc < 40) {
        document.getElementById('img'+tipo).setAttribute('src', '../images/cerchi/cerchio_arancio.png');
    }else{
        document.getElementById('img'+tipo).setAttribute('src', '../images/cerchi/cerchio_rosso.png');
    }
    document.getElementById('p'+tipo).innerHTML = perc + '%';
}