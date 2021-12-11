
// generate random number between min and max (integer)
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

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

// converts DD in DMS
function toDegreesMinutesAndSeconds(coordinate) {
    var absolute = Math.abs(coordinate);
    var degrees = Math.floor(absolute);
    var minutesNotTruncated = (absolute - degrees) * 60;
    var minutes = Math.floor(minutesNotTruncated);
    var seconds = Math.floor((minutesNotTruncated - minutes) * 60);

    return degrees + "° " + minutes + "' " + seconds;
}

function convertDMS(lat, lng) {
    var latitude = toDegreesMinutesAndSeconds(lat);
    var latitudeCardinal = lat >= 0 ? "N" : "S";

    var longitude = toDegreesMinutesAndSeconds(lng);
    var longitudeCardinal = lng >= 0 ? "E" : "W";

    return latitude + " " + latitudeCardinal + " " + longitude + " " + longitudeCardinal;
}

// position must be the position of the park (in DMS notation)
function randomPositionGenerator(position) {
    // conversion between DMS and DD notation
    ParseDMS(position);

    // random coordinates generator
    lat += (getRandom(-20, 20) / 100);
    lng += (getRandom(-20, 20) / 100);

    // conversion between DD and DMS notation
    return convertDMS(lat, lng);
}

/*  randomPositionGenerator test
for (i = 0; i< 5; i++){
    console.log(randomPositionGenerator("45° 30' 00 N 7° 15' 00 E"));
}
*/