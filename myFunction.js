function myFunction(){

var lat = 60.2;
var lon = 24.9;
var timeZone = 3;
var year = 2020;
var month = 4;
var day = 13;
var k = 0; // 0.5
var hour = 19;
var minute = 08;

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

document.getElementById("demo1").innerHTML = sol.UvIndex;
document.getElementById("demo2").innerHTML = sol.UvIndexMax;
document.getElementById("demo3").innerHTML = stellarTimeNoon;
document.getElementById("demo4").innerHTML = currentSunElevation;
document.getElementById("demo5").innerHTML = maxSunElevation;
document.getElementById("demo6").innerHTML = currentSunAzimuth;
document.getElementById("demo7").innerHTML = timeSunSouth;
document.getElementById("demo8").innerHTML = pos.Ax;
document.getElementById("demo9").innerHTML = pos.Ay;
//document.getElementById("demo1").innerHTML = pos.jul;
//document.getElementById("demo2").innerHTML = pos.T;



}