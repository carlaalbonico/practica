//agrega funcion load a HTML; 
addEventListener("load",load)
 
//variable del servidor
var miBackEnd = '/practica/serv/';

//DOM
function $(nombre)
{
    return document.getElementById(nombre);
}


function load(){
    //alert(boton)
    document.getElementById('txtEmail').addEventListener("keyup", validar);
    document.getElementById('txtPass').addEventListener("keyup", validar);
    document.getElementById("btnEnviar").addEventListener("click",click);

}

function validar(){

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
    //enviarMsjeServidor(miBackEnd, retornoDelClick);
    $("btnEnviar").disabled=true;
    enviarParametrosPOST(miBackEnd, retornoDelClick);
    //se suele mostrar antes de la respuesta del servidor
    //alert("despues de la llamada");

}

function retornoDelClick(respuesta){
    $("txtEmail").value = "";
    $("txtPass").value = "";
    $("respuesta").innerHTML=respuesta;
    
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