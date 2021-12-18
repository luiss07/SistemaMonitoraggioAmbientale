const variables={
    API_URL:"http://localhost:49146/api/",
    PHOTO_URL:"http://localhost:49146/images/"
};

window.sessionStorage.setItem("selectedPark", "Gran Paradiso"); //defaul Park
window.sessionStorage.setItem("parkPos", "45° 32' 00 N 7° 17' 00 E"); // default park coordinates
window.sessionStorage.setItem("selectedAnimalPlant", "");
window.sessionStorage.setItem("contenimento", "");
window.sessionStorage.setItem("description", "");
window.sessionStorage.setItem("selectedPage", "monitoraggio"); //default page
window.sessionStorage.setItem("selectedSensor", "");

// ---- variables for histogram generator ----
let barsVisualization;
let data;
let mesi = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];

// -------------- GLOBAL FUNCTION --------------
//          used multiple times in files

// divide the part of the DMS notation and call ConvertDMSToDD
var lat;
var lng;
ParseDMS = (input) => {
    let parts = input.split(/[^\d\w]+/);
    lat = ConvertDMSToDD(parts[0], parts[1], parts[2], parts[3]);
    lng = ConvertDMSToDD(parts[4], parts[5], parts[6], parts[7]);
}

// converts Degrees Minutes Seconds in Decimal Degrees
ConvertDMSToDD = (degrees, minutes, seconds, direction) => {
    degrees = parseFloat(degrees);
    minutes = parseFloat(minutes);
    seconds = parseFloat(seconds);

    var dd = (degrees) + (minutes / 60) + (seconds / (60 * 60));

    if (direction == "S" || direction == "W") {
        dd = dd * -1;
    }
    return dd;
}

// generate random number between min and max (integer)
getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}