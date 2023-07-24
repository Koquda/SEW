"use strict";

class DinamicMap {

    initMap() {
        let posicion = { lat: 50.09867664535487, lng: 14.46888353267204};
        let mapa = new google.maps.Map($("article")[0],
            {
                zoom: 15,
                center: posicion,
            });

        let marcador = new google.maps.Marker({ position: posicion, map: mapa });
    }
}

var dinamicMap = new DinamicMap();
