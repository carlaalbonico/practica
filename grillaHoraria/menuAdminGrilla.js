addEventListener("load", load)

var miBackEnd = 'http://localhost:555/';
var clases = [];

function $(nombre) {
    return document.getElementById(nombre);
}

function load() {
   
   


    traerClases(miBackEnd + 'Clases', verClases);

}





function verClases(respuesta){

    clases = JSON.parse(respuesta); 
   
    
}

function mostrarHorario(dia){

    var horarios = [];

    clases.forEach(clase => {
        
        if(clase.dias == dia){
            horarios.push(clase);
        }
    });

    var opciones=[];

    horarios.forEach(clase => {
        opciones.push(
            '<div class="col-sm-6">' +
                '<div class="card">' +
                    '<div class="row">' +
                        '<div class="col-4">' +
                            '<h5 class="card-title">' + clase.horaDeInicio + 'HS' + '</h5>' +
                        '</div>' +
                        '<div class="col-8">' +
                            '<h5 class="card-title">' + clase.nombre + '</h5>' +
                            '<p class="card-text">' + clase.profesor + '</p>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>'
        );
    });

    $('grillaHorarios').innerHTML = opciones.join('');
}

function traerClases(servidor, funcionARealizar) {

    var xmlhttp = new XMLHttpRequest();
    
    xmlhttp.open("GET", servidor, true);
    
    xmlhttp.onreadystatechange = function () {
        
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            
            if (xmlhttp.status == 200) {                
                funcionARealizar(xmlhttp.responseText);

            } else {
                alert("ocurrio un error");
            }
        }
    }
    
    xmlhttp.send();
}