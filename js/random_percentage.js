// generate random numbers between min and max
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// cambia ogni volta la percentuale di un numero casuale tra -10 e 10
// se è negativo aggiusta
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


// ogni 10 minuti cambia il valore della percentuale chiamando change_percentage
var handle = setInterval(function () {

    // prendi dati dal db (popola sotto)
    /*mettere nelle variabili
    allagamento
    siccità
    ...
    i valori delle percentuali*/
    var allagamento = db.parco.allagamento;
    var siccita = db.parco.allagamento;


    // elabora dati 
    allagamento = change_percentage(allagamento);
    siccita = change_percentage(siccita);
    incendio = change_percentage(incendio);
    risorse_idriche = change_percentage(risorse_idriche);
    meteo = change_percentage(meteo);

    // carica dati nel db (cambia sotto)
    console.log("allagamento = " + allagamento);
    console.log("siccita = " + siccita);
    console.log("incendio = " + incendio);
    console.log("risorse_idriche = " + risorse_idriche);
    console.log("meteo = " + meteo);
    console.log("");

}, 1000 * 60 * 10);// every 10 minutes

