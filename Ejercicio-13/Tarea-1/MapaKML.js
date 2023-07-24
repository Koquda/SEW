"use strict";

class MapaKML {

    initMap() {

        let posicion = { lat: 40.425792018827515, lng: -3.7042805444364397 };
        let mapa = new google.maps.Map($("section")[0],
            {
                zoom: 5,
                center: posicion,
            });

        for (let place of this.places) {
            let posicion = place.toString().split(",");
            let pos = { lat: Number(posicion[1]), lng: Number(posicion[0]) };

            new google.maps.Marker({
                map: mapa,
                position: pos
            });
        }
    }


    cargar(files) {
        let file = files[0];
        let kmlFile = /.kml/;

        if (file.name.match(kmlFile)) {
            let lector = new FileReader();
            lector.onload = (event) => {
                this.process(lector.result);
            };
            lector.readAsText(file);
        } else {
            alert("El archivo no tiene la extensión .kml");
        }
    }

    process(result) {
        let locations = new Array();

        let coords = new DOMParser().parseFromString(result, "text/xml").getElementsByTagName("coordinates");

        for (let element of coords) {
            locations.push(element.innerHTML.trim());

        }

        this.places = locations.map(x => x.split(" "));

        this.initMap();

    }


}

let mapa = new MapaKML();
