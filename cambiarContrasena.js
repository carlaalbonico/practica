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
    
    document.getElementById("txtContrasena").addEventListener("keyup", validar);
    document.getElementById("txtRepetidaContrasena").addEventListener("keyup", validar);
    document.getElementById("btnGuardar").addEventListener("click",click);

}

function validar(){

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



function click(){
    
    $("btnGuardar").disabled=true;
    enviarParametrosPOST(miBackEnd + 'Usuario/CambioDeContrasena', retornoDelClick);
   

}

function retornoDelClick(respuesta){
    $("txtContrasena").value = "";
    $("txtRepetidaContrasena").value = "";
    
    
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