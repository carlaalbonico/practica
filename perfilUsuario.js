//agrega funcion load a HTML; 
addEventListener("load",load)
 
//variable del servidor
var miBackEnd = 'http://localhost:555/';

//DOM
function $(nombre)
{
    return document.getElementById(nombre);
}


function load(){

    //para ocultar cartel del mensaje
    oculta_muestra('cartel');

    //validar el campo ingresado
    // document.getElementById('txtEmail').addEventListener("keyup", validar);

    //boton para cerrar sesion 
    document.getElementById("logOut").addEventListener("click",cerrarSesion);
    //boton para perfil usuario logueado
    document.getElementById("perfil").addEventListener("click",mostrarPerfil);
    
    
    //close del mensaje 
    document.getElementById("btnClose").addEventListener("click",oculta);
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

    el.style.display = (el.style.display == 'block') ? 'none' : 'block'; 
        
    }

}
function oculta(){
    if (document.getElementById){ //se obtiene el id
    var el = document.getElementById('cartel'); 
    el.style.display = (el.style.display == 'none') ? 'block' : 'none'; 
    
    }

}