
// tällä funktiolla lasketaan auringon tämän hetkinen positio taivaalla
// by Sakari Angervuori 14.4.2020

function CellestialSolarPosition(lat, lon, timeZone, year, month, day, k, hour, minute) {

    // function for calculatin julian date and T

    var julian = 367 * year - (7 * (year + (month + 9) / 12)) / 4 - (3 * ((year + (month - 9) / 7) / 100 + 1)) / 4 + 275 * month / 9 + day + 1721029;
    var T = (julian - k + hour / 24. + minute / 1440. - 2451545.) * 0.000027378507871321;
    
    var epsilonDeg = (23 + 26. / 60. + 21.448 / 3600 - 46.815 / 3600 * T - 0.00059 / 3600 * T * T + 0.001813 * T * T * T);
    var epsilonRad = MathNew.deg2rad(epsilonDeg);

    var Lo = MathNew.deg2rad(MathNew.minDegree(280.46646 + 36000.76983 * T + 0.0003032 * T * T));
    var M = MathNew.deg2rad(MathNew.minDegree((357.52911 + 35999.05029 * T - 0.0001537 * T * T)));
    var C = MathNew.deg2rad((1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(M) + (0.019993 - 0.000101 * T) * Math.sin(2 * M) + 0.000289 * Math.sin(3 * M));
    var x = Math.cos(Lo + C);
    var y = Math.cos(epsilonRad) * Math.sin(Lo + C);

    var alfa = MathNew.trueTan(y, x);
    var delta = MathNew.rad2deg(Math.asin(Math.sin(epsilonRad) * Math.sin(Lo + C)));

    var stellarTimeDeg = MathNew.minDegree((24110.54841 + 8640184.812866 * T + 0.093104 * (T * T) - 0.0000062 * (T * T * T)) / 3600. * 15.);
    var stellarTimeNoon = MathNew.minDegree(stellarTimeDeg + 1.002737908 * (-timeZone) * 15. + lon);
    var stellarTimeLocalDeg = MathNew.minDegree(stellarTimeNoon + (1.002737908 * (hour + minute / 60.) * 15.));

    var hourRad = MathNew.deg2rad(stellarTimeLocalDeg - alfa);
    var deltaRad = MathNew.deg2rad(delta);
    var latitudeRad = MathNew.deg2rad(lat);

    //atsimuutti x ja y komponentit
    var Ay = Math.sin(hourRad) * Math.cos(deltaRad);
    var Ax = Math.cos(hourRad) * Math.cos(deltaRad) * Math.sin(latitudeRad) - Math.sin(deltaRad) * Math.cos(latitudeRad);
    
    //nämä ovat testausta varten
    //this.jul = julian;
    //this.T = T;
    //this.Lo = Lo;
    //this.M = M;
    //this.C = C;
    //this.x = x;
    //this.y = y;
    //this.deltaSun = delta;
    //this.alfaSun = alfa;
    //this.Ax = Ax;
    //this.Ay = Ay;
    
    /*korkeimmillaan, eli etelässä*/
    this.stellarTimeMidDay = stellarTimeNoon;
    this.currentSunAzimuth = Math.round(10 * MathNew.minDegree(MathNew.trueTan(Ay, Ax) + 180.)) / 10;
    //this.azimth_NSEW = NorthSouthEastWest(currentSunAzimuth);
    this.currentSunElevation = Math.round(10 * MathNew.rad2deg(Math.asin(Math.sin(deltaRad) * Math.sin(latitudeRad) + Math.cos(hourRad) * Math.cos(deltaRad) * Math.cos(latitudeRad)))) / 10;
    this.maxSunElevation = Math.round(10 * MathNew.trueElevation(90.0 + delta - lat)) / 10;
    this.timeSunSouth = MathNew.minDegree(alfa - stellarTimeNoon) * 24. / 360.;
}

var MathNew = {
    deg2rad: function (deg) {
        return deg * (Math.PI) / 180;
    },

    rad2deg: function (rad) {
        return rad * 180 / (Math.PI);
    },

    minHour: function (hour) {
        if (hour >= 24) {
            return hour - 24;
        }
        else if (hour < 0) {
            return hour + 24;
        }
    },

    minDegree: function (min) {
        while (min >= 360.) {
            min = min - 360.;
        }
        while (min < 0.) {
            min = min + 360.;
        }
        return min;
    },

    trueTan: function (y, x) {
        var alfa = Math.atan(y / x) * 180 / (Math.PI);
        //if (y >= 0 & x > 0)
        //alfa = y/x;
        if (y >= 0 && x < 0)
            alfa = alfa + 180;
        else if (y < 0 && x > 0)
            alfa = alfa + 360;
        else if (y < 0 && x < 0)
            alfa = alfa + 180;
        return alfa;
    },

    /* (-90 to 90) degrees Metodi*/
    trueElevation: function (trueDeg) {
        while (trueDeg > 90)
            trueDeg = 180 - trueDeg;
        while (trueDeg < -90)
            trueDeg = 180 + trueDeg;
        return trueDeg;
    }
};

// Metodi deg => ESNW
function NorthSouthEastWest(atsimuutti) {
    suunta = " ";
    if ((atsimuutti >= (180. - 11.25)) && (atsimuutti < (180. + 11.25))) {
        suunta = suunta + "S";
    }
    else if ((atsimuutti >= (157.5 - 11.25)) && (atsimuutti < (157.5 + 11.25))) {
        suunta = suunta + "SSE";
    }
    else if ((atsimuutti >= (135 - 11.25)) && (atsimuutti < (135 + 11.25))) {
        suunta = suunta + "SE";
    }
    else if ((atsimuutti >= (112.5 - 11.25)) && (atsimuutti < (112.5 + 11.25))) {
        suunta = suunta + "ESE";
    }
    else if ((atsimuutti >= (90 - 11.25)) && (atsimuutti < (90 + 11.25))) {
        suunta = suunta + "E";
    }
    else if ((atsimuutti >= (67.5 - 11.25)) && (atsimuutti < (67.5 + 11.25))) {
        suunta = suunta + "ENE";
    }
    else if ((atsimuutti >= (45 - 11.25)) && (atsimuutti < (45 + 11.25))) {
        suunta = suunta + "NE";
    }
    else if ((atsimuutti >= (22.5 - 11.25)) && (atsimuutti < (22.5 + 11.25))) {
        suunta = suunta + "NNE";
    }
    else if ((atsimuutti >= (360 - 11.25)) || (atsimuutti < 11.25)) {
        suunta = suunta + "N";
    }
    else if ((atsimuutti >= (337.5 - 11.25)) && (atsimuutti < (337.5 + 11.25))) {
        suunta = suunta + "NNW";
    }
    else if ((atsimuutti >= (315 - 11.25)) && (atsimuutti < (315 + 11.25))) {
        suunta = suunta + "NW";
    }
    else if ((atsimuutti >= (292.5 - 11.25)) && (atsimuutti < (292.5 + 11.25))) {
        suunta = suunta + "WNW";
    }
    else if ((atsimuutti >= (270 - 11.25)) && (atsimuutti < (270 + 11.25))) {
        suunta = suunta + "W";
    }
    else if ((atsimuutti >= (247.5 - 11.25)) && (atsimuutti < (247.5 + 11.25))) {
        suunta = suunta + "WSW";
    }
    else if ((atsimuutti >= (225 - 11.25)) && (atsimuutti < (225 + 11.25))) {
        suunta = suunta + "SW";
    }
    else if ((atsimuutti >= (202.5 - 11.25)) && (atsimuutti < (202.5 + 11.25))) {
        suunta = suunta + "SSW";
    }
    return suunta;
}