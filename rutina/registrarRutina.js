addEventListener("load",load)

//var miBackEnd = '/practica/serv/';
var miBackEnd = 'http://localhost:555/';

function $(nombre)
{
    return document.getElementById(nombre);
}

function load(){
    oculta('cartel'); 
    
    enviarParametrosGET(miBackEnd + 'Salon',cargarOpcionesSalon);
    //boton para cerrar sesion 
    document.getElementById("logOut").addEventListener("click",cerrarSesion);
    //boton para perfil usuario logueado
    document.getElementById("perfil").addEventListener("click",mostrarPerfil);
    document.getElementById("botonAtras").addEventListener("click",atras);

    document.getElementById('btnGuardarRutina').addEventListener("click",click);
    
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
function oculta_muestra(id){
    if (document.getElementById){ //se obtiene el id
    var el = document.getElementById(id); 
    el.style.display = (el.style.display == 'none') ? 'block' : 'none'; 

    }

}
function atras(){
    window.location.assign("http://localhost/practica/rutina/menuAdminRutina.html");//aca va el enlace de la pagina registrar; 
}
function cerrarSesion() {
    sessionStorage.clear();
    window.location.assign("http://localhost/practica/login.html");
}
function mostrarPerfil(){
    window.location.assign("http://localhost/practica/perfilUsuario.html");
}

function cargarOpcionesSalon(nro){
    
    var salon= JSON.parse(nro);
    console.log(salon);
    salon.sort(function (x, y) { return x.nombreSalon.localeCompare(y.nombreSalon) });

    var opciones = []

    salon.forEach(element => {
        opciones.push('<option value="' + element.idSalon + '">' + element.nombreSalon +' capacidad:'+ element.capacidad + '</option>');
    });
    
    $("slctDatosSalon").innerHTML = opciones;

   
}


function click(){
   // $("btnGuardarClase").disabled=true;
    enviarInfo(miBackEnd + 'Rutina/Registro', respuestaDeServidor);
}

function respuestaDeServidor(respuesta){
    muestra('cartel');
    $("respuesta").innerHTML=respuesta;
    
    $("txtNewRutina").value='';
    $("txtNewDescrip").value='';
    
    
    
}

function enviarParametrosGET(servidor,funcionARealizar){

    //Declaro el objeto
    var xmlhttp = new XMLHttpRequest();

    //Indico hacia donde va el mensaje
    xmlhttp.open("GET", servidor, true);

    xmlhttp.onreadystatechange = function(){

        if(xmlhttp.readyState == XMLHttpRequest.DONE){

            if(xmlhttp.status == 200){
                //console.log(xmlhttp.responseText);
                funcionARealizar(xmlhttp.responseText);
            }
            else{
                alert("Ocurrio un error");
            }
        }
    }
    //Envio el mensaje
    xmlhttp.send();
}

function enviarInfo(servidor, funcionARealizar){

    //declaro el objeto
    var xmlhttp = new XMLHttpRequest(); 

    //agrega datos para pasar por POST
    var datos = new FormData();
    datos.append("nombre",$("txtNewRutina").value);
    datos.append("descripcion",$("txtNewDescrip").value);
    datos.append("salon",$("slctDatosSalon").value);
        //indico hacia donde va el mensaje
    xmlhttp.open ("POST", servidor, true); 

    //seteo el evento
    xmlhttp.onreadystatechange = function(){
        //veo si llego la respuesta del servidor
        if(xmlhttp.readyState==XMLHttpRequest.DONE){
            //reviso si la respuesta del servidor es la correcta
            if(xmlhttp.status==200){
                funcionARealizar(xmlhttp.response);
            }else{
                alert("Ocurrió un error");
            };
        }
    }
    //esto va siempre cuando se hace un formulario
    xmlhttp.setRequestHeader("enctype","multipart/form-data");
    //envio el mensaje 
    xmlhttp.send(datos);
}