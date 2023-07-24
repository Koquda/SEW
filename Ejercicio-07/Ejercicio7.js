"use strict"

class Ejercicio7 {

    ocultarh() {
        $('h1').hide();
        $('h2').hide();
        $('h3').hide();
    }

    mostrarh() {
        $('h1').show();
        $('h2').show();
        $('h3').show();
    }

    // Modificar elemento del html
    showToEdit() {
        $("section").show();
    }

    modificarh1() {
        let text = $("textarea").val();
        $("h1").text(text);
        $("section").hide();
    }

    // Añadir elementos al html
    añadirElemento() {
        $("main").html($("main").html() + '<p>Esto es un párrao añadido dinamicamente</p>');
    }

    // Eliminar elementos al html
    eliminarElemento() {
        $("p:first").remove();
    }


    // Recorrer los elementos del documento
    recorrerElementos() {
        $("*").each(function () {
            var parent;
            if ($(this).parent().get(0) == undefined) {
                parent = "NONE";
            } else {
                parent = $(this).parent().get(0).tagName;
            }
            $("main").html($("main").html() + "<p>Padre: " + parent + " --  elemento: " + $(this).get(0).tagName + "</p>\n");
        });
    }


    // Sumar filas y columnas de la tabla
    sumarTabla() {
        let total = 0;
        let rowValue = 0;

        $("tr:first th").each(function () {
            rowValue += parseInt($(this).text());
        });
        $("tr:first").append('<th>' + rowValue + '</th>');

        rowValue = 0;
        $("tr:odd td").each(function () {
            rowValue += parseInt($(this).text());
        });
        $("tr:odd").append('<td>' + rowValue + '</td>');


        rowValue = 0;
        $("tr:last td").each(function () {
            rowValue += parseInt($(this).text());
        });
        $("tr:last").append('<td>' + rowValue + '</td>');

        let columnOne = 0;
        let columnTwo = 0;
        let columnThree = 0;
        $("tr").each(function () {
            columnOne += parseInt($(this).children().eq(0).text());
            columnTwo += parseInt($(this).children().eq(1).text());
            columnThree += parseInt($(this).children().eq(2).text());
        });
        total += columnOne;
        total += columnTwo;
        total += columnThree;

        $("table").append('<tr><td>' + columnOne + '</td></tr>');
        $("tr:last").append('<td>' + columnTwo + '</td>');
        $("tr:last").append('<td>' + columnThree + '</td>');
        $("tr:last").append('<td>' + total + '</td>');

        $("button").eq(6).attr("disabled", "disabled");

    }
}

let ejercicio = new Ejercicio7();