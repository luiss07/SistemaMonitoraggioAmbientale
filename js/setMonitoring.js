// generate random numbers between min and max
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// change a little bit the percentange 
// if negative or grater than 100, automatically adjust
function change_percentage(percentage) {
    percentage += getRandom(-10, 10);

    if (percentage < 0) {
        console.log("negativo fixed");
        percentage += 10;
    } else if (percentage > 100) {
        console.log("sopra 100 fixed");
        percentage -= 10;
    }
    return percentage;
}

//----------------------------------------------------------------------------

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

setSensorName = () => {
    document.getElementById("monitoringPark").innerHTML = sessionStorage.getItem("selectedPark");
}

async function setMonitoring() {
    let response = await fetch(variables.API_URL + 'rischioAmbientale');
    let data = await response.json();
    return data;
}

// variables definition
var allagamento;
var incendio;
var meteo;
var risorse_idriche;
var siccita;

setMonitoring().then(data => {
    var handle = setInterval(function () {
        // get percentage & set images
        data.forEach(risk => {
            if (risk.parco == sessionStorage.getItem("selectedPark")) {
                allagamento = risk.allagamento;
                setImgPerc(risk.allagamento, 'Allagamento');
                incendio = risk.incendio;
                setImgPerc(risk.incendio, 'Incendio');
                meteo = risk.meteo;
                setImgPerc(risk.meteo, 'Meteo');
                risorse_idriche = risk.risorseIdriche;
                setImgPerc(risk.risorseIdriche, 'RiIdriche');
                siccita = risk.siccita;
                setImgPerc(risk.siccita, 'Siccita');
            }
        })

        // change percentage 
        allagamento = change_percentage(allagamento);
        siccita = change_percentage(siccita);
        incendio = change_percentage(incendio);
        risorse_idriche = change_percentage(risorse_idriche);
        meteo = change_percentage(meteo);

        // reset percentage
        setRisk();   //??
        // carica dati nel db (cambia sotto)
        console.log("allagamento = " + allagamento);
        console.log("siccita = " + siccita);
        console.log("incendio = " + incendio);
        console.log("risorse_idriche = " + risorse_idriche);
        console.log("meteo = " + meteo);
        console.log("");

    }, 10000 * 2 * 01);// every 10 minutes
})


setRisk = () => {
    let raw = {
        allagamento: allagamento, 
        incendio: incendio,
        meteo: meteo,
        siccita: siccita,
        risoreIdriche: risorse_idriche
    };
    fetch(variables.API_URL + 'rischioAmbientale', {
        method: 'PUT',
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

}