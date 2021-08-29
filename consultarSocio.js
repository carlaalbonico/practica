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
    document.getElementById('txtEmail').addEventListener("keyup", validar);
    
    document.getElementById("btnConsultarSocio").addEventListener("click",click);
}
function validar(){

    var email = document.getElementById('txtEmail').value;

    var pattEmail = new RegExp(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/);

    var resultadoEmail = pattEmail.test(email);

    if( resultadoEmail ){
        $('btnConsultarSocio').disabled = false;
    }else{
        $('btnConsultarSocio').disabled = true;
    }
}



function click(){
    
    $("btnEnviar").disabled=true;
    enviarParametrosPOST(miBackEnd + 'Usuario', retornoDelClick);
   
}
 
function retornoDelClick(respuesta){
    $("txtEmail").value = "";
    
    var objetoUsuario = JSON.parse(respuesta);
    //$("respuesta").innerHTML=respuesta;
    if(objetoUsuario['email'] == null){
        $("respuesta").innerHTML="Correo errónea";
    }

    if(objetoUsuario['email'] != null){
        document.cookie = "email="+objetoUsuario['email'];
        window.location.assign("http://localhost/practica/administrativo.php");
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