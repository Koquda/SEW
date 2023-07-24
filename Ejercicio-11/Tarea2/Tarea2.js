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
        let mensaje  = "";
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