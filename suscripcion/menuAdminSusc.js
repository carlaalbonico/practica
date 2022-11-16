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
    clickConsultarSusc();
    oculta('botonAtras');
    oculta('formularioModSusc'); 
    oculta('cartel');
    
    //boton para cerrar sesion 
    document.getElementById("logOut").addEventListener("click",cerrarSesion);
    //boton para perfil usuario logueado
    document.getElementById("perfil").addEventListener("click",mostrarPerfil);

    document.getElementById("botonAtras").addEventListener("click",atras);
    //para que ande el filtro
    document.getElementById ('actividadBuscado').addEventListener('change',validacionActividad); 
    
    document.getElementById('btnGuardarSusc').addEventListener("click",clickGuardarModSusc);
    
}
function cargarBienvenido(usuario){
    $('bienvenido').innerHTML='Bienvenido, '+usuario
}


function cargando(){
    var opciones=[];
    opciones.push('<div class="d-flex justify-content-center mt-5">'+
    '<div class="spinner-grow" role="status">'+
        '<span class="visually-hidden">Loading...</span>'+
    '</div>'+'</div><div class="d-flex justify-content-center mt-2">'+
    ' <div><p class="fw-bold">Cargando...</p></div>'+
'</div>');
$('respuesta').innerHTML = opciones.join(''); 
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
    
    muestra('suscripcion'); 
    
    oculta('formularioModSusc'); 
    oculta('cartel'); 

}
function clickRegistrarSusc(){
    window.location.assign("http://localhost/practica/suscripcion/registrarSusc.html");//aca va el enlace de la pagina registrar; 
}

function clickConsultarSusc(){
    muestra('botonAtras');
    muestra('suscripcion'); 
    
    oculta('formularioModSusc'); 
    oculta('cartel'); 
    cargarSkeletonTablaSusc();
    enviarParametrosGET(miBackEnd + 'Actividad',cargarOpcionesClase); 
    enviarParametrosGET(miBackEnd + 'Suscripcion', retornoDelClickConsultarSusc);
   
    
}
function cargarSkeletonTablaSusc(){
    var opciones = [];

    for(let i=0; i < 5; i++){
        opciones.push(
            '<tr>' +
                '<td><p id="skeletonTablaSusc">' + "-" + '</p></td>' +
                '<td><p id="skeletonTablaSusc">' + "-" + '</p></td>' +
                '<td><p id="skeletonTablaSusc">' + "-" + '</p></td>' +
                
                '<td><p id="skeletonTablaSusc">' + "-" + '</p></td>' +
                '<td><p id="skeletonTablaSusc">' + "-" + '</p></td>' +
            '</tr>'
        );
    }

    $('tableSuscripciones').innerHTML = opciones.join('');
    
}

function validacionActividad(){
  enviarParametrosGET(miBackEnd + 'Suscripcion', retornoDelClickConsultarSusc);
}
function cargarOpcionesClase(nro){
    var clase= JSON.parse(nro);
    console.log(clase);
    clase.sort(function (x, y) { return x.nombre.localeCompare(y.nombre) });

    var opciones = ['<option value="0">Todas</option>']

   clase.forEach(element => {
        opciones.push('<option value="' + element.nombre + '">' + element.nombre + '</option>');
    });
    console.log(opciones); 
    $("actividadBuscado").innerHTML = opciones.join('');    
    
}

function retornoDelClickConsultarSusc(valor){
 var tipoClase= document.getElementById("actividadBuscado").value; 

 console.log(valor);
    var suscrip =JSON.parse(valor);
console.log(suscrip);

    
        if (tipoClase!=0){
            

            suscrip.sort(function (x, y) { return x.nombre.localeCompare(y.nombre) });
            var suscripcionFiltradas= suscrip.filter( item =>{
                var nombreMin= item.nombre.toLowerCase();
                return nombreMin.includes(tipoClase.toLowerCase()); 
                
            }); 

            var opciones=[]; 


            suscripcionFiltradas.forEach(element => {
                opciones.push('<tr ><td>'+element.nombre+'</td>'+
                '<td>'+element.cantClases+'</td>'+
                '<td>'+element.descSuscripcion+'</td>'+
                '<td>'+element.actividad+'</td>'+
                '<td>$'+element.precio+'</td>'+
                '<td><button class="btn bg-danger bg-opacity-75 modificacion"  onclick="clickModifSuscripcion(' + element.idSuscripcion + ')">Modificar</button></td></tr>' );
                
            });


            
        $('tableSuscripciones').innerHTML=opciones.join('');
    
                    

    }else{
        
        var opciones=[]; 

        suscrip.forEach(element => {
            opciones.push('<tr><td>'+element.nombre+'</td>'+
                '<td>'+element.cantClases+'</td>'+
                '<td>'+element.descSuscripcion+'</td>'+
                '<td>'+element.actividad+'</td>'+
                '<td>$'+element.precio+'</td>'+
                '<td><button class="btn bg-danger bg-opacity-75 modificacion"  onclick="clickModifSuscripcion(' + element.idSuscripcion + ')">Modificar</button></td></tr>' );
            
        });

        $('tableSuscripciones').innerHTML=opciones.join('');
    
    }
}

function clickModifSuscripcion(idSuscripcion){
    
    //cartel de validar

    swal({
        title: "Modificar",
        text: "¿Esta seguro que desea modificar a esta suscripcion?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            
            extra=idSuscripcion;
            enviarParametrosGET(miBackEnd + 'Suscripcion/' + idSuscripcion, retornoDelClickModificarSusc);
            oculta('suscripcion');
            muestra('cartel');
            cargando();
            enviarParametrosGET(miBackEnd + 'Actividad',cargarOpcionesClaseMod);
        } 
      });

}



function cargarOpcionesClaseMod(nro){
    var clase= JSON.parse(nro);
    console.log(clase);
    clase.sort(function (x, y) { return x.nombre.localeCompare(y.nombre) });

    var opciones = []

   clase.forEach(element => {
        opciones.push('<option value="' + element.idActividad + '">' + element.nombre + '</option>');
    });
    
    $("slctAct").innerHTML = opciones; 
}



 
 function respuestaDeServidor(respuesta){
    swal("Genial!", '"'+respuesta+'"', "success");
    clickConsultarSusc();
    
 }

 function retornoDelClickModificarSusc(valor){

    oculta('cartel');
    oculta('suscripcion');
    
    muestra('formularioModSusc');
    
    muestra('botonAtras');
    var suscrip= JSON.parse(valor);

    $("txtModNombre").value = suscrip["nombre"];
    $("txtModCant").value = suscrip["cantClases"];
    $("txtModDesc").value = suscrip["descSuscripcion"];
    $("slctAct").value = suscrip["actividad"];
    $("txtModPrecio").value = suscrip["precio"];

   // $('txtModNombre').addEventListener("keyup", validarModificar);
   // $('txModCant').addEventListener("keyup", validarModificar);
    //$('txtModDesc').addEventListener("keyup", validarModificar);
   // $('txtModPrecio').addEventListener("keyup", validarModificar);
   
      
        
}
function validarModificar() {
    var ModNombre = $("txtModNombre").value.length;
    var Modcant = $("txtModCant").value.length;
    var ModDesc = $("txtModDesc").value.length;
    var ModPrecio = $("txtModPrecio").value.length;

    if (ModNombre <= 20 && Modcant >= 2 && ModDesc < 200 && ModPrecio <= 8) {
       $('btnGuardarSusc').disabled = false;//habilitar
    } else {
        $('btnGuardarSusc').disabled = true;
    }

}

function clickGuardarModSusc() {
    
    $("btnGuardarSusc").disabled = true;
   
    enviarInfoDeSusc(miBackEnd + 'Suscripcion/Actualizacion/'+extra, respuestaDeServidor);
}
function respuestaDeServidorMod(respuesta) {

    $("respuesta").innerHTML = respuesta;
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


function enviarInfoDeSusc(servidor, funcionARealizar){

    //declaro el objeto
    var xmlhttp = new XMLHttpRequest(); 

    //agrega datos para pasar por POST
    var datos = new FormData();
   
    datos.append("nombre",$("txtModNombre").value);
    datos.append("cantClases",$("txtModCant").value);
    datos.append("descSuscripcion",$("txtModDesc").value);
    datos.append("actividad",$("slctAct").value);
    datos.append("precio",$("txtModPrecio").value);
    datos.append("idSuscripcion",extra);

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
