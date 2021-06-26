//agrega funcion load a HTML; 
addEventListener("load",load)
 
//variable del servidor
var miBackEnd = '';

//DOM
function $(nombre)
{
    return document.getElementById(nombre)
}


function load(){
    //alert(boton)
    document.getElementById("btnGuardar").addEventListener("click",enviarParametrosPOST)
}


function enviarParametrosPOST(){

    //declaro el objeto
    var xmlhttp = new XMLHttpRequest(); 

    //agrega datos para pasar por POST
    var datos = new FormData();

    datos.append("newEmail",$("txtNewEmail").value);
    datos.append("newPass",$("txtNewPass").value);
      
    //indico hacia donde va el mensaje
    xmlhttp.open ("POST", miBackEnd, true); 

    //seteo el evento
    xmlhttp.onreadystatechange = function(){
        //veo si llego la respuesta del servidor
        if(xmlhttp.readyState==XMLHttpRequest.DONE){
            //reviso si la respuesta del servidor es la correcta
            if(xmlhttp.status==200){
                console.log(xmlhttp.response);
                alert(xmlhttp.responseText);

            }else{
                alert("ocurrio un errorcwewe3")
            };
        }
    }
    //esto va siempre cuando se hace un formulario
    xmlhttp.setRequestHeader("enctype","multipart/form-data");

    //envio el mensaje 
    xmlhttp.send(datos);


}