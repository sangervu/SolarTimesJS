// tällä funktiolla lasketaan auringon nosu- ja laskuhetket
// by Sakari Angervuori 15.4.2020

function CellestialSolarTransitions(alfa, delta, lat, timeStellarNoon) {

    var horizon = toRadians(-0.83); // Aurinko laskee horisonttiin
    var visible = toRadians(-6.); // Auringon lasku "porvarillinen hämärä"
    var nocturnal = toRadians(-12.); // Auringon lasku "nauttinen hämärä"
    var night = toRadians(-18.); // Auringonlasku astronominen hämärä (täydellinen pimeys)

    var latRad = toRadians(lat);
    var deltaRad = toRadians(delta);

    //korkeimmillaan, eli etelässä
    var timeSouth = minDegree(alfa - timeStellarNoon) * 24. / 360.;

    //Auringon nousu
    var timeRize = minHour(timeSouth - toDegrees(Math.acos(Math.sin(horizon) / (Math.cos(deltaRad) * Math.cos(latRad)) - Math.tan(deltaRad) * Math.tan(latRad))) * 24. / 360.);
    //Aurinko etelässä, eli korkeimmillaan

    //Auringon lasku
    var timeSet = minHour(timeSouth + toDegrees(Math.acos(Math.sin(horizon) / (Math.cos(deltaRad) * Math.cos(latRad)) - Math.tan(deltaRad) * Math.tan(latRad))) * 24. / 360.);
    //Set time for visible lumination
    var timeSetCivil = minHour(timeSouth + toDegrees(Math.acos(Math.sin(visible) / (Math.cos(deltaRad) * Math.cos(latRad)) - Math.tan(deltaRad) * Math.tan(latRad))) * 24. / 360.);
    //Set time for nocturnal lumination
    var timeSetNautical = minHour(timeSouth + toDegrees(Math.acos(Math.sin(nocturnal) / (Math.cos(deltaRad) * Math.cos(latRad)) - Math.tan(deltaRad) * Math.tan(latRad))) * 24. / 360.);
    //Set time for total darkness
    var timeSetAstronomical = minHour(timeSouth + toDegrees(Math.acos(Math.sin(night) / (Math.cos(deltaRad) * Math.cos(latRad)) - Math.tan(deltaRad) * Math.tan(latRad))) * 24. / 360.);

    //Desimaalinen aikaesitys muutetaan normi esitystavaksi (HH:MM)
    this.timeRizeTrue = timeHour(timeRize) + ":" + timeMinute(timeRize);
    this.timeSouthTrue = timeHour(timeSouth) + ":" + timeMinute(timeSouth);
    this.timeSetTrue = timeHour(timeSet) + ":" + timeMinute(timeSet);
    this.timeSetVisible = timeHour(timeSetCivil) + ":" + timeMinute(timeSetCivil);
    this.timeSetNocturn = timeHour(timeSetNautical) + ":" + timeMinute(timeSetNautical);
    this.timeSetDark = timeHour(timeSetAstronomical) + ":" + timeMinute(timeSetAstronomical);
}

function timeHour(timeValue) {
    // hour value
    if (isNaN(timeValue)) {
        return "-";
    }
    var hourTime = Math.floor(timeValue);
    if (hourTime < 10) {
        return "0" + hourTime;
    } else {
        return hourTime;
    }
}

function timeMinute(timeValue) {
    // minute value
    if (isNaN(timeValue)) {
        return "-";
    }
    var minuteTime = Math.floor((timeValue - Math.floor(timeValue)) * 60);
    if (minuteTime < 10) {
        return "0" + minuteTime;
    } else {
        return minuteTime;
    }
}

/* (0-360 deg) Metodi*/
function minDegree(degree) {
    while (degree >= 360.)
        degree = degree - 360.;
    while (degree < 0.)
        degree = degree + 360.;
    return degree;
}

/* (0-24 h) Metodi*/
function minHour(hour) {
    while (hour >= 24)
        hour = hour - 24;
    while (hour < 0)
        hour = hour + 24;
    return hour;
}

function toRadians(degree) {

    var radian = degree * Math.PI / 180;
    return radian;
}

function toDegrees(radians) {

    var degrees = radians * 180 / Math.PI;
    return degrees;
}