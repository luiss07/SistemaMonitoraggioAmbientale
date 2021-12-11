/*
    THIS JAVASCRIPT FILE CONTAINS SOME FUNCTION TO
    SIMULATE AN API GET TO RECIVE THE POSITION OF
    THE SENSOR JUST ADDED
*/
// generate random number between min and max (integer)
getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// converts DD in DMS
toDegreesMinutesAndSeconds = (coordinate) => {
    var absolute = Math.abs(coordinate);
    var degrees = Math.floor(absolute);
    var minutesNotTruncated = (absolute - degrees) * 60;
    var minutes = Math.floor(minutesNotTruncated);
    var seconds = Math.floor((minutesNotTruncated - minutes) * 60);

    return degrees + "° " + minutes + "' " + seconds;
}

convertDMS = (lat, lng) => {
    var latitude = toDegreesMinutesAndSeconds(lat);
    var latitudeCardinal = lat >= 0 ? "N" : "S";

    var longitude = toDegreesMinutesAndSeconds(lng);
    var longitudeCardinal = lng >= 0 ? "E" : "W";

    return latitude + " " + latitudeCardinal + " " + longitude + " " + longitudeCardinal;
}

// position must be the position of the park (in DMS notation)
randomPositionGenerator = (position) => {
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