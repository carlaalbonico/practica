//agrega funcion load a HTML; 
addEventListener("load",load)
 
var usuario= sessionStorage.getItem('nombre');
//variable del servidor
var miBackEnd = 'http://localhost:555/';
var extra= 0; 
//DOM
function $(nombre)
{
    return document.getElementById(nombre);
}


function load(){
    cargarBienvenido(usuario);
    clickConsultar();
   
    
    oculta('cartel'); 
    //boton para cerrar sesion 
    document.getElementById("logOut").addEventListener("click",cerrarSesion);
    //boton para perfil usuario logueado
    document.getElementById("perfil").addEventListener("click",mostrarPerfil);

 

   
    
    //document.getElementById('btnGuardar').addEventListener("click",click);
   
}
function cargarBienvenido(usuario){
    $('bienvenido').innerHTML='Bienvenido, '+usuario
}

function cerrarSesion() {
    sessionStorage.clear();
    window.location.assign("http://localhost/practica/login.html");
}
function mostrarPerfil(){
    window.location.assign("http://localhost/practica/perfilUsuario.html");
}

function oculta_muestra(id){
    if (document.getElementById){ //se obtiene el id
    var el = document.getElementById(id); 
    el.style.display = (el.style.display == 'none') ? 'block' : 'none'; 
    
    }

}

function muestra(id){
    if (document.getElementById){ //se obtiene el id
    var el = document.getElementById(id); //se define la variable "el" igual a nuestro div

     el.style.display = "block"; 
        
    }

}
function oculta(id){
    if (document.getElementById){ //se obtiene el id
    var el = document.getElementById(id); 
    el.style.display ='none'; 
    
    }

}



function clickConsultar(){
    
   
    muestra('actividad');
    
    oculta('cartel'); 
    cargarSkeletonTabla();
    enviarParametrosGET(miBackEnd + 'Actividad',retornoDelClickConsultar);
    
}
function cargarSkeletonTabla(){
    var opciones = [];

    for(let i=0; i < 5; i++){
        opciones.push(
            '<tr>' +
                '<td><p id="skeletonTabla">' + "-" + '</p></td>' +
                '<td><p id="skeletonTabla">' + "-" + '</p></td>' +
                '<td><p id="skeletonTabla">' + "-" + '</p></td>' +
                
        
            '</tr>'
        );
    }

    $('tableActividad').innerHTML = opciones.join('');
    
}



function retornoDelClickConsultar(valor){
    
     actividad =JSON.parse(valor);
    opciones=[]; 
            actividad.forEach(element => {
                opciones.push('<tr >'+
                '<th scope="row">'+element.idActividad+'</th>'+
                '<td>'+element.nombre+'</td>'+
                
                '</tr>' );
                
            });

            $('tableActividad').innerHTML = opciones.join('');
 
}
function agregarActividad(){
    var nombre; 
    swal("Ingrese el nombre de la nueva actividad",{
        content: "input",
      }).then((value) => {
        nombre=value;
        enviarInfo(miBackEnd + 'Actividad/Registro',respuestaDeServidor,nombre);
      });
}
function respuestaDeServidor(respuesta){
    swal("Guardado!", '"'+respuesta+'"', "success");
    clickConsultar();
    
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
                swal("Error", "revise los datos cargados", "error");
            }
        }
    }
    //Envio el mensaje
    xmlhttp.send();
}
function enviarInfo(servidor, funcionARealizar,nombre){

    //declaro el objeto
    var xmlhttp = new XMLHttpRequest(); 

    //agrega datos para pasar por POST
    var datos = new FormData();
    datos.append("nombre",nombre);

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
                swal("Error", "revise los datos cargados", "error");
            };
        }
    }
    //esto va siempre cuando se hace un formulario
    xmlhttp.setRequestHeader("enctype","multipart/form-data");
    //envio el mensaje 
    xmlhttp.send(datos);
}
