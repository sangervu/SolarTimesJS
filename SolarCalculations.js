
// tällä funktiolla lasketaan aurinkoon liittyviä suureita kuten UVI ja säteilyteho, jotka ovat riippuvaisia auringon elevaatiosta taivaalla
// by Sakari Angervuori 8.4.2020

function SolarCalculations(deltaSun, lat, currentSunElevation, maxSunElevation, timeSunSouth) {

    /******** Solar UVI calculation**********/
    
    //double uvIndexOverTwoRad = Math.toRadians(90.0 - 55.0); //degrees in Sun elevation, UV
    var uvIndexOverThreeRad = toRadians(90.0 - 48.0); //degrees in Sun elevation, UV
    var latitudeRad = toRadians(lat);
    var currentSunElevationRad = toRadians(currentSunElevation);
    var deltaSunRad = toRadians(deltaSun);
    var maxSunElevationRad = toRadians(maxSunElevation);
    var warningText;
    var uvIndexEnd;
    
    var a = 2.696056, b = 5.474571, c = -0.09888, d = 0.040392;
    var m = 1. / Math.cos(Math.asin(6371. / 6393. * Math.sin((Math.PI / 2 - currentSunElevationRad))));

    var uvIndex = Math.round(10 * Math.pow(Math.cos(Math.PI / 2 - currentSunElevationRad), a) * Math.exp(b + c * m + d * m * m) / 25.) / 10;
    if (isNaN(uvIndex)) {
        uvIndex = 0;
    }

    var mMax = 1. / Math.cos(Math.asin(6371. / 6393. * Math.sin((Math.PI / 2 - maxSunElevationRad))));
    var uvIndexMax = Math.round(10 * Math.pow(Math.cos(Math.PI / 2 - maxSunElevationRad), a) * Math.exp(b + c * mMax + d * mMax * mMax) / 25.) / 10;
    var uvIndexOverThree = 2 * Math.acos(-Math.tan(deltaSunRad) * Math.tan(latitudeRad) + Math.sin(uvIndexOverThreeRad) / (Math.cos(deltaSunRad) * Math.cos(latitudeRad))) / (2 * Math.PI) * 24;
    if (isNaN(uvIndexOverThree)) {
        uvIndexOverThree = 0;
    }

    if (isNaN(uvIndex) || uvIndexOverThree === 0) {
        uvIndexEnd = 0;
    } else {
        uvIndexEnd = timeSunSouth + uvIndexOverThree / 2;
    }
    
    //TimeFormat timeUvi = new TimeFormat(uvIndexEnd);
    //this.UvIndexEndString = (TimeFormat.hourTimeString) + ":" + (TimeFormat.minuteTimeString);

    if (uvIndex >= 10) {
        //setBgColorById ("rgb(153,140,255)");
        warningText = "PYSY POIS AURINGOSTA!";
    }
    if (uvIndex < 10 && uvIndex >= 9.0) {
        //setBgColorById ("rgb(181,76,255)");
        warningText = "PYSY POIS AURINGOSTA!";
    }
    if (uvIndex >= 8.0 && uvIndex < 9.0) {
        //setBgColorById ("rgb(255,0,153)");
        warningText = "PYSY POIS AURINGOSTA!";
    }
    if (uvIndex >= 7.0 && uvIndex < 8.0) {
        //setBgColorById ("rgb(216,0,29)");
        warningText = "5 min MAX AURINGOSSA!";
    }
    if (uvIndex >= 6.0 && uvIndex < 7.0) {
        //setBgColorById ("rgb(232,44,14)");
        warningText = "15 min MAX AURINGOSSA!";
    }
    if (uvIndex >= 5.0 && uvIndex < 6.0) {
        //setBgColorById ("rgb(248,89,0)");
        warningText = "Varo UV säteilyä!";
    }
    if (uvIndex >= 4.0 & uvIndex < 5.0) {
        //setBgColorById ("rgb(248,135,0)");
        warningText = "Suuri riski UV säteilystä";
    }
    if (uvIndex >= 3.0 && uvIndex < 4.0) {
        //setBgColorById ("rgb(248,182,0)");
        warningText = "Riski UV säteilystä";
    }
    if (uvIndex >= 2.0 && uvIndex < 3.0) {
        //setBgColorById ("rgb(160,206,0)");
        warningText = "Pieni riski UV säteilystä";
    }
    if (uvIndex >= 1.0 && uvIndex < 2.0) {
        //setBgColorById ("rgb(78,180,0)");
        warningText = "Vähäinen riski UV säteilystä";
    }
    if (uvIndex >= 0 && uvIndex < 1.0) {
        //setBgColorById ("rgb(190,190,190)");
        warningText = "Ei vaaraa UV säteilystä";
    }

     /******** Solar power calculation**********/
     
    var maxSunElevationAnnum;
    var maxSolarPowerDiem;
    
    if (lat < 23.5 && lat > -23.5) {
        maxSunElevationAnnum = 90.;
    } else if (lat > 23.5) {
        maxSunElevationAnnum = 90 - lat + 23.5;
    } else {
        maxSunElevationAnnum = 90 + lat + 23.5;
    }

    var maxSunElevationAnnumRad = toRadians(maxSunElevationAnnum); //max Sun elevation in Rad
    var maxSunElevationDiemRad = toRadians(maxSunElevation);
    var maxSolarPowerAnnum = Math.round(10 * 1350.0 * Math.sin(maxSunElevationAnnumRad) * Math.pow(0.78, (1 / Math.sin(maxSunElevationAnnumRad)))) / 10;

    // Maximun solar power per current day
    var solarPower = Math.round(10 * 1350.0 * Math.sin(maxSunElevationDiemRad) * Math.pow(0.78, (1 / Math.sin(maxSunElevationDiemRad)))) / 10;
    if (solarPower < 0) {
        maxSolarPowerDiem = 0;
    }

    // Current solar power
    var currentSunElevationRad = toRadians(currentSunElevation);
    var currentSolarPower = Math.round(10 * 1350.0 * Math.sin(currentSunElevationRad) * Math.pow(0.78, (1 / Math.sin(currentSunElevationRad)))) / 10;
    if (currentSolarPower < 0) {
        currentSolarPower = 0;
    }
    
    this.WarningText = warningText;
    this.UvIndex = uvIndex;
    this.UvIndexMax = uvIndexMax;
    this.UvIndexOverThree = uvIndexOverThree;
    this.UvIndexEnd = uvIndexEnd;
    this.UvIndexEndString;
    this.SolarPowerAnnualMax = maxSolarPowerAnnum;
    this.SolarPowerDiemMax = maxSolarPowerDiem;
    this.SolarPowerCurrent = currentSolarPower;
}

function toRadians(degree) {

    var radian = degree * 2 * Math.PI / 180;
    return radian;
}

function toDegrees(radians) {

    var degrees = radians * 180 / (2 * Math.PI);
    return degrees;
}