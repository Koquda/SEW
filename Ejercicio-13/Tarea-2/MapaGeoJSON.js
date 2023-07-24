"use strict";

class MapaGeoJSON {

    initMap(files) {
        let file = files[0];

        if (file.name.match(/.GeoJSON/)) {

            let posicion = { lat: 40.425792018827515, lng: -3.7042805444364397 };
            let mapa = new google.maps.Map($("section")[0],
                {
                    zoom: 5,
                    center: posicion,
                });

            let infoWindow = new google.maps.InfoWindow();

            let lector = new FileReader();
            lector.onload = function() {
                mapa.data.addGeoJson(JSON.parse(lector.result));
            };
            lector.readAsText(file);


            mapa.data.addListener("click", function(event) {
                infoWindow.setPosition(event.feature.getGeometry().get());
                infoWindow.setContent(event.feature.getProperty("name"));
                infoWindow.open(mapa);
            });

        } else {
            alert("El archivo no esta en el formato GeoJSON");
        }
    }
}


let mapa = new MapaGeoJSON();
