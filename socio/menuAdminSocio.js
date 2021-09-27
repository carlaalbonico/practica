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
    
    oculta_muestra('botonesAdminParaUnSocio'); 
    
    oculta_muestra('formularioModificarSocio'); 
    
    //para ocultar cartel del mensaje
    oculta_muestra('cartel');

    //boton para cerrar sesion 
    document.getElementById("logOut").addEventListener("click",cerrarSesion);
    //boton para perfil usuario logueado
    document.getElementById("perfil").addEventListener("click",mostrarPerfil);
    
    //cuando elige la opcion de consultar socio en el menu
    document.getElementById("btnConsultar").addEventListener("click",clickConsultar);
    //cuando elige la opcion de registrar socio en el menu
    document.getElementById("btnRegistrar").addEventListener("click",clickRegistrar);
    //cuando escribe un nombre y hace click en buscar
    document.getElementById("btnBuscar").addEventListener("click",clickBuscar);
    //cuando elige el socio y hace click en boton consultar socio
    document.getElementById("btnConsultarSocio").addEventListener("click",clickConsultarSocio);

    document.getElementById("btnModificar").addEventListener("click",clickModificarSocio);
    //close del mensaje 
    document.getElementById("btnClose").addEventListener("click",oculta);
    $('btnConsultarSocio').disabled=true;
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
function oculta(){
    if (document.getElementById){ //se obtiene el id
    var el = document.getElementById('cartel'); 
    el.style.display ='none'; 
    
    }

}





function clickConsultarSocio(){

    //enviarMensajeAlServidor("/Provincias/Backend/?provincia="+ valorProvincia,cargarOpcionesLocalidad);
    var idSocio= document.getElementById("slctEmail").value; 
    
    enviarParametrosGET(miBackEnd + 'Socio/'+idSocio, retornoDelClickConsultarSocio);
    muestra('cartel');
  
    $("respuesta").innerHTML="procesando informacion";
}
 
function retornoDelClickConsultarSocio(respuesta){
    oculta_muestra('cartel');

    muestra('botonesAdminParaUnSocio'); 
    oculta('formularioModificarSocio'); 
     
    var socio = JSON.parse(respuesta);
    $("nroSocio").innerHTML = socio.nroSocio;
    $("nombreSocio").innerHTML = socio.nombre;
    $("apellidoSocio").innerHTML = socio.apellido;
    $("direccionSocio").innerHTML = socio.direccion;
    $("telefonoSocio").innerHTML = socio.telefono;
    $("correoSocio").innerHTML = socio.correo;
    $("estadoSocio").innerHTML = socio.estado;
    $("altaSocio").innerHTML = socio.fechaDeAlta;
        

    //$("respuesta").innerHTML=respuesta;
    if(socio['nroSocio'] == null){
        
        $("respuesta").innerHTML="Seleccione un socio";
    }
     
}
function clickModificarSocio(){

    //enviarMensajeAlServidor("/Provincias/Backend/?provincia="+ valorProvincia,cargarOpcionesLocalidad);
    var idSocioMod= document.getElementById("slctEmail").value; 
    
    enviarParametrosGET(miBackEnd + 'Socio/'+idSocioMod, retornoDelClickModificarSocio);
   
}
function retornoDelClickModificarSocio(respuesta){
    oculta_muestra('cartel');
    oculta_muestra('botonesAdminParaUnSocio');
    muestra('formularioModificarSocio'); 
    
    var socioMod = JSON.parse(respuesta);
    
   console.log(socioMod); 
    
    /*document.formularioModificarSocio.nombreSocioModificar.value = socioMod.nombre;
    $("apellidoSocioModificar").innerHTML = socioMod.apellido;
    $("direccionSocioModificar").innerHTML = socioMod.direccion;
    $("telefonoSocioModificar").innerHTML = socioMod.telefono;
    $('correoSocioModificar').innerHTML = socioMod.correo;*/

     
}

function clickConsultar(){//oculta la botonera y visualiza el campo para escribir el email 
    oculta_muestra('botonesAdmin'); 
    muestra('consultarSocio'); 
    //enviarMensajeAlServidor("/Provincias/Backend/", cargarOpcionesProvincia);
   
    //enviarParametrosGET(miBackEnd + 'Socio',retornoDelClick);
}
function clickBuscar(){
    $('btnConsultarSocio').disabled=false;
    enviarParametrosGET(miBackEnd + 'Socio',cargarOpcionesConsultar); 
}

function cargarOpcionesConsultar(nroSocio){
    var nombreBuscar = document.getElementById('txtNombreBuscar').value;
    var socios = JSON.parse(nroSocio);
    socios.sort(function (x, y) { return x.nombre.localeCompare(y.nombre) });
    var sociosFiltrados= socios.filter( item =>{
        var nombreMin= item.nombre.toLowerCase(); 
        return nombreMin.includes(nombreBuscar.toLowerCase())
    }); 
    
    
    var opciones = ['<option value=0>Seleccione un socio</option>']

    sociosFiltrados.forEach(element => {
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