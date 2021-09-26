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

    //para ocultar los menus
    muestra('botonesAdmin'); 
    oculta_muestra('consultarSocio'); 

    //para ocultar cartel del mensaje
    oculta_muestra('cartel');

    //validar el campo ingresado
    // document.getElementById('txtEmail').addEventListener("keyup", validar);

    //boton para cerrar sesion 
    document.getElementById("logOut").addEventListener("click",cerrarSesion);
    //boton para perfil usuario logueado
    document.getElementById("perfil").addEventListener("click",mostrarPerfil);
    
    //cuando elige la opcion de consultar socio en el menu
    document.getElementById("btnConsultar").addEventListener("click",clickConsultar);
    //cuando elige la opcion de registrar socio en el menu
    document.getElementById("btnRegistrar").addEventListener("click",clickRegistrar);
    //cuando elige el socio y hace click en boton consultar socio
    document.getElementById("btnConsultarSocio").addEventListener("click",click);
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

function validar(){

    var nombre = document.getElementById('slctEmail').value;

    var pattEmail = new RegExp(/^([a-zA-Z0-9._%-])*$/);

    var resultadoNombre = pattEmail.test(nombre);

    if( resultadoEmail ){
        $('btnConsultarSocio').disabled = false;
    }else{
        $('btnConsultarSocio').disabled = true;
    }
}



function click(){
    
    $('btnConsultarSocio').disabled=true;

    //enviarMensajeAlServidor("/Provincias/Backend/?provincia="+ valorProvincia,cargarOpcionesLocalidad);
    var idSocio= document.getElementById("slctEmail").value; 
    
    enviarParametrosGET(miBackEnd + 'Socio/'+idSocio, retornoDelClick);
    muestra('cartel');
    $("respuesta").innerHTML="procesando informacion";
}
 
function retornoDelClick(respuesta){
    //$("txtEmail").value = "";
    
    var objetoUsuario = JSON.parse(respuesta);
        

    //$("respuesta").innerHTML=respuesta;
    if(objetoUsuario['nroSocio'] == null){
        
        $("respuesta").innerHTML="Seleccione un socio";
    }else{

    //if(objetoUsuario['nroSocio'] != null){
    document.cookie = "nroSocio="+objetoUsuario['nroSocio'];// preguntar
        window.location.assign("http://localhost/practica/socio/menuAdminParaUnSocio.html");
    }

    
    
}

function clickConsultar(){//oculta la botonera y visualiza el campo para escribir el email 
    oculta_muestra('botonesAdmin'); 
    muestra('consultarSocio'); 
    //enviarMensajeAlServidor("/Provincias/Backend/", cargarOpcionesProvincia);
    enviarParametrosGET(miBackEnd + 'Socio',cargarOpcionesConsultar); 
    //enviarParametrosGET(miBackEnd + 'Socio',retornoDelClick);
}

function cargarOpcionesConsultar(nroSocio){
    var socios = JSON.parse(nroSocio);
    socios.sort(function (x, y) { return x.nombre.localeCompare(y.nombre) });
    var opciones = ['<option value=0>Seleccione un socio</option>']

    socios.forEach(element => {
        opciones.push('<option value="' + element.nroSocio + '">' + element.nombre +' '+ element.apellido + '</option>');
    });
    
    $("slctEmail").innerHTML = opciones;
}



function clickRegistrar(){
    window.location.assign("http://localhost/practica/socio/registrarSocio.html");//aca va el enlace de la pagina registrar; 
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

function enviarParametrosPOST(servidor, funcionARealizar){

    //declaro el objeto
    var xmlhttp = new XMLHttpRequest(); 

    //agrega datos para pasar por POST
    var datos = new FormData();
    datos.append("email",$("txtEmail").value);
   

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
                alert("ocurrio un error");
            };
        }
    }
    //esto va siempre cuando se hace un formulario
    xmlhttp.setRequestHeader("enctype","multipart/form-data");

    //envio el mensaje 
    xmlhttp.send(datos);


}