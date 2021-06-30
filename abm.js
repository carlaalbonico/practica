//agrega funcion load a HTML; 
addEventListener("load",load)
 
//variable del servidor
var miBackEnd = '/practica/serv/';

//DOM
function $(nombre)
{
    return document.getElementById(nombre)
}


function load(){
    //alert(boton)
    document.getElementById('txtNewEmail').addEventListener("keyup", validar);
    document.getElementById('txtNewPass').addEventListener("keyup", validar);
    document.getElementById("btnGuardar").addEventListener("click",click)
}

function validar(){

    var newEmail = document.getElementById('txtNewEmail').value;
    var newPass = document.getElementById('txtNewPass').value;

    var pattPass = new RegExp(/(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/);
    var pattEmail = new RegExp(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/);

    var resultadoNewPass = pattPass.test(newPass);
    var resultadoNewEmail = pattEmail.test(newEmail);

    if( resultadoNewEmail && resultadoNewPass ){
        $('btnGuardar').disabled = false;
    }else{
        $('btnGuardar').disabled = true;
    }
}

function click(){

    enviarParametrosPOST(miBackEnd, retornoDelClick);
}

function retornoDelClick(respuesta){
    $("btnGuardar").disabled=true;
    $("respuesta").innerHTML=respuesta;
}

function enviarParametrosPOST(servidor, funcionARealizar){

    //declaro el objeto
    var xmlhttp = new XMLHttpRequest(); 

    //agrega datos para pasar por POST
    var datos = new FormData();

    datos.append("newEmail",$("txtNewEmail").value);
    datos.append("newPass",$("txtNewPass").value);
      
    //indico hacia donde va el mensaje
    xmlhttp.open ("POST", servidor, true);

    //seteo el evento
    xmlhttp.onreadystatechange = function(){
        //veo si llego la respuesta del servidor
        if(xmlhttp.readyState==XMLHttpRequest.DONE){
            //reviso si la respuesta del servidor es la correcta
            if(xmlhttp.status==200){
                funcionARealizar(xmlhttp.responseText);
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