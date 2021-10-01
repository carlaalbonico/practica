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
    oculta('consultarSocio'); 
    oculta('botonesAdminParaUnSocio'); 
    oculta('formularioModificarSocio'); 
    oculta('formularioChico');
    oculta('inscribirSocioClase'); 
    oculta('registrarPago'); 
    oculta('generarCuota'); 
    oculta('estadoDeuda');
    
    //para ocultar cartel del mensaje
    oculta_muestra('cartel');

    //boton para cerrar sesion 
    document.getElementById("logOut").addEventListener("click",cerrarSesion);
    //boton para perfil usuario logueado
    document.getElementById("perfil").addEventListener("click",mostrarPerfil);
    
    //cuando elige la opcion de consultar socio en el menu
    document.getElementById("btnMenuConsultarSocio").addEventListener("click",menuConsultarSocio);
    //cuando elige la opcion de registrar socio en el menu
    document.getElementById("btnMenuRegistrarSocio").addEventListener("click",menuRegistrarSocio);
   
    //cuando escribe un nombre y hace click en buscar
    document.getElementById("btnBuscar").addEventListener("click",clickBuscar);
    //cuando elige el socio y hace click en boton consultar socio
    document.getElementById("btnConsultarSocio").addEventListener("click",clickConsultarSocio);

    document.getElementById("btnModificar").addEventListener("click",clickModificarSocio);
    document.getElementById("btnBorrar").addEventListener("click",clickBorrarSocio);

    document.getElementById("btnRegistrarPago").addEventListener("click",clickRegistrarPago);
    document.getElementById("btnGenerarCuota").addEventListener("click",clickGenerarCuota);
    document.getElementById("btnEstadoDeuda").addEventListener("click",clickEstadoDeuda);
    document.getElementById("btnInscribirSocioClase").addEventListener("click",clickInscribirSocioClase);
    document.getElementById("btnContinuarClase").addEventListener("click",clickContinuarTipoClase); 
    

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
function oculta(id){
    if (document.getElementById){ //se obtiene el id
    var el = document.getElementById(id); 
    el.style.display ='none'; 
    
    }

}

function menuRegistrarSocio(){
    window.location.assign("http://localhost/practica/socio/registrarSocio.html");//aca va el enlace de la pagina registrar; 
}

function menuConsultarSocio(){//oculta la botonera y visualiza el campo para escribir el email 
    oculta('botonesAdmin'); 
    muestra('consultarSocio'); 
    
  
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
    
    $("slctSocio").innerHTML = opciones;
}



function clickConsultarSocio(){

    //enviarMensajeAlServidor("/Provincias/Backend/?provincia="+ valorProvincia,cargarOpcionesLocalidad);
    var idSocio= document.getElementById("slctSocio").value; 
    
    enviarParametrosGET(miBackEnd + 'Socio/'+idSocio, retornoClickConsultarSocio);
    muestra('cartel');
  
    $("respuesta").innerHTML="procesando informacion";
}
 
function retornoClickConsultarSocio(respuesta){
    oculta('cartel');
    oculta('consultarSocio');
    muestra('botonesAdminParaUnSocio'); 
    oculta('formularioModificarSocio'); 
    oculta('formularioChico');
    oculta('registrarPago'); 
    oculta('generarCuota');
    oculta('estadoDeuda');
    oculta('inscribirSocioClase');
     
    var socio = JSON.parse(respuesta);
    console.log(socio); 
    $("nroSocio").innerHTML = socio.nroSocio;
    $("nombreSocio").innerHTML = socio.nombre;
    $("apellidoSocio").innerHTML = socio.apellido;
    $("direccionSocio").innerHTML = socio.direccion;
    $("telefonoSocio").innerHTML = socio.telefono;
    $("emailSocio").innerHTML = socio.email;
    $("estadoSocio").innerHTML = socio.estado;
    $("altaSocio").innerHTML = socio.fechaDeAlta;
        

    //$("respuesta").innerHTML=respuesta;
    if(socio['nroSocio'] == null){
        
        $("respuesta").innerHTML="Seleccione un socio";
    }
     
}
function clickModificarSocio(){

    //enviarMensajeAlServidor("/Provincias/Backend/?provincia="+ valorProvincia,cargarOpcionesLocalidad);
    var idSocioMod= document.getElementById("slctSocio").value; 
    
    enviarParametrosGET(miBackEnd + 'Socio/'+idSocioMod, retornoClickModificarSocio);
   
}
function retornoClickModificarSocio(respuesta){
    oculta('cartel');
    oculta('botonesAdminParaUnSocio');
    oculta('registrarPago'); 
    oculta('generarCuota');
    oculta('estadoDeuda');
    oculta('inscribirSocioClase');
    muestra('formularioModificarSocio'); 
    oculta('formularioChico');
    var socioMod = JSON.parse(respuesta);
    
   
    
    $("nombreSocioModificar").value = socioMod["nombre"];
    $("apellidoSocioModificar").value = socioMod["apellido"];
    $("direccionSocioModificar").value = socioMod["direccion"];
    $("telefonoSocioModificar").value = socioMod["telefono"];
    $("correoSocioModificar").innerHTML = socioMod["correo"];

     
}

function clickBorrarSocio(){

}

function cargarFormularioChico(respuesta){
    var socioFC= JSON.parse(respuesta);
    $("nroSocioForm").innerHTML = socioFC.nroSocio;
    $("nombreSocioForm").innerHTML = socioFC.nombre;
    $("apellidoSocioForm").innerHTML = socioFC.apellido;
}
function clickRegistrarPago(){
    oculta('cartel');
    oculta('botonesAdminParaUnSocio');
    oculta('formularioModificarSocio'); 
    muestra('formularioChico');
    muestra('registrarPago'); 
    oculta('generarCuota');
    oculta('estadoDeuda');
    oculta('inscribirSocioClase');
    
}
function clickGenerarCuota(){
    oculta('cartel');
    oculta('botonesAdminParaUnSocio');
    oculta('formularioModificarSocio'); 
    oculta('registrarPago'); 
    muestra('formularioChico');
    muestra('generarCuota');
    oculta('estadoDeuda');
    oculta('inscribirSocioClase');
    
}

function clickEstadoDeuda(){
    oculta('cartel');
    oculta('botonesAdminParaUnSocio');
    oculta('formularioModificarSocio'); 
    oculta('registrarPago'); 
    oculta('generarCuota');
    muestra('formularioChico');
    muestra('estadoDeuda');
    oculta('inscribirSocioClase');
     
}
function clickInscribirSocioClase(){
    oculta('cartel');
    oculta('botonesAdminParaUnSocio');
    oculta('formularioModificarSocio'); 
    oculta('registrarPago'); 
    oculta('generarCuota');
    oculta('estadoDeuda');
    muestra('formularioChico');
    muestra('inscribirSocioClase');
   
   //manda los datos para cargar el formularioChico
    var idSocio= document.getElementById("slctSocio").value; 
    
    enviarParametrosGET(miBackEnd + 'Socio/'+idSocio,cargarFormularioChico);
     //manda los datos para cargar el select
    enviarParametrosGET(miBackEnd + 'TipoClase',cargarOpcionesClase); 
    
    oculta('continuarClase'); 
}


function cargarOpcionesClase(valor){
    
    
    var clases= JSON.parse(valor);
    clases.sort(function (x, y) { return x.nombre.localeCompare(y.nombre) });
   
    var opciones = ['<option value=0>Seleccione una clase</option>']

    clases.forEach(element => {
        opciones.push('<option value="' + element.idTipoClase + '">' + element.nombre + '</option>');
    });
    console.log(clases); 
    $("slctTipoClase").innerHTML = opciones;
}
function clickContinuarTipoClase(){
    
   //manda los datos para cargar el formularioChico
    var tipoClase= document.getElementById("slctTipoClase").value; 
    
    
     //manda los datos para cargar el select
    enviarParametrosGET(miBackEnd + 'Clase/'+tipoClase,cargarOpcionesTipoClases); 
    
    muestra('continuarClase'); 
}

function cargarOpcionesTipoClases(valor){
    muestra('continuarClase'); 
    var tipoClases= JSON.parse(valor);
    tipoClases.sort(function (x, y) { return x.nombre.localeCompare(y.nombre) });
   
    var opciones = ['<option value=0>Seleccione un tipo de clase</option>']

    tipoClases.forEach(element => {
        opciones.push('<option value="' + element.idTipoClase + '">' + element.nombre + '</option>');
    });
    console.log(tipoClases); 
    $("slctNumClase").innerHTML = opciones;
    //tengo que agregar mensaje de error
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