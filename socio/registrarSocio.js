addEventListener("load",load)

//var miBackEnd = '/practica/serv/';
var miBackEnd = 'http://localhost:555/';

function $(nombre)
{
    return document.getElementById(nombre);
}

function load(){
    oculta_muestra('cartel');
    //boton para cerrar sesion 
    document.getElementById("logOut").addEventListener("click",cerrarSesion);
    //boton para perfil usuario logueado
    document.getElementById("perfil").addEventListener("click",mostrarPerfil);
    

    document.getElementById("btnClose").addEventListener("click",oculta);
    $('txtNewEmail').addEventListener("change", comprobarCorreo);
    $('txtNewNombre').addEventListener("keyup", validarCampos);
    $('txtNewApellido').addEventListener("keyup", validarCampos);
    $('txtNewDireccion').addEventListener("keyup", validarCampos);
    $('numNewTelefono').addEventListener("keyup", validarCampos);
    $('btnGuardar').addEventListener("click",click);
    
}


function oculta(){
    if (document.getElementById){ //se obtiene el id
    var el = document.getElementById('cartel'); 
    el.style.display = (el.style.display == 'none') ? 'block' : 'none'; 
    
    }

}
function cerrarSesion() {
    sessionStorage.clear();
    window.location.assign("http://localhost/practica/login.html");
}
function mostrarPerfil(){
    window.location.assign("http://localhost/practica/perfilUsuario.html");
}

function comprobarCorreo(){
    var NewEmail = $('txtNewEmail').value;
    var pattEmail = new RegExp(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/);
    var testEmail = pattEmail.test(NewEmail);

    if( testEmail ){
        $('btnGuardar').disabled = false;
        comprobarCorreoEnServidor(miBackEnd + "Usuario/Correo", respuestaDeComprobacion);
    }else{
        $('btnGuardar').disabled = true;
        $("respuesta").style.color = 'red';
        $('respuesta').innerHTML = "Correo electrónico incompleto";
    }
}

function respuestaDeComprobacion(respuesta){
    if(respuesta == "Correo duplicado"){
        $("respuesta").style.color = 'red';
        $("respuesta").innerHTML = respuesta;
        $("txtNewNombre").disabled = true;
        $("txtNewApellido").disabled = true;
        $("txtNewDireccion").disabled = true;
        $("numNewTelefono").disabled = true;
    }
    else{
        $("txtNewNombre").disabled = false;
        $("txtNewApellido").disabled = false;
        $("txtNewDireccion").disabled = false;
        $("numNewTelefono").disabled = false;
        $("respuesta").style.color = 'green';
        $("respuesta").innerHTML = respuesta;
    }
}

function comprobarCorreoEnServidor(servidor, funcionARealizar){
    var xmlhttp = new XMLHttpRequest(); 

    var datos = new FormData();
    datos.append("email",$("txtNewEmail").value);

    xmlhttp.open ("POST", servidor, true); 

    xmlhttp.onreadystatechange = function(){
        
        if(xmlhttp.readyState==XMLHttpRequest.DONE){
            if(xmlhttp.status==200){
                funcionARealizar(xmlhttp.response);
            }else{
                alert("Ocurrió un error");
            };
        }
    }
    xmlhttp.setRequestHeader("enctype","multipart/form-data");
    xmlhttp.send(datos);
}

function validarCampos(){
    var NewNombre = $("txtNewNombre").value.length;
    var NewApellido = $("txtNewApellido").value.length;
    var NewDireccion = $("txtNewDireccion").value.length;
    var NewTelefono = $("numNewTelefono").value.length;

    if( NewNombre >=2 && NewApellido >=2  && NewDireccion >=2 && NewTelefono >=8){
        $('btnGuardar').disabled = false;
    }else{
        $('btnGuardar').disabled = true;
    }
}
function oculta_muestra(id){
    if (document.getElementById){ //se obtiene el id
    var el = document.getElementById(id); 
    el.style.display = (el.style.display == 'none') ? 'block' : 'none'; 

    }

}

function click(){
    $("btnGuardar").disabled=true;
    enviarInfoDeSocio(miBackEnd + 'Socio/Registro', respuestaDeServidor);
}

function respuestaDeServidor(respuesta){
    var objetoUsuario = JSON.parse(respuesta);
    $("respuesta").innerHTML=respuesta;
}

function enviarInfoDeSocio(servidor, funcionARealizar){

    //declaro el objeto
    var xmlhttp = new XMLHttpRequest(); 

    //agrega datos para pasar por POST
    var datos = new FormData();
    datos.append("email",$("txtNewEmail").value);
    datos.append("nombre",$("txtNewNombre").value);
    datos.append("apellido",$("txtNewApellido").value);
    datos.append("direccion",$("txtNewDireccion").value);
    datos.append("telefono",$("numNewTelefono").value);

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