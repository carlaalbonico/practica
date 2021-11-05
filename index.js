addEventListener("load", load);

function $(demo){
    return document.getElementById(demo);
}

function load(){
    var miMenu = `
        <nav class="nav col-md-11">
            <a class="nav-link col-" aria-current="page" href="index.html">Menú</a>
            <a class="nav-link col-" aria-current="page" href="">Clases</a>
            <a class="nav-link col-" aria-current="page" href="">Actividades</a>
            <a class="nav-link col-" aria-current="page" href="">Nosotros</a>
            <a class="nav-link col-" aria-current="page" href="">Contacto</a>
        </nav>
        <input type="button" id="btnRegistro" class="col-md-1 col-" value="Registro">
    `;

    $('miMenu').innerHTML = miMenu;

    $('btnRegistro').addEventListener("click",registrar);
    TraerFecha();
}

function registrar(){
    window.location.assign("http://localhost/practica/login.html");
}

function TraerFecha(){
    const fecha = new Date();
    let anio = fecha.getFullYear();
    $("txtFecha").innerHTML = anio;
}