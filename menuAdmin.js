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
    
    
    document.$("btnConsultar").addEventListener("click",clickConsultar);
    
    document.$("btnRegistrar").addEventListener("click",clickRegistrar);

}

function clickConsultar(){
    
    enviarParametrosGET(miBackEnd + "socio/consultar",abrirConsultar);
}

function abrirConsultar(){
    window.location.assign("");//aca va el enlace de la pagina consulta; 
}

function clickRegistrar(){
    enviarParametrosGET(miBackEnd + "socio/registrar",abrirRegistrar); 
}

function abrirRegistrar(){
    window.location.assign("");//aca va el enlace de la pagina consulta; 
}


function enviarParametrosGET(servidor,funcionARealizar){

    //Declaro el objeto
    var xmlhttp = new XMLHttpRequest();

    //Indico hacia donde va el mensaje
    xmlhttp.open("GET", servidor, true);

    xmlhttp.onreadystatechange = function(){

        if(xmlhttp.readyState == XMLHttpRequest.DONE){

            if(xmlhttp.status == 200){
                //console.log(xmlhttp.responseText);
                funcionARealizar(xmlhttp.responseText);
            }
            else{
                alert("Ocurrio un error");
            }
        }
    }
    //Envio el mensaje
    xmlhttp.send();
}