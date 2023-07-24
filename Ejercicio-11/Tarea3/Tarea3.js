"use strict";

class Geolocation {

    constructor() {
        this.location = null;
    }


    getPos() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition, this.checkError);
        } else {
            var section = document.createElement("section");
            $("button").after(section);
            section.innerHTML = "El navegador que está usando no soporta Geolocapzación.";
        }
    }


    checkError(error) {
        var section = document.createElement("section");
        $("button").after(section);
        let mensaje = "";
        switch (error.code) {
            case error.PERMISSION_DENIED:
                mensaje = "El usuario no ha permitido el acceso a la posición del dispositivo.";
                break;
            case error.POSITION_UNAVAILABLE:
                mensaje = "La información de la posición no está disponible.";
                break;
            case error.TIMEOUT:
                mensaje = "El servicio ha tardado demasiado tiempo en responder.";
                break;
            case error.UNKNOWN_ERROR:
                mensaje = "Se ha producido un error desconocido.";
                break;
        }
        section.innerHTML = "<p>" + mensaje + "</p>";
    }

    showPosition(position) {
        var section = document.createElement("section");
        section.innerHTML = "<h2> Estas en ... </h2>";
        $("body").append(section);

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

    getMap() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showMap, this.checkError);
        } else {
            var section = document.createElement("section");
            $("button").after(section);
            section.innerHTML = "El navegador que está usando no soporta Geolocapzación.";
        }
    }

    showMap(position) {
        var latitud = position.coords.latitude;
        var longitud = position.coords.longitude;

        var section = document.createElement("section");
        var apiKey = "&key=AIzaSyCI15scPRe6zX3qYtk3xJRLLZLS0m1lOVY";
        var url = "https://maps.googleapis.com/maps/api/staticmap?";
        var centro = "center=" + latitud + "," + longitud;
        var zoom = "&zoom=15";
        var tamaño = "&size=800x600";
        var marcador = "&markers=color:red%7Clabel:S%7C" + latitud + "," + longitud;
        var sensor = "&sensor=false";

        var imagenMapa = url + centro + zoom + tamaño + marcador + sensor + apiKey;
        section.innerHTML = "<img src='" + imagenMapa + "' alt='mapa estático google' />";

        $("body").append(section);
    }


}

var geolocation = new Geolocation();
