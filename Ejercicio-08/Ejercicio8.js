"use strict";

class Ejercicio8 {

    constructor() {
        this.lugares = ['Avilés', 'Vigo', 'Valencia', 'Jaén', 'León'];

        this.url = 'https://api.openweathermap.org/data/2.5/weather?q=';
        this.datos = [];
    }

    cargarDatos() {
        for (let i = 0; i < this.lugares.length; i++) {
            this.obtenerDatos(this.lugares[i]);
        }
        $("button").attr("disabled", "disabled");
    }

    obtenerDatos(lugar) {
        var section = document.createElement("section");
        $("button").after(section);
        let url = this.url + lugar + ', ES&units=metric&lang=es&APPID=bec0832374cee309477e3a6d5e5bef94';

        $.ajax({
            dataType: "json",
            url: url,
            method: 'GET',
            success: (datos) => {
                var datosMeteorologicos = "<h2>" + datos.name + "</h2>";
                datosMeteorologicos += "<p>Ciudad: " + datos.name + "</p>";
                datosMeteorologicos += "<p>País: " + datos.sys.country + "</p>";
                datosMeteorologicos += "<p>Latitud: " + datos.coord.lat + " grados</p>";
                datosMeteorologicos += "<p>Longitud: " + datos.coord.lon + " grados</p>";
                datosMeteorologicos += "<p>Temperatura: " + datos.main.temp + "ºC</p>";
                datosMeteorologicos += "<p>Temperatura máxima: " + datos.main.temp_max + "ºC</p>";
                datosMeteorologicos += "<p>Temperatura mínima: " + datos.main.temp_min + "ºC</p>";
                datosMeteorologicos += "<p>Presión: " + datos.main.pressure + " mipbares</p>";
                datosMeteorologicos += "<p>Humedad: " + datos.main.humidity + " %</p>";
                datosMeteorologicos += "<p>Amanece a las: " + new Date(datos.sys.sunrise * 1000).toLocaleTimeString() + "</p>";
                datosMeteorologicos += "<p>Oscurece a las: " + new Date(datos.sys.sunset * 1000).toLocaleTimeString() + "</p>";
                datosMeteorologicos += "<p>Dirección del viento: " + datos.wind.deg + " grados</p>";
                datosMeteorologicos += "<p>Velocidad del viento: " + datos.wind.speed + " metros/segundo</p>";
                datosMeteorologicos += "<p>Hora de la medida: " + new Date(datos.dt * 1000).toLocaleTimeString() + "</p>";
                datosMeteorologicos += "<p>Fecha de la medida: " + new Date(datos.dt * 1000).toLocaleDateString() + "</p>";
                datosMeteorologicos += "<p>Nubosidad: " + datos.clouds.all + " %</p>";

                section.innerHTML = datosMeteorologicos;
            },
            error: function() {
                alert("<h2>¡problemas! No puedo obtener información de <a href='http://openweathermap.org'>OpenWeatherMap</a></h2>");
            }
        });
    }

}

let objeto = new Ejercicio8();
