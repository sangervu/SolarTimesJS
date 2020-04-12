function myFunction(){

var lat = 60;
var lon = 20;
var timeZone = -2;
var year = 2020;
var month = 6;
var day = 2;
var hour = 12;
var minute = 0;

var pos = new CellestialSolarPosition(lat, lon, timeZone, year, month, day, hour, minute);

var deltaSun = pos.deltaSun;
var alfaSun = pos.alfaSun;
var stellarTimeNoon = pos.stellarTimeMidDay;
var currentSunElevation = pos.currentSunElevation;
var maxSunElevation = pos.maxSunElevation;
var timeSunSouth = pos.timeSunSouth;

var trans = new CellestialSolarTransitions(alfaSun, deltaSun, lat, stellarTimeNoon);

var sol = new SolarCalculations(deltaSun, lat, currentSunElevation, maxSunElevation, timeSunSouth);
    
document.getElementById("demo1").innerHTML = deltaSun;
document.getElementById("demo2").innerHTML = alfaSun;
document.getElementById("demo3").innerHTML = trans.timeSouthTrue;
document.getElementById("demo4").innerHTML = trans.timeSouthTrue;
document.getElementById("demo5").innerHTML = trans.timeSouthTrue;
document.getElementById("demo6").innerHTML = trans.timeSouthTrue;

}