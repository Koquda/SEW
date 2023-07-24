"use strict";

class DinamicMap {

    initMap() {

        let posicion = { lat: 50.09867664535487, lng: 14.46888353267204 };
        let mapa = new google.maps.Map($("article")[0],
            {
                zoom: 15,
                center: posicion,
            });

        let marcador = new google.maps.Marker({ position: posicion, map: this.mapa });

        let panel = new google.maps.InfoWindow;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                panel.setPosition(pos);
                panel.setContent("Localización actual encontrada");
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

    searchPlace() {
        let nombreLugar = $("input")[0].value;

        let urlSinDatos = "https://maps.googleapis.com/maps/api/geocode/json?address=";
        let apiKey = "&key=AIzaSyCI15scPRe6zX3qYtk3xJRLLZLS0m1lOVY";

        let url = urlSinDatos + nombreLugar + apiKey;
        $.ajax({
            dataType: "json",
            url: url,
            method: 'GET',
            success: function(datos) {
                // Eliminar el mapa actual
                $("article")[0].innerHTML = "";

                // Creamos el mapa
                let posicion = datos.results[0].geometry.location;
                let mapa = new google.maps.Map($("article")[0],
                    {
                        zoom: 15,
                        center: posicion,
                    });

                // Creamos la infoWindow
                let panel = new google.maps.InfoWindow;
                panel.setPosition(posicion);
                panel.setContent("Localización encontrada");
                panel.open(mapa);
                mapa.setCenter(posicion);

            },
            error: function() {
                alert("¡Problemas! La dirección que ha ingresado no existe o no se ha podido encontrar");
            }
        });
    }


}
var dinamicMap = new DinamicMap();
