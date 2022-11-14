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
    muestra('Salon'); 
    oculta('botonAtras');
    oculta('formularioModificarSalon');
    oculta('cartel'); 
    //boton para cerrar sesion 
    document.getElementById("logOut").addEventListener("click",cerrarSesion);
    //boton para perfil usuario logueado
    document.getElementById("perfil").addEventListener("click",mostrarPerfil);

    document.getElementById("botonAtras").addEventListener("click",atras);
    enviarParametrosGET(miBackEnd + 'Salon',cargarSalon); 
    
    document.getElementById ('tableSalon').addEventListener('click',clickModifSalon); 
    document.getElementById('btnGuardarSalon').addEventListener("click",click);
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
function atras(){ 
    

}


function cargarSalon(valor){
    var salon =JSON.parse(valor);

console.log(salon);
var opciones=[]; 
    salon.forEach(element => {
        opciones.push('<tr >'+
        '<th scope="row">'+element.idSalon+'</th>'+
        '<td>'+element.nombreSalon+'</td>'+
        '<td>'+element.capacidad+'</td>'+
        '<td>'+element.estado+'</td>'+
        
    
        '<td><button class="btn btn-danger modificacion"  id="'+element.idSalon+'">Modificar</button></td>'+

        '</tr>' );
        
    });
$('tableSalon').innerHTML=opciones; 
}




function clickModifSalon(){
    
    let modificacion = document.querySelectorAll(".modificacion"); 
    var idDeBoton=0; 
    modificacion.forEach((boton) => {
      boton.addEventListener("click", function(e){
        e.preventDefault();
        
        console.log(boton.id); 
        idDeBoton= boton.id; 
        extra=  idDeBoton;
       
        if (idDeBoton!=0){
            if(confirm('¿Esta seguro que desea modificar este salon?')){
            validar(); 
            }}      
       return  idDeBoton; 
      })
    });
    
    

}

function validar(){
    muestra('botonAtras');
    muestra('formularioModificarSalon');
    oculta('Salon');
    oculta('cartel'); 
    enviarParametrosGET(miBackEnd + 'Salon',retornoDelClickModificarSalon);
}


    function retornoDelClickModificarSalon(valor){

        var salon =JSON.parse(valor);
          var nombre; 
          var capacidad; 
          var estado;  
    
        console.log(salon); 
         
            salon.forEach(element => {
            if(element.idSalon==extra){
            
            nombre = element.nombreSalon;
            capacidad = element.capacidad;
            estado = element.estado;
            }
            
        });
        
            $("txtNombre").value = nombre;
            $("txtCapacidad").value = capacidad;
            
            
    }
    
    function click(){
  
         enviarInfo(miBackEnd + 'Salon/Actualizacion/'+extra, respuestaDeServidor);
     }
     
     function respuestaDeServidor(respuesta){
         muestra('cartel');
         $("respuesta").innerHTML=respuesta;
        
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
function enviarInfo(servidor, funcionARealizar){

    //declaro el objeto
    var xmlhttp = new XMLHttpRequest(); 

    //agrega datos para pasar por POST
    var datos = new FormData();
    datos.append("nombreSalon",$("txtNombre").value);
    datos.append("capacidad",$("txtCapacidad").value);
    datos.append("estado",$("slctEstado").value);
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