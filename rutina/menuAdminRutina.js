//agrega funcion load a HTML; 
addEventListener("load",load)
 
//variable del servidor
var miBackEnd = 'http://localhost:555/';
var extra= 0; 
//DOM
function $(nombre)
{
    return document.getElementById(nombre);
}


function load(){
     
    oculta('botonAtras');
    muestra('botonesAdmin'); 
    oculta('rutinas');
    oculta('formularioModificarRutina'); 
    oculta('cartel'); 
    //boton para cerrar sesion 
    document.getElementById("logOut").addEventListener("click",cerrarSesion);
    //boton para perfil usuario logueado
    document.getElementById("perfil").addEventListener("click",mostrarPerfil);

    document.getElementById("botonAtras").addEventListener("click",atras);

    document.getElementById("btnConsultarRutina").addEventListener("click",clickConsultarRutina);
    document.getElementById("btnRegistrarRutina").addEventListener("click",clickRegistrarRutina);
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
    oculta('botonAtras');
    muestra('botonesAdmin'); 
    oculta('rutinas');
    oculta('formularioModificarRutina'); 
    oculta('cartel'); 

}
function clickRegistrarRutina(){
    window.location.assign("http://localhost/practica/rutina/registrarRutina.html");//aca va el enlace de la pagina registrar; 
}

function clickConsultarRutina(){
    muestra('botonAtras');
    oculta('botonesAdmin'); 
    muestra('rutinas');
    oculta('formularioModificarRutina'); 
    oculta('cartel'); 
    enviarParametrosGET(miBackEnd + 'Rutina',retornoDelClickConsultarRutina);
    enviarParametrosGET(miBackEnd + 'Salon',cargarOpcionesSalon);
}
function cargarOpcionesSalon(nro){
    
    var salon= JSON.parse(nro);
    console.log(salon);
    salon.sort(function (x, y) { return x.nombreSalon.localeCompare(y.nombreSalon) });

    var opciones = []

    salon.forEach(element => {
        opciones.push('<option value="' + element.idSalon + '">' + element.nombreSalon +' capacidad:'+ element.capacidad + '</option>');
    });
    
    $("slctDatosSalon").innerHTML = opciones;

   
}

function retornoDelClickConsultarRutina(valor){
    
    var rutinas =JSON.parse(valor);
            var opciones=[]; 
            rutinas.forEach(element => {
                opciones.push('<tr >'+
                '<td>'+element.nombre+'</td>'+
                '<td>'+element.descripcion+'</td>'+
                '<td>'+element.salon+'</td>'+
             
                '<td><button class="btn  btn-danger modificacion" type="button" id="'+element.idClase+'">Modificar</button></td>'+

                '</tr>' );
                
            });

        $('tableRutina').innerHTML=opciones; 
 
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
    datos.append("nombre",$("txtNewRutina").value);
    datos.append("descripcion",$("txtNewDescrip").value);
    datos.append("salon",$("slctDatosSalon").value);
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