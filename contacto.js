addEventListener("load", load);

function $(nombre)
{
    return document.getElementById(nombre);
}


function load(){
     
    document.getElementById("logIn").addEventListener("click",registrar);
    document.getElementById("home").addEventListener("click",home);
    document.getElementById("activities").addEventListener("click",activities);
    document.getElementById("schedule").addEventListener("click",schedule);
    document.getElementById("contact").addEventListener("click",contact);
}

function registrar(){
    window.location.assign("http://localhost/practica/login.html");
}

function home(){
    window.location.assign("http://localhost/practica/index.html");
}
function activities(){
    window.location.assign("http://localhost/practica/index.html#actividadesPpal");
}
function schedule(){
    window.location.assign("http://localhost/practica/horarios.html");
}
function contact(){
    window.location.assign("http://localhost/practica/contacto.html");
}

function TraerFecha(){
    const fecha = new Date();
    let anio = fecha.getFullYear();
    $("txtFecha").innerHTML = anio;
}




 