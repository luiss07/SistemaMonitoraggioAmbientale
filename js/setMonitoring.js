setImgPerc = (perc, tipo) => {
    if (perc < 20) {
        document.getElementById('img' + tipo).setAttribute('src', '../images/cerchi/cerchio.png');
    } else if (perc >= 20 && perc < 40) {
        document.getElementById('img' + tipo).setAttribute('src', '../images/cerchi/cerchio_arancio.png');
    } else {
        document.getElementById('img' + tipo).setAttribute('src', '../images/cerchi/cerchio_rosso.png');
    }
    document.getElementById('p' + tipo).innerHTML = perc + '%';
}

setSensorName = () => {
    document.getElementById("monitoringPark").innerHTML = sessionStorage.getItem("selectedPark");
}

async function getMonitoring() {
    let response = await fetch(variables.API_URL + 'rischioAmbientale/'+ sessionStorage.getItem('selectedPark'));
    let data = await response.json();
    return data;
}

getMonitoring().then(data => {
    // get percentage & set images
    setImgPerc(data[0].allagamento, 'Allagamento');
    setImgPerc(data[0].incendio, 'Incendio');
    setImgPerc(data[0].meteo, 'Meteo');
    setImgPerc(data[0].risorseIdriche, 'RiIdriche');
    setImgPerc(data[0].siccita, 'Siccita');
})