
// tällä funktiolla lasketaan auringon tämän hetkinen positio taivaalla
// by Sakari Angervuori 7.4.2020

function CellestialSolarPosition(lat, lon, timeZone, year, month, day, hour, minute) {

    // function for calculatin julian date and T

    var julian = 367 * year - (7 * (year + (month + 9) / 12)) / 4 - (3 * ((year + (month - 9) / 7) / 100 + 1)) / 4 + 275 * month / 9 + day + 1721029;
    var T = (julian - 0.5 + hour / 24. + minute / 1440. - 2451545.) * 0.000027378507871321;

    var epsilonDeg = (23 + 26. / 60. + 21.448 / 3600 - 46.815 / 3600 * T - 0.00059 / 3600 * T * T + 0.001813 * T * T * T);
    var epsilonRad = toRadians(epsilonDeg);

    var Lo = toRadians(minDegree((280.46646 + 36000.76983 * T + 0.0003032 * T * T)));

    var M = toRadians(minDegree((357.52911 + 35999.05029 * T - 0.0001537 * T * T)));
    var C = toRadians((1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(M) + (0.019993 - 0.000101 * T) * Math.sin(2 * M) + 0.000289 * Math.sin(3 * M));
    var x = Math.cos(Lo + C);
    var y = Math.cos(epsilonRad) * Math.sin(Lo + C);

    var alfa = trueTan(y, x);
    var delta = toDegrees(Math.asin(Math.sin(epsilonRad) * Math.sin(Lo + C)));

    var stellarTimeDeg = minDegree((24110.54841 + 8640184.812866 * T + 0.093104 * (T * T) - 0.0000062 * (T * T * T)) / 3600. * 15.);
    var stellarTimeNoon = minDegree(stellarTimeDeg + 1.002737908 * (-timeZone) * 15. + lon);
    var stellarTimeLocalDeg = minDegree(stellarTimeNoon + (1.002737908 * (hour + minute / 60.) * 15.));

    var hourRad = toRadians(stellarTimeLocalDeg - alfa);
    var deltaRad = toRadians(delta);
    var latitudeRad = toRadians(lat);

    //atsimuutti x ja y komponentit
    var Ay = Math.sin(hourRad) * Math.cos(deltaRad);
    var Ax = Math.cos(hourRad) * Math.cos(deltaRad) * Math.sin(latitudeRad) - Math.sin(deltaRad) * Math.cos(latitudeRad);
 
    /*korkeimmillaan, eli etelässä*/
    this.deltaSun = delta;
    this.alfaSun = alfa;
    this.stellarTimeMidDay = stellarTimeNoon;
    this.currentSunAzimuth = Math.round(10 * minDegree(trueTan(Ay, Ax) + 180.)) / 10;
    this.currentSunElevation = Math.round(10 * toDegrees(Math.asin(Math.sin(deltaRad) * Math.sin(latitudeRad) + Math.cos(hourRad) * Math.cos(deltaRad) * Math.cos(latitudeRad)))) / 10;
    this.maxSunElevation = Math.round(10 * trueElevation(90.0 + delta - lat)) / 10;
    this.timeSunSouth = minDegree(alfa - stellarTimeNoon) * 24. / 360.;
    //this.timeSouthString = (TimeFormat.timeHour(timeSouth) + ":" + TimeFormat.timeMinute(timeSouth));
}

/* True tangent Metodi*/
function trueTan(y, x) {
    var alfa = y / x;
    alfa = toDegrees(Math.atan(alfa));
    if (y >= 0 & x > 0)
        return alfa;
    else if (y >= 0 & x < 0)
        alfa = alfa + 180;
    else if (y < 0 & x > 0)
        alfa = alfa + 360;
    else if (y < 0 & x < 0)
        alfa = alfa + 180;
    return alfa;
}

/* (0-360 deg) Metodi*/
function minDegree(degree) {
    while (degree >= 360.)
        degree = degree - 360.;
    while (degree < 0.)
        degree = degree + 360.;
    return degree;
}

function trueElevation(degree) {
    while (degree > 90)
        degree = 180 - degree;
    while (degree < - 90)
        degree = 180 + degree;
    return degree;
}

function toRadians(degree) {

    var radian = degree * 2 * Math.PI / 180;
    return radian;
}

function toDegrees(radians) {

    var degrees = radians * 180 / (2 * Math.PI);
    return degrees;
}