const variables={
    API_URL:"http://localhost:49146/api/",
    PHOTO_URL:"http://localhost:49146/images/"
};

window.sessionStorage.setItem("selectedPark", "Gran Paradiso"); //defaul Park
window.sessionStorage.setItem("selectedAnimalPlant", "");
window.sessionStorage.setItem("description", "");
window.sessionStorage.setItem("selectedPage", "");
window.sessionStorage.setItem("selectedSensor", "");


// -------------- GLOBAL FUNCTION --------------
//          used multiple times in files

// divide the part of the DMS notation and call ConvertDMSToDD
var lat;
var lng;
function ParseDMS(input) {
    var parts = input.split(/[^\d\w]+/);
    lat = ConvertDMSToDD(parts[0], parts[1], parts[2], parts[3]);
    lng = ConvertDMSToDD(parts[4], parts[5], parts[6], parts[7]);
    return {
        lat,
        lng
    };
}

// converts Degrees Minutes Seconds in Decimal Degrees
function ConvertDMSToDD(degrees, minutes, seconds, direction) {
    degrees = parseFloat(degrees);
    minutes = parseFloat(minutes);
    seconds = parseFloat(seconds);

    var dd = (degrees) + (minutes / 60) + (seconds / (60 * 60));

    if (direction == "S" || direction == "W") {
        dd = dd * -1;
    }
    return dd;
}
