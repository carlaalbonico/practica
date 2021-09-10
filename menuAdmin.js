//agrega funcion load a HTML; 
addEventListener("load",load)
 
//variable del servidor
var miBackEnd = 'http://localhost:555/';

//DOM
function $(nombre)
{
    return document.getElementById(nombre);
}


function load(){
    
    document.$("btnConsultar").addEventListener("click",clickConsultar);
    
    document.$("btnRegistrar").addEventListener("click",clickRegistrar);

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

function clickConsultar(){
    
    enviarParametrosGET(miBackEnd + "socio/consultar",abrirConsultar);
}

function abrirConsultar(){
    oculta_muestra('consultarSocio');
   
   // window.location.assign("http://localhost/practica/consultarSocio.html");//aca va el enlace de la pagina consulta; 
}

function clickRegistrar(){
    enviarParametrosGET(miBackEnd + "socio/registrar",abrirRegistrar); 
}

function abrirRegistrar(){
     window.location.assign("http://localhost/practica/registrarSocio.html");//aca va el enlace de la pagina registrar; 
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