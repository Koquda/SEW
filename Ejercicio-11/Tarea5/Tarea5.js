"use strict";

class DinamicMap {

    initMap() {
        let posicion = { lat: 50.09867664535487, lng: 14.46888353267204 };
        let mapa = new google.maps.Map($("article")[0],
            {
                zoom: 15,
                center: posicion,
            });

        let marcador = new google.maps.Marker({ position: posicion, map: mapa });

        let panel = new google.maps.InfoWindow;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                panel.setPosition(pos);
                panel.setContent("Localizacion encontrada");
                panel.open(mapa);
                mapa.setCenter(pos);
            }, function() {
                handleLocationError(true, panel, mapa.getCenter());
            });
        } else {
            // Browser does not support geolocation
            handleLocationError(false, panel, mapa.getCenter());
        }
    }

    handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPostiion(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: Ha fallado la geolocalizacion' :
            'Error: Su navegador no soporta geolocalizacion');
        infoWindow.open(mapa);
    }

}
var dinamicMap = new DinamicMap();
