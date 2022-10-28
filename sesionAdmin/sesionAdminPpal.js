//localhost/practica/sesionAdmin/sesionAdminPpal.html

addEventListener("load",load)
 
//variable del servidor
var miBackEnd = 'http://localhost:555/';
var extra= 0; 
//DOM
function $(nombre)
{
    return document.getElementById(nombre);
}


function load(){
    
    oculta('clases');
    oculta('formularioModificarClase'); 
    oculta('extra');
    
    //boton para cerrar sesion 
    document.getElementById("logOut").addEventListener("click",cerrarSesion);
    //boton para perfil usuario logueado
    document.getElementById("perfil").addEventListener("click",mostrarPerfil);

    //barra nav 
     document.getElementById("navBtnInicio").addEventListener("click",navInicio);
     document.getElementById("navBtnHorarios").addEventListener("click",navHorarios);
     document.getElementById("navBtnSocios").addEventListener("click",navSocios);
     document.getElementById("navBtnProfesores").addEventListener("click",navProfesores);
     document.getElementById("navBtnClases").addEventListener("click",navClases);
     document.getElementById("navBtnRutinas").addEventListener("click",navRutinas);
     document.getElementById("navBtnSuscripcion").addEventListener("click",navSuscripcion);
     document.getElementById("navBtnActividades").addEventListener("click",navActividades);
     document.getElementById("navBtnInformes").addEventListener("click",navInformes);

}



function cerrarSesion() {
    sessionStorage.clear();
    window.location.assign("http://localhost/practica/login.html");
}
function mostrarPerfil(){
    window.location.assign("http://localhost/practica/perfilUsuario.html");
}

function oculta_muestra(id){
    if (document.getElementById){ //se obtiene el id
    var el = document.getElementById(id); 
    el.style.display = (el.style.display == 'none') ? 'block' : 'none'; 
    
    }

}

function muestra(id){
    if (document.getElementById){ //se obtiene el id
    var el = document.getElementById(id); //se define la variable "el" igual a nuestro div

     el.style.display = "block"; 
        
    }

}
function oculta(id){
    if (document.getElementById){ //se obtiene el id
    var el = document.getElementById(id); 
    el.style.display ='none'; 
    
    }

}

function navInicio(){

}
function navHorarios(){

}
function navSocios(){

}
function navProfesores(){

}
function navClases(){
    muestra('clases');
    clickConsultarClase;
}
function navRutinas(){

}
function navSuscripcion(){

}
function navActividades(){

}

function navInformes(){

}


