addEventListener("load",load)

//var miBackEnd = '/practica/serv/';
var miBackEnd = 'http://localhost:555/';

function $(nombre)
{
    return document.getElementById(nombre);
}

function load(){
    $('txtEmail').addEventListener("change", comprobarCorreo);
   
    $('btnEnviar').addEventListener("click",click);
    document.getElementById("btnClose").addEventListener("click",oculta);
}

function oculta(){
    if (document.getElementById){ //se obtiene el id
    var el = document.getElementById('cartel'); 
    el.style.display = (el.style.display == 'none') ? 'block' : 'none'; 
    
    }

}

function comprobarCorreo(){
    var Email = $('txtEmail').value;
    var pattEmail = new RegExp(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/);
    var testEmail = pattEmail.test(Email);

    if( testEmail ){
        $('btnEnviar').disabled = false;
       
    }else{
        $('btnEnviar').disabled = true;
        $("respuesta").style.color = 'red';
        $('respuesta').innerHTML = "Correo electrónico incompleto";
    }
}


function click(){
    $("btnEnviar").disabled=true;
    enviarEmailRecuperacion(miBackEnd + 'Usuario/Recuperacion', respuestaDeServidor);
    muestra('cartel');
    $("respuesta").innerHTML="procesando informacion";
}

function respuestaDeServidor(respuesta){
    //var objetoUsuario = JSON.parse(respuesta);
    $("respuesta").innerHTML=respuesta;
}

function enviarEmailRecuperacion(servidor, funcionARealizar){

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
                alert("Ocurrió un error");
            };
        }
    }
    //esto va siempre cuando se hace un formulario
    xmlhttp.setRequestHeader("enctype","multipart/form-data");
    //envio el mensaje 
    xmlhttp.send(datos);
}