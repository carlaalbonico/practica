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
    clickConsultarRutina();
    oculta('botonAtras');
    
    //oculta('rutinas');
    oculta('formularioModificarRutina'); 
    oculta('cartel'); 
    //boton para cerrar sesion 
    document.getElementById("logOut").addEventListener("click",cerrarSesion);
    //boton para perfil usuario logueado
    document.getElementById("perfil").addEventListener("click",mostrarPerfil);

    document.getElementById("botonAtras").addEventListener("click",atras);

   
    
    document.getElementById('btnGuardarRutina').addEventListener("click",click);
   
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
   
    muestra('rutinas');
    oculta('formularioModificarRutina'); 
    oculta('cartel'); 

}
function clickRegistrarRutina(){
    window.location.assign("http://localhost/practica/rutina/registrarRutina.html");//aca va el enlace de la pagina registrar; 
}

function clickConsultarRutina(){
    muestra('botonAtras');
   
    muestra('rutinas');
    oculta('formularioModificarRutina'); 
    oculta('cartel'); 
    cargarSkeletonTablaRutinas();
    enviarParametrosGET(miBackEnd + 'Rutina',retornoDelClickConsultarRutina);
    
}
function cargarSkeletonTablaRutinas(){
    var opciones = [];

    for(let i=0; i < 5; i++){
        opciones.push(
            '<tr>' +
                '<td><p id="skeletonTablaRutinas">' + "-" + '</p></td>' +
                '<td><p id="skeletonTablaRutinas">' + "-" + '</p></td>' +
                '<td><p id="skeletonTablaRutinas">' + "-" + '</p></td>' +
                
                '<td><p id="skeletonTablaRutinas">' + "-" + '</p></td>' +
            '</tr>'
        );
    }

    $('tableRutina').innerHTML = opciones.join('');
    
}



function retornoDelClickConsultarRutina(valor){
    
     rutinas =JSON.parse(valor);
    opciones=[]; 
            rutinas.forEach(element => {
                opciones.push('<tr >'+
                '<th scope="row">'+element.nombre+'</th>'+
                '<td>'+element.descripcion+'</td>'+
                '<td>'+element.salon+'</td>'+
             
                '<td><button class="btn  btn-danger modificacion" type="button" onclick="clickModifRutina('+element.idRutina+')">Modificar</button></td>'+
            
                '</tr>' );
                
            });

            $('tableRutina').innerHTML = opciones.join('');
 
}

function clickModifRutina(idRutina){
    
    
            
            swal({
                title: "Modificar",
                text: "¿Esta seguro que desea modificar esta rutina?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((willDelete) => {
                if (willDelete) {

                    extra= idRutina;
                    validar(); 
                } 
              });
  

}


function validar(){
    muestra('botonAtras');
    oculta('rutinas'); 
    muestra('formularioModificarRutina'); 
    oculta('cartel');
    enviarParametrosGET(miBackEnd + 'Rutina', retornoDelClickModificarRutina);
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


    function retornoDelClickModificarRutina(valor){

        var rutinas =JSON.parse(valor);
            var nombre;
            var descripcion;
            var idsalon; 
    
        console.log(rutinas); 
         
            rutinas.forEach(element => {
            if(element.idRutina==extra){
            
            nombre = element.nombre;
            descripcion = element.descripcion;
            idsalon=element.salon; 
            }
            
        });
       
            $("txtNombre").value = nombre;
            $("txtDescripcion").value = descripcion;
            $("slctDatosSalon").value=idsalon;
            
    }
    
function click(){
  
         enviarInfo(miBackEnd + 'Rutina/Actualizacion/'+extra, respuestaDeServidor);
}
     
function respuestaDeServidor(respuesta){
        swal("Genial!", '"'+respuesta+'"', "success");
        clickConsultarRutina();
        
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

function enviarInfo(servidor, funcionARealizar){

    //declaro el objeto
    var xmlhttp = new XMLHttpRequest(); 

    //agrega datos para pasar por POST
    var datos = new FormData();
    datos.append("nombre",$("txtNombre").value);
    datos.append("descripcion",$("txtDescripcion").value);
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
                swal("Error", "revise los datos cargados", "error");
            };
        }
    }
    //esto va siempre cuando se hace un formulario
    xmlhttp.setRequestHeader("enctype","multipart/form-data");
    //envio el mensaje 
    xmlhttp.send(datos);
}