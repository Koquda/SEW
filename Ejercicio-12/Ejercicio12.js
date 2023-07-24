"use strict";


class Reader {

    checkNavegador() {
        if (!(window.File && window.FileReader && window.FileList && window.Blob))
            document.querySelector("body").append("<p>¡¡¡ Este navegador NO soporta el API File y este programa puede no funcionar correctamente !!!</p>");


    }

    datosArchivo(files) {
        var section = document.createElement("section");

        for (let i = 0; i < files.length; i++) {

            var file = files[i];

            var lista = document.createElement("ul");

            var fileData = "<li>Datos del archivo " + (i + 1) + ":<ul>";
            fileData += "<li>Nombre: " + file.name + "</li>";
            fileData += "<li>Tamaño: " + file.size + " bytes</li>";
            fileData += "<li>Tipo: " + file.type + "</li>";
            fileData += "<li>Fecha de la última modificación: " + file.lastModifiedDate + "</li>";
            fileData += "</ul></li>";
            lista.innerHTML += fileData;


            // Tipos de archivo que admite
            const tipoTexto = /text.*/;
            const tipoJSON = /application.json/;
            const tipoXML = /application.xml/;

            var fileContent = document.createElement("pre");
            if (file.type.match(this.tipoTexto) || file.type.match(this.tipoJSON) || file.type.match(this.tipoXML)) {
                var lector = new FileReader();
                lector.onload = function(evento) {
                    fileContent.innerText = lector.result;
                }
                lector.readAsText(file);
            } else {
                alert("Error: documento no valido");
            }


            section.append(lista);
            section.append(fileContent);

            document.querySelector("body").append(section);

        }
    }


}


let fileReader = new Reader();
