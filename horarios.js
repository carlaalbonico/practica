addEventListener("load", load)

var miBackEnd = 'http://localhost:555/';
var clases = [];

function $(nombre) {
    return document.getElementById(nombre);
}

function load() {
    document.getElementById("logIn").addEventListener("click",registrar);
    document.getElementById("home").addEventListener("click",home);
    document.getElementById("activities").addEventListener("click",activities);
    document.getElementById("schedule").addEventListener("click",schedule);
    document.getElementById("contact").addEventListener("click",contact);
   


    traerClases(miBackEnd + 'Clase', verClases);

}



function registrar(){
    window.location.assign("http://localhost/practica/login.html");
    
}
function home(){
    window.location.assign("http://localhost/practica/index.html");
}
function activities(){
   
    window.location.assign("http://localhost/practica/actividades.html");
}
function schedule(){
    window.location.assign("http://localhost/practica/horarios.html");
}
function contact(){
    window.location.assign("http://localhost/practica/contacto.html");
}

function verClases(respuesta){

    clases = JSON.parse(respuesta); 
    mostrarHorario('Lunes'); 
    // $('btnlunes').click();
}

function mostrarHorario(dia){

    var horarios = [];

    clases.forEach(clase => {
        
        if(clase.dias == dia){
            horarios.push(clase);
        }
    });
    horarios.sort((a,b)=>a.horaDeInicio.localeCompare(b.horaDeInicio));
    var opciones=[];
    if(horarios.length === 0){
        
        opciones.push( '<div class=" d-flex justify-content-center">no hay clases habilitadas en este salon.</div>');
    }
    

    horarios.forEach(clase => {
        opciones.push(
            '<div class="col-sm-6">' +
                '<div class="card">' +
                    '<div class="row">' +
                        '<div class="col-4">' +
                            '<h5 class="card-title d-flex">' + clase.horaDeInicio + 'HS' + '</h5>' +
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

    $('grillaHoraria').innerHTML = opciones.join('');
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