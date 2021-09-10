//agrega funcion load a HTML; 
addEventListener("load",load)
 
//variable del servidor
//var miBackEnd = '/practica/serv/';
var miBackEnd = 'http://localhost:555/';

//DOM
function $(nombre)
{
    return document.getElementById(nombre);
}


function load(){
    //alert(boton)
    muestra('cuadroLogin');
    oculta_muestra('cuadroContrasenaNueva');
    document.getElementById('txtEmail').addEventListener("keyup", validarLogin);
    document.getElementById('txtPass').addEventListener("keyup", validarLogin);
    document.getElementById("btnEnviar").addEventListener("click",click);
    //de cambiar contraseña
    document.getElementById("txtContrasena").addEventListener("keyup", validarContrasenia);
    document.getElementById("txtRepetidaContrasena").addEventListener("keyup", validarContrasenia);
    document.getElementById("btnGuardar").addEventListener("click",clickGuardar);

} 

function validarLogin(){

    var email = document.getElementById('txtEmail').value;
    var pass = document.getElementById('txtPass').value;

    var pattPass = new RegExp(/(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/);
    var pattEmail = new RegExp(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/);

    var resultadoPass = pattPass.test(pass);
    var resultadoEmail = pattEmail.test(email);

    if( resultadoEmail && resultadoPass ){
        $('btnEnviar').disabled = false;
    }else{
        $('btnEnviar').disabled = true;
    }
}



function click(){
    
    $("btnEnviar").disabled=true;
    enviarParametrosPOST(miBackEnd + 'Usuario', retornoDelClick);
   

}

function validarContrasenia(){
    var pass1 = document.getElementById("txtContrasena").value;
    var pass2 = document.getElementById("txtRepetidaContrasena").value;

    var pattPass = new RegExp(/(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/);
    

    var resultadoPass = pattPass.test(pass);
    if( pass1 !== pass2){
    $("respuesta").innerHTML="Las contraseñas no coinciden";
    }
    if( pass1 == pass2 && resultadoPass ){
        $("btnGuardar").disabled = false;
    }else{
        $("btnGuardar").disabled = true;
    }
}    

function clickGuardar(){
    
    $("btnGuardar").disabled=true;
    enviarParamCambiarContraseñaPOST(miBackEnd + 'Usuario/CambioDeContrasena', retornoDelClickGuardar);
   

}
function retornoDelClickGuardar(respuesta){
    $("txtContrasena").value = "";
    $("txtRepetidaContrasena").value = "";
    
    
}

function oculta_muestra(id){
    if (document.getElementById){ //se obtiene el id
    var el = document.getElementById(id); 
    el.style.display = (el.style.display == 'none') ? 'block' : 'none'; 
    
    //se define la variable "el" igual a nuestro div
       // if (el.style.display === 'block') {
        //el.style.display = 'none';
       // } //damos un atributo display:none que oculta el div
    }

}

function muestra(id){
    if (document.getElementById){ //se obtiene el id
    var el = document.getElementById(id); //se define la variable "el" igual a nuestro div

    el.style.display = (el.style.display == 'block') ? 'none' : 'block'; 
        //if (el.style.display === 'none') {
        //el.style.display = 'block';
        //} //damos un atributo display:none que oculta el div
    }

}
   
    

function retornoDelClick(respuesta){
    $("txtEmail").value = "";
    $("txtPass").value = "";

    var objetoUsuario = JSON.parse(respuesta);

    if(objetoUsuario['email'] == null){
        $("respuesta").innerHTML="Correo o contraseña errónea";
    }

    if(objetoUsuario['email'] != null && objetoUsuario['idPerfil'] == 'ADMIN' && objetoUsuario['origenDeContrasena'] == 'USU'){
        //document.cookie = "email="+objetoUsuario['email'];
        sessionStorage.setItem("usuario",objetoUsuario['email']);
        window.location.assign("http://localhost/practica/menuAdmin.html");
    }
    
    if(objetoUsuario['email'] != null && objetoUsuario['origenDeContrasena'] == 'SIS'){
        sessionStorage.setItem("usuario",objetoUsuario['email']);
        //window.location.assign("http://localhost/practica/cambiarContrasena.html");
        let email = sessionStorage.getItem("usuario");
        $("emailUsuario").innerHTML=email;
        oculta_muestra('cuadroContrasenaNueva');
        oculta_muestra('cuadroLogin');
        
    }
}

function enviarMsjeServidor(servidor, funcionARealizar){

    //declaro el objeto
    var xmlhttp = new XMLHttpRequest(); 

    //indico hacia donde va el mensaje
    xmlhttp.open ("GET", servidor, true);

    //seteo el evento
    xmlhttp.onreadystatechange = function(){
        //veo si llego la respuesta del servidor
        if(xmlhttp.readyState==XMLHttpRequest.DONE){
            //reviso si la respuesta del servidor es la correcta
            if(xmlhttp.status==200){
                console.log(xmlhttp.response);
                funcionARealizar(xmlhttp.responseText);

            }else{
                alert("ocurrio un error")
            };
        }
    }

    //envio el mensaje 
    xmlhttp.send();


}


function enviarParametrosPOST(servidor, funcionARealizar){

    //declaro el objeto
    var xmlhttp = new XMLHttpRequest(); 

    //agrega datos para pasar por POST
    var datos = new FormData();
    datos.append("email",$("txtEmail").value);
    datos.append("pass",$("txtPass").value);

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
function enviarParamCambiarContraseñaPOST(servidor, funcionARealizar){

    //declaro el objeto
    var xmlhttp = new XMLHttpRequest(); 
    let email = sessionStorage.getItem("usuario");
    //agrega datos para pasar por POST
    var datos = new FormData();
    datos.append("email",email);// parametro de la sesion 
    datos.append("contrasenaNueva",$("txtContrasena").value);

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