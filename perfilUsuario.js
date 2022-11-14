//agrega funcion load a HTML; 
addEventListener("load",load)
var usuario= sessionStorage.getItem('nombre');
//variable del servidor
var miBackEnd = 'http://localhost:555/';
var idPerfil; 

//DOM
function $(nombre)
{
    return document.getElementById(nombre);
}


function load(){
    cargarBienvenido(usuario);
    oculta('cartel');
    oculta('formularioModificarPerfil'); 
    muestra('perfilUsuario');
    
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
    var administrativo = JSON.parse(respuesta);

    console.log(administrativo);
    
    idPerfil= administrativo.usuario;
    $("nombrePerfil").innerHTML = administrativo.nombre;
    $("apellidoPerfil").innerHTML = administrativo.apellido;
    $("dniPerfil").innerHTML = administrativo.dni;
    $("direccionPerfil").innerHTML = administrativo.direccion;
    $("telefonoPerfil").innerHTML = administrativo.telefono;
    $("emailPerfil").innerHTML = administrativo.email;
    

    
}

function clickModificar(){

    //enviarMensajeAlServidor("/Provincias/Backend/?provincia="+ valorProvincia,cargarOpcionesLocalidad);
    console.log(idPerfil); 
    
    enviarParametrosPOST(miBackEnd + 'Administrativo/Perfil', retornoClickModificar);
   
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
    
    $('nombrePerfilModificar').addEventListener("keyup", validarPerfilModificar);
    $('apellidoPerfilModificar').addEventListener("keyup", validarPerfilModificar);
    $('direccionPerfilModificar').addEventListener("keyup", validarPerfilModificar);
    $('dniPerfilModificar').addEventListener("keyup",validarPerfilModificar);
    $('telefonoPerfilModificar').addEventListener("keyup",validarPerfilModificar);
    $('btnModificarGuardar').addEventListener("click",clickGuardarModPerfil);
    
}
function validarPerfilModificar(){
    var ModNombre = $("nombrePerfilModificar").value.length;
    var ModApellido = $("apellidoPerfilModificar").value.length;
    var ModDni = $("dniPerfilModificar").value.length;
    var ModDireccion = $("direccionPerfilModificar").value.length;
    var ModTelefono = $("telefonoPerfilModificar").value.length;

    if( ModNombre >=2 && ModApellido >=2  && ModDireccion >=2 && ModTelefono >=8 && ModDni>6){
        $('btnModificarGuardar').disabled = false;//habilitar
    }else{
        $('btnModificarGuardar').disabled = true;
    }

}
function clickGuardarModPerfil(){
    
    $("btnModificarGuardar").disabled=true;

    enviarParametrosPOSTModificar(miBackEnd + 'Administrativo/ModificacionDePerfil', respuestaDeServidorMod);
}
function respuestaDeServidorMod(respuesta){
    muestra('cartel');
    $("respuesta").innerHTML=respuesta;
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