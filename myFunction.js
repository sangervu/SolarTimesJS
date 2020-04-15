function myFunction(){

// tämä funktio käynnistää ohjelman (html pääsivulla on onload="myFunction()" event handler

// nämä parametrit tarvitaan kun tehdään objekti "CellestialSolarPosition" luokasta (funktiosta).
// Nämä arvot on tässä kovakoodattu, mutta ne kannattaa generoida Date() JS objektilla
var lat = 60.2;
var lon = 24.9;
var timeZone = 3;
var year = 2020;
var month = 4;
var day = 15;
var k = 0; // 0.5
var hour = 08;
var minute = 50;

//tehdään objekti CellestialSolarPosition-funktiosta (luokasta) new komennolla. Syötetyt parametrit pitää olla oikeita reaalimaailman lukuja.
var pos = new CellestialSolarPosition(lat, lon, timeZone, year, month, day, k, hour, minute);

// nämä parametrit tarvitaan kun tehdään objektit "SolarCalculations" ja "CellestialSolarTransitions" luokista (funktioista)
var deltaSun = pos.deltaSun;
var alfaSun = pos.alfaSun;
var stellarTimeNoon = pos.stellarTimeMidDay;
var currentSunElevation = pos.currentSunElevation;
var maxSunElevation = pos.maxSunElevation;
var timeSunSouth = pos.timeSunSouth;
var currentSunAzimuth = pos.azimuth_NSEW;

//tehdään objektit new komennolla. Syötetyt parametrit pitää olla oikeita reaalimaailman lukuja. 
var sol = new SolarCalculations(deltaSun, lat, currentSunElevation, maxSunElevation, timeSunSouth);
var trans = new CellestialSolarTransitions(alfaSun, deltaSun, lat, stellarTimeNoon);

//näitä tulosteita on käytetty testaamiseen (nämä edelleen lasketaan funktion sisällä, mutta nämä ovat välilaskutoimituksia)
//document.getElementById("demo6").innerHTML = "julian = " + pos.jul;
//document.getElementById("demo7").innerHTML = "T = " + pos.T;
//document.getElementById("demo8").innerHTML = "x = " + pos.y;
//document.getElementById("demo1").innerHTML = deltaSun;
//document.getElementById("demo2").innerHTML = alfaSun;
//document.getElementById("demo3").innerHTML = stellarTimeNoon;

//Auringon paikkaan liittyvät tulosteet
document.getElementById("demo1").innerHTML = "current sun elevation = " + currentSunElevation;
document.getElementById("demo2").innerHTML = "max sun elevation = " + maxSunElevation;
document.getElementById("demo3").innerHTML = "current sun azimuth = " + currentSunAzimuth;

//UVI säteilyyn liittyvät tulosteet
document.getElementById("demo4").innerHTML = "UVI current = " + sol.uvIndex;
document.getElementById("demo5").innerHTML = "UVI max = " + sol.UvIndexMax;
document.getElementById("demo6").innerHTML = "UVI warning = " + sol.WarningText;

//Auringon säteilytrehoon liittyvät tulosteet
document.getElementById("demo6").innerHTML = "current solar power W/m2 = " + sol.SolarPowerCurrent;
document.getElementById("demo7").innerHTML = "max solar power per diem W/m2 = " + sol.SolarPowerDiemMax;
document.getElementById("demo8").innerHTML = "max solar power per annum W/m2 = " + sol.SolarPowerAnnumMax;

//Auringon nousu- ja laskuaikoihin liittvät tulosteet
document.getElementById("demo9").innerHTML = "sun rize = " + trans.timeRizeTrue;
document.getElementById("demo10").innerHTML = "sun south = " + trans.timeSouthTrue;
document.getElementById("demo11").innerHTML = "sun set = " + trans.timeSetTrue;
document.getElementById("demo12").innerHTML = "sun set nocturnal = " + trans.timeSetNocturn;
document.getElementById("demo13").innerHTML = "sun set dark = " + trans.timeSetDark;
}