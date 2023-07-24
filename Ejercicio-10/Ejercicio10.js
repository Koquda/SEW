"use strict";

class Ejercicio10 {


    constructor() {
        this.apiKey = '8bljnkt1cab0gl2s9jl18tpxtc6hu0k5p9hwj9b9f60r172x3j89mpjh61oe';
        this.url = 'https://commodities-api.com/api/latest?access_key=' + this.apiKey + '&base=EUR&symbols=WTIOIL';
    }

    cargarDatos(conversion, moneda) {
        var section = $("section");
        section.html("");

        $.ajax({
            dataType: "json",
            url: this.url,
            method: 'GET',
            success: function(datos) {
                var datosRequest = "<h2>" + "Precio del petroleo por barril en " + moneda + "</h2>";
                datosRequest += "<h3>" + (datos.data.rates.WTIOIL * conversion) + "</h3>";

                section.html(datosRequest);
            },
            error: function() {
                document.write("<h2>¡problemas! No puedo obtener información de <a href='http://openweathermap.org'>OpenWeatherMap</a></h2>");
            }
        });
    }

    enEuros() {
        this.cargarDatos(1, "€");
    }

    enYuanes() {
        this.cargarDatos(7, 41, "CNY");
    }

    enDolares() {
        this.cargarDatos(1.03, "$");
    }

    enRupias() {
        this.cargarDatos(84, 46, "IRN");
    }
}

let objeto = new Ejercicio10();
