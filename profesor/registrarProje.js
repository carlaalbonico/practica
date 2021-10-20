addEventListener("load",load)

//var miBackEnd = '/practica/serv/';
var miBackEnd = 'http://localhost:555/';

function $(nombre)
{
    return document.getElementById(nombre);
}

function load(){
    oculta_muestra('cartel');
    oculta(); 
    //boton para cerrar sesion 
    document.getElementById("logOut").addEventListener("click",cerrarSesion);
    //boton para perfil usuario logueado
    document.getElementById("perfil").addEventListener("click",mostrarPerfil);
    

    document.getElementById("btnClose").addEventListener("click",oculta);
    // preguntar por el email! 
    
    $('txtNewNombreProf').addEventListener("keyup", validarCampos);
    $('txtNewApellidoProf').addEventListener("keyup", validarCampos);
    $('txtNewDireccionProf').addEventListener("keyup", validarCampos);
    $('txtNewTelefonoProf').addEventListener("keyup", validarCampos);
    $('txtNewEspProf').addEventListener("keyup", validarCampos);
    $('btnGuardarProf').addEventListener("click",click);
    
}


function oculta(){
    if (document.getElementById){ //se obtiene el id
    var el = document.getElementById('cartel'); 
    el.style.display = (el.style.display == 'none') ? 'block' : 'none'; 
    
    }

}
function oculta_muestra(id){
    if (document.getElementById){ //se obtiene el id
    var el = document.getElementById(id); 
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



function validarCampos(){
    var NewNombre = $("txtNewNombreProf").value.length;
    var NewApellido = $("txtNewApellidoProf").value.length;
    var NewDireccion = $("txtNewDireccionProf").value.length;
    var NewTelefono = $("txtNewTelefonoProf").value.length;
    var NewEspecialidad = $("txtNewEspProf").value.length;
    
    if( NewNombre >=2 && NewApellido >=2  && NewDireccion >=2 && NewTelefono >=8 && NewEspecialidad>=8  ){
        $('btnGuardarProf').disabled = false;
    }else{
        $('btnGuardarProf').disabled = true;
    }
}

function click(){
    $("btnGuardarProf").disabled=true;
    enviarInfoDeSocio(miBackEnd + 'Profesor/Registro', respuestaDeServidor);
}

function respuestaDeServidor(respuesta){
    var objetoProf = JSON.parse(respuesta);
    $("respuesta").innerHTML=respuesta;
}

function enviarInfoDeProf(servidor, funcionARealizar){

    //declaro el objeto
    var xmlhttp = new XMLHttpRequest(); 

    //agrega datos para pasar por POST
    var datos = new FormData();
   
    datos.append("nombre",$("txtNewNombreProf").value);
    datos.append("apellido",$("txtNewApellidoProf").value);
    datos.append("direccion",$("txtNewDireccionProf").value);
    datos.append("telefono",$("txtNewTelefonoProf").value);
    datos.append("especialidad",$("txtNewEspProf").value);
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