addEventListener("load", load);

function $(nombre)
{
    return document.getElementById(nombre);
}


function load(){
   

    document.getElementById("logIn").addEventListener("click",registrar);
   
}

function registrar(){
    window.location.assign("http://localhost/practica/login.html");
}

function TraerFecha(){
    const fecha = new Date();
    let anio = fecha.getFullYear();
    $("txtFecha").innerHTML = anio;
}