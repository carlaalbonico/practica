addEventListener("load",load)
var usuario= sessionStorage.getItem('nombre');
//var miBackEnd = '/practica/serv/';
var miBackEnd = 'http://localhost:555/';

function $(nombre)
{
    return document.getElementById(nombre);
}

function load(){
    cargarBienvenido(usuario);
    oculta_muestra('cartel');
    
    //boton para cerrar sesion 
    document.getElementById("logOut").addEventListener("click",cerrarSesion);
    //boton para perfil usuario logueado
    document.getElementById("perfil").addEventListener("click",mostrarPerfil);
    document.getElementById("botonAtras").addEventListener("click",atras);

    enviarParametrosGET(miBackEnd + 'Actividad',cargarOpcionesClase);
    document.getElementById ('slctNewClase').addEventListener('change',traerProfesoresPorEspecialidad);
    enviarParametrosGET(miBackEnd + 'Salon',cargarOpcionesSalon);
    // preguntar por el email! 
   
    
    document.getElementById('btnGuardarClase').addEventListener("click",click);
    
}
function cargarBienvenido(usuario){
    $('bienvenido').innerHTML='Bienvenido, '+usuario
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
function oculta_muestra(id){
    if (document.getElementById){ //se obtiene el id
    var el = document.getElementById(id); 
    el.style.display = (el.style.display == 'none') ? 'block' : 'none'; 

    }

}
function atras(){
    window.location.assign("http://localhost/practica/clase/menuAdminClase.html");//aca va el enlace de la pagina registrar; 
}
function cerrarSesion() {
    sessionStorage.clear();
    window.location.assign("http://localhost/practica/login.html");
}
function mostrarPerfil(){
    window.location.assign("http://localhost/practica/perfilUsuario.html");
}
function cargarOpcionesClase(nro){
    var clase= JSON.parse(nro);
    console.log(clase);
    clase.sort(function (x, y) { return x.nombre.localeCompare(y.nombre) });

    var opciones = ['<option value="0">Seleccione una clase</option>']

   clase.forEach(element => {
        opciones.push('<option value="' + element.idActividad +'">' + element.nombre + '</option>');
    });
    
    $("slctNewClase").innerHTML = opciones; 
}


function devuelveTextoDelSelect(campo){
    var el= document.getElementById(campo);

   //para obtener el valor del select
   var seleccionada = el.options[el.selectedIndex].textContent;
   
   console.log(seleccionada); 

   return seleccionada; 
   
}
function traerProfesoresPorEspecialidad(){
    enviarParametrosPOSTEsp(miBackEnd + 'Profesor/Especialidad',cargarOpcionesProf);}

function cargarOpcionesProf(nroProf){
    
    var profes= JSON.parse(nroProf);
    console.log(profes);
    profes.sort(function (x, y) { return x.nombre.localeCompare(y.nombre) });

    var opciones = []

    profes.forEach(element => {
        opciones.push('<option value="' + element.legajo + '">' + element.nombre +' '+ element.apellido + '</option>');
    });
    
    $("slctDatosProf").innerHTML = opciones;

   
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
function validarCampos(){
    var NewClase = $("txtNewClase").value.length;
    var NewMod = $("txtNewMod").value.length;
    var NewDias = $("txtNewDias").value.length;
    var NewHoraInicio = $("txtNewHoraInicio").value.length;
    var NewHoraFin = $("txtNewHoraFin").value.length;
    
    var validarSlctProf = document.getElementById("slctDatosProf").value;
    var validarSlctSalon= document.getElementById("slctDatosSalon").value;
    
    if( NewClase >=2 && NewMod >=2   && NewCupos>=1 && validarSlctProf != '' && validarSlctProf != '' ){
        $('btnGuardarClase').disabled = false;
    }else{
        $('btnGuardarClase').disabled = true;
    }
    
}

function click(){
   // $("btnGuardarClase").disabled=true;
    enviarInfoDeClase(miBackEnd + 'Clase/Registro', respuestaDeServidor);
    swal("Cargando","", "info",{button: false});
}

function respuestaDeServidor(respuesta){
    swal("Guardado!", '"'+respuesta+'"', "success");
    
    $("slctNewClase").value='';
    $("slctNewMod").value='';
    $("slctNewDias").value='';
    $("txtNewHoraInicio").value='';
    $("txtNewHoraFin").value='';
    $("txtNewCupos").value='';
    
    $('btnGuardarClase').disabled = false;
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
                swal("Error al guardar", "revise los datos cargados", "error");
            }
        }
    }
    //Envio el mensaje
    xmlhttp.send();
}

function enviarInfoDeClase(servidor, funcionARealizar){

    var id= $("slctNewClase").value; 
    dias = $("slctNewDias").textContent; 
 console.log(id); 
 console.log($("slctNewMod").value);
 console.log(dias); 
    //declaro el objeto
    var xmlhttp = new XMLHttpRequest(); 

    //agrega datos para pasar por POST
    var datos = new FormData();
    datos.append("tipoActividad",$("slctNewClase").value);
    datos.append("modalidad",$("slctNewMod").value);
    datos.append("dias",$("slctNewDias").value);
    datos.append("horaDeInicio",$("txtNewHoraInicio").value);
    datos.append("horaDeFin",$("txtNewHoraFin").value);
    datos.append("fechaDeInicio",$("txtNewFechaInicio").value);
    datos.append("cupos",$("txtNewCupos").value);
    datos.append("profesor",$("slctDatosProf").value);
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

function enviarParametrosPOSTEsp(servidor, funcionARealizar){


    var especialidad=devuelveTextoDelSelect("slctNewClase"); 
    //declaro el objeto
    var xmlhttp = new XMLHttpRequest(); 

    //agrega datos para pasar por POST
    var datos = new FormData();
    datos.append('especialidad',especialidad);
   

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