/*
    THE FOLLOWINNG FUNCTIONS SIMULATE AN API THAT EVERY 10 
    MINUTES RECIEVE NEW PERCENTAGE FROM AN EXTERNAL API AND 
    UPDATE THE DATA STORED IN THE DATABASE
*/

// change a little bit the percentange 
// if negative or grater than 100, automatically adjust
chg_perc = (percentage) => {
    percentage += getRandom(-10, 10);

    if (percentage < 0) {
        percentage += 10;
    } else if (percentage > 100) {
        percentage -= 10;
    }
    return percentage;
}

interval = setInterval(() => {
    fetch(variables.API_URL + 'rischioAmbientale', {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
            let allagamento, incendio, meteo, risorse_idriche, siccita;
            data.forEach(risk => {
                allagamento = risk.allagamento;
                incendio = risk.incendio;
                meteo = risk.meteo;
                risorse_idriche = risk.risorseIdriche;
                siccita = risk.siccita;
                if (sessionStorage.getItem('selectedPage') == 'monitoraggio' && risk.parco == sessionStorage.getItem('selectedPark')) {                    
                    // put the new percentage on mongodb
                    setRisk(chg_perc(allagamento), chg_perc(siccita), chg_perc(incendio), chg_perc(risorse_idriche), chg_perc(meteo), risk.parco);

                    // reload the page to show the changes
                    $("#loadJQuery").load("/ui/monitoraggio.html");
                } else {
                    // put the new percentage on mongodb
                    setRisk(chg_perc(allagamento), chg_perc(siccita), chg_perc(incendio), chg_perc(risorse_idriche), chg_perc(meteo), risk.parco);
                    console.log('aggionamento coordinate');
                }
            })
        });
}, 1000 * 60 * 10);// every 10 minutes

setRisk = (all, sic, inc, riId, met, park) => {
    let raw = {
        parco: park,
        allagamento: all,
        incendio: inc,
        meteo: met,
        siccita: sic,
        risorseIdriche: riId
    };
    fetch(variables.API_URL + 'rischioAmbientale', {
        method: 'PUT',
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
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });

}