function myFunction(){

var lat = 60.2;
var lon = 24.9;
var timeZone = 3;
var year = 2020;
var month = 4;
var day = 14;
var k = 0; // 0.5
var hour = 13;
var minute = 50;

var pos = new CellestialSolarPosition(lat, lon, timeZone, year, month, day, k, hour, minute);

var deltaSun = pos.deltaSun;
var alfaSun = pos.alfaSun;

var stellarTimeNoon = pos.stellarTimeMidDay;
var currentSunElevation = pos.currentSunElevation;
var maxSunElevation = pos.maxSunElevation;
var timeSunSouth = pos.timeSunSouth;
var currentSunAzimuth = pos.currentSunAzimuth;

var sol = new SolarCalculations(deltaSun, lat, currentSunElevation, maxSunElevation, timeSunSouth);
var trans = new CellestialSolarTransitions(alfaSun, deltaSun, lat, stellarTimeNoon);

document.getElementById("demo1").innerHTML = sol.uvIndex;
document.getElementById("demo2").innerHTML = stellarTimeNoon;
document.getElementById("demo3").innerHTML = currentSunElevation;
document.getElementById("demo4").innerHTML = maxSunElevation;
document.getElementById("demo5").innerHTML = currentSunAzimuth;
document.getElementById("demo6").innerHTML = trans.timeSouth;
document.getElementById("demo7").innerHTML = trans.timeRizeTrue;
document.getElementById("demo8").innerHTML = trans.timeSouthTrue;
document.getElementById("demo9").innerHTML = trans.timeSetTrue;
//document.getElementById("demo2").innerHTML = pos.T;



}