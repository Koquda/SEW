"use strict";

class Geolocation {

    constructor() {
        this.location = null;
    }

    getPos() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition);
        } else {
            var section = document.createElement("section");
            $("button").after(section);
            section.innerHTML = "El navegador que está usando no soporta Geolocapzación.";
        }
    }

    showPosition(position) {
        var section = document.createElement("section");
        section.innerHTML = "<h2> Estas en ... </h2>";
        $("button").after(section);

        var text = "<p> Latitud: " + position.coords.latitude + "</p>"
        text += "<p> Longitud: " + position.coords.longitude + "</p>"
        text += "<p> Precisión de la longitud y latitud: " + position.coords.accuracy + "</p>";
        if (position.coords.altitude != null) {
            text += "<p> Altitud: " + position.coords.altitude + "</p>";
            text += "<p> Precisión de la altitud: " + position.coords.altitudeAccuracy + "</p>";
        } else {
            text += "<p> No se ha podido obtener la altitud </p>";
        }
        
        if (position.coords.heading != null) {
            text += "<p> Dirección: " + position.coords.heading + "</p>";
        } else {
            text += "<p> No se ha podido obtener la dirección </p>";
        }

        if (position.coords.speed != null) {
            text += "<p> Velocidad: " + position.coords.speed + "</p>";
        } else {
            text += "<p> No se ha podido obtener la velocidad </p>";
        }

        $("section").append(text);


    }
}

var geolocation = new Geolocation();