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

    muestra('botonesAdminProf'); 
    oculta('menuConsultarProf');
    oculta('botonesAdminParaUnProf'); 
    oculta('formularioModificarProf'); 
    oculta('cartel');
    //boton para cerrar sesion 
    document.getElementById("logOut").addEventListener("click",cerrarSesion);
    //boton para perfil usuario logueado
    document.getElementById("perfil").addEventListener("click",mostrarPerfil);
    
    //cuando elige la opcion de consultar socio en el menu
    document.getElementById("btnConsultarProf").addEventListener("click",clickConsultarProf);
    //cuando elige la opcion de registrar socio en el menu
    document.getElementById("btnRegistrarProf").addEventListener("click",clickRegistrarProf);
   
    //cuando escribe un nombre y hace click en buscar
    document.getElementById("btnBuscarProf").addEventListener("click",clickBuscarProf);
    
    //cuando elige el prof y hace click en boton consultar prof
    document.getElementById("btnConsultarProf2").addEventListener("click",clickConsultarProf2);

    document.getElementById("btnModificarProf").addEventListener("click",clickModificarProf);
    
    document.getElementById("btnBorrarProf").addEventListener("click",clickBorrarProf);

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

function atras(){ }



function clickConsultarProf(){//oculta la botonera y visualiza el campo para escribir el email 
    oculta('botonesAdminProf'); 
    muestra('menuConsultarProf'); 
    //enviarMensajeAlServidor("/Provincias/Backend/", cargarOpcionesProvincia);
   
    //enviarParametrosGET(miBackEnd + 'Socio',retornoDelClick);
}
function clickBuscarProf(){
    $('btnConsultarProf').disabled=false;
    enviarParametrosGET(miBackEnd + 'Profesor',cargarOpcionesConsultarProf); 
}

function cargarOpcionesConsultarProf(nroProf){
    var nombreBuscar = document.getElementById('txtNombreBuscar').value;
    var profes= JSON.parse(nroProf);
    console.log(profes);
    profes.sort(function (x, y) { return x.nombre.localeCompare(y.nombre) });
    var profesFiltrados= profes.filter( item =>{
        var nombreMin= item.nombre.toLowerCase(); 
        return nombreMin.includes(nombreBuscar.toLowerCase())
    }); 
    
    
    var opciones = ['<option value=0>Seleccione un profesor</option>']

    profesFiltrados.forEach(element => {
        opciones.push('<option value="' + element.legajo + '">' + element.nombre +' '+ element.apellido + '</option>');
    });
    
    $("slctDatosProf").innerHTML = opciones;
}


function clickConsultarProf2(){
    
    //enviarMensajeAlServidor("/Provincias/Backend/?provincia="+ valorProvincia,cargarOpcionesLocalidad);
    var legajo= document.getElementById("slctDatosProf").value; 
    
    enviarParametrosGET(miBackEnd + 'Profesor/'+legajo, retornoDelClickConsultarProf2);
    
}
 
function retornoDelClickConsultarProf2(respuesta){
    oculta('cartel');

    muestra('botonesAdminParaUnProf'); 
    oculta('menuConsultarProf'); 
    oculta('formularioModificarProf'); 
    oculta('botonesAdminProf'); 

    var profe = JSON.parse(respuesta);
    $("legajoProf").innerHTML = profe.legajo;
    $("nombreProf").innerHTML = profe.nombre;
    $("apellidoProf").innerHTML = profe.apellido;
    $("direccionProf").innerHTML = profe.direccion;
    $("telefonoProf").innerHTML = profe.telefono;
    $("emailProf").innerHTML = profe.email;
    $("especialidadProf").innerHTML = profe.especialidad;
    $("altaProf").innerHTML = profe.fechaDeAlta;

    

    //$("respuesta").innerHTML=respuesta;
    if(profe['legajo'] == 0){
        
        $("respuesta").innerHTML="Seleccione un profesor";
    }
     
}
function clickModificarProf(){

    //enviarMensajeAlServidor("/Provincias/Backend/?provincia="+ valorProvincia,cargarOpcionesLocalidad);
    var idProfMod= document.getElementById("slctDatosProf").value; 
    
    enviarParametrosGET(miBackEnd + 'Socio/'+idProfMod, retornoDelClickModificarProf);
   
}
function retornoDelClickModificarProf(respuesta){
    oculta('cartel');
    oculta('botonesAdminParaUnProf');
    muestra('formularioModificarProf'); 
    
     
    var profMod = JSON.parse(respuesta);
    
    
   $("nombreProfModificar").value = profMod["nombre"];
   $("apellidoProfModificar").value = profMod["apellido"];
   $("direccionProfModificar").value = profMod["direccion"];
   $("telefonoProfModificar").value = profMod["telefono"];
   $("especialidadProfModificar").value = profMod["especialidad"];

   $('nombreProfModificar').addEventListener("keyup", validarProfModificar);
   $('apellidoProfModificar').addEventListener("keyup", validarProfModificar);
   $('direccionProfModificar').addEventListener("keyup", validarProfModificar);
   $('telefonoProfModificar').addEventListener("keyup",validarProfModificar);
   $('especialidadProfModificar').addEventListener("keyup",validarProfModificar);
   $('btnModificarGuardar').addEventListener("click",clickGuardarModSocio);
    
}
function validarProfModificar(){
    var ModNombre = $("nombreProfModificar").value.length;
    var ModApellido = $("apellidoProfModificar").value.length;
    var ModDireccion = $("direccionProfModificar").value.length;
    var ModTelefono = $("telefonoProfModificar").value.length;
    var ModEspec = $("especialidadProfModificar").value.length;

    if( ModNombre >=2 && ModApellido >=2  && ModDireccion >=2 && ModTelefono >=8 && ModEspec>3){
        $('btnModificarGuardar').disabled = false;
    }else{
        $('btnModificarGuardar').disabled = true;
    }

}
function clickBorrarProf(legajo){
    if(confirm('¿Esta seguro que desea borrar a este profesor?')){
        //pasar los parametros para borrar 
        //enviarParametrosGET(miBackEnd + 'Profesor/'+idProfMod, retornoDelClickBorrarProf);  
    }
}
function retornoDelClickBorrarProf(){
    //confirmacion de borrado
}
     



function clickRegistrarProf(){
    window.location.assign("http://localhost/practica/profesor/registrarProfe.html");//aca va el enlace de la pagina registrar; 
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