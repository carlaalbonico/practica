//agrega funcion load a HTML; 
addEventListener("load",load)
var usuario= sessionStorage.getItem('nombre');
//variable del servidor
var miBackEnd = 'http://localhost:555/';
var idPerfil; 
var emailNuevo;
var idUsuario;
//DOM
function $(nombre)
{
    return document.getElementById(nombre);
}


function load(){
    cargarBienvenido(usuario);
    muestra('cartel');
    oculta('formulario');
    oculta('formularioModificarPerfil'); 
    muestra('perfilUsuario');
    cargando();

    
    enviarParametrosPOST(miBackEnd + 'Administrativo/Perfil', cargarPerfil);
    //para ocultar cartel del mensaje
    

    document.getElementById("btnModificar").addEventListener("click",clickModificar);

    //boton para cerrar sesion 
    document.getElementById("logOut").addEventListener("click",cerrarSesion);
    //boton para perfil usuario logueado
    document.getElementById("perfil").addEventListener("click",mostrarPerfil);
    
}
function cargarBienvenido(usuario){
    $('bienvenido').innerHTML='Bienvenido, '+usuario
}
function cargando(){
    var opciones=[];
    opciones.push('<div class="d-flex justify-content-center mt-5">'+
    '<div class="spinner-grow" role="status">'+
        '<span class="visually-hidden">Loading...</span>'+
    '</div>'+'</div><div class="d-flex justify-content-center mt-2">'+
    ' <div><p class="fw-bold">Cargando...</p></div>'+
'</div>');
$('respuesta').innerHTML = opciones.join(''); 
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
function oculta(id){
    if (document.getElementById){ //se obtiene el id
    var el = document.getElementById(id); 
    el.style.display = (el.style.display == 'none') ? 'block' : 'none'; 
    
    }

}
function cargarPerfil(respuesta){
    oculta('cartel');
    muestra('formulario');
    var administrativo = JSON.parse(respuesta);

    console.log(administrativo);
    
    idPerfil= administrativo.usuario;
    $("nombrePerfil").innerHTML = administrativo.nombre;
    $("apellidoPerfil").innerHTML = administrativo.apellido;
    $("dniPerfil").innerHTML = administrativo.dni;
    $("direccionPerfil").innerHTML = administrativo.direccion;
    $("telefonoPerfil").innerHTML = administrativo.telefono;
    $("emailPerfil").innerHTML = administrativo.email;
    idUsuario=administrativo.usuario; 
    
    console.log(idUsuario);

    
}

function clickModificar(){

    //enviarMensajeAlServidor("/Provincias/Backend/?provincia="+ valorProvincia,cargarOpcionesLocalidad);
    console.log(idPerfil); 
    
    enviarParametrosPOST(miBackEnd + 'Administrativo/Perfil', retornoClickModificar);
    var opciones=[];
    opciones.push('<div class="d-flex justify-content-center mt-5">'+
    '<div class="spinner-grow" role="status">'+
        '<span class="visually-hidden">Loading...</span>'+
    '</div>'+'</div><div class="d-flex justify-content-center mt-2">'+
    ' <div><p class="fw-bold">Cargando...</p></div>'+
'</div>');
$('respuesta').innerHTML = opciones.join(''); 
}
function retornoClickModificar(respuesta){
    muestra('formularioModificarPerfil'); 
    oculta('perfilUsuario'); 
    var PerfilMod = JSON.parse(respuesta);
    
    $("nombrePerfilModificar").value = PerfilMod["nombre"];
    $("apellidoPerfilModificar").value = PerfilMod["apellido"];
    $("dniPerfilModificar").value = PerfilMod["dni"];
    $("direccionPerfilModificar").value = PerfilMod["direccion"];
    $("telefonoPerfilModificar").value = PerfilMod["telefono"];
    $("emailPerfilModificar").value = PerfilMod["email"];
    
    $('nombrePerfilModificar').addEventListener("keyup", validarPerfilModificar);
    $('apellidoPerfilModificar').addEventListener("keyup", validarPerfilModificar);
    $('direccionPerfilModificar').addEventListener("keyup", validarPerfilModificar);
    $('dniPerfilModificar').addEventListener("keyup",validarPerfilModificar);
    $('telefonoPerfilModificar').addEventListener("keyup",validarPerfilModificar);
    $('emailPerfilModificar').addEventListener("keyup", validarCorreo);
    $('btnModificarGuardar').addEventListener("click",clickGuardarModPerfil);
    
}
function validarPerfilModificar(){
    var ModNombre = $("nombrePerfilModificar").value.length;
    var ModApellido = $("apellidoPerfilModificar").value.length;
    var ModDni = $("dniPerfilModificar").value.length;
    var ModDireccion = $("direccionPerfilModificar").value.length;
    var ModTelefono = $("telefonoPerfilModificar").value.length;

    if( ModNombre >=2 && ModApellido >=2  && ModDireccion >=2 && ModTelefono >=10 && ModDni>6){
        $('btnModificarGuardar').disabled = false;//habilitar
    }else{
        $('btnModificarGuardar').disabled = true;
    }

}

function validarCorreo(){

    var email = document.getElementById('emailPerfilModificar').value;
    console.log(email);

    
    var pattEmail = new RegExp(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/);

    
    var resultadoEmail = pattEmail.test(email);

    if( resultadoEmail ){
        $('btnModificarGuardar').disabled = false;
    }else{
        $('btnModificarGuardar').disabled = true;
    }
}
function clickGuardarModPerfil(){
    var email = document.getElementById('emailPerfilModificar').value;
    emailNuevo=email; 
    $("btnModificarGuardar").disabled=true;

    enviarParametrosPOSTModificar(miBackEnd + 'Administrativo/ModificacionDePerfil', respuestaDeServidorMod);
    enviarParametrosPOSTCorreo(miBackEnd + 'Usuario/EditarCorreo/'+ idUsuario,  respuestaDeServidorModEmail,email);
}
function respuestaDeServidorMod(respuesta){
    sessionStorage.setItem("usuario",emailNuevo);
    swal("Genial!", '"'+respuesta+'"', "success");
    enviarParametrosPOST(miBackEnd + 'Administrativo/Perfil', cargarPerfil);
    muestra('cartel');
    oculta('formulario');
    oculta('formularioModificarPerfil'); 
    muestra('perfilUsuario');
    cargando();
}
function respuestaDeServidorModEmail() {
   
    console.log('correo cambiado');
   

}
function enviarParametrosPOST(servidor, funcionARealizar){
    
    let email = sessionStorage.getItem("usuario");
    
    //declaro el objeto
    var xmlhttp = new XMLHttpRequest(); 

    //agrega datos para pasar por POST
    var datos = new FormData();
    datos.append('email',email);
   

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
function enviarParametrosPOSTCorreo(servidor, funcionARealizar,email) {

    //declaro el objeto
    var xmlhttp = new XMLHttpRequest();

    //agrega datos para pasar por POST
    var datos = new FormData();
    datos.append("email", email);


    //indico hacia donde va el mensaje
    xmlhttp.open("POST", servidor, true);

    //seteo el evento
    xmlhttp.onreadystatechange = function () {
        //veo si llego la respuesta del servidor
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            //reviso si la respuesta del servidor es la correcta
            if (xmlhttp.status == 200) {
                funcionARealizar(xmlhttp.response);
            } else {
                swal("Error", "revise los datos cargados", "error");
            };
        }
    }
    //esto va siempre cuando se hace un formulario
    xmlhttp.setRequestHeader("enctype", "multipart/form-data");

    //envio el mensaje 
    xmlhttp.send(datos);


}

function enviarParametrosPOSTModificar(servidor, funcionARealizar){

    //declaro el objeto
    var xmlhttp = new XMLHttpRequest(); 

    //agrega datos para pasar por POST
    var datos = new FormData();
    datos.append("nombre",$("nombrePerfilModificar").value);
    datos.append("apellido",$("apellidoPerfilModificar").value);
    datos.append("dni",$("dniPerfilModificar").value);
    datos.append("direccion",$("direccionPerfilModificar").value);
    datos.append("telefono",$("telefonoPerfilModificar").value);
   

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