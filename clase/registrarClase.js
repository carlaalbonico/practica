addEventListener("load",load)

//var miBackEnd = '/practica/serv/';
var miBackEnd = 'http://localhost:555/';

function $(nombre)
{
    return document.getElementById(nombre);
}

function load(){
    oculta_muestra('cartel');
    
    //boton para cerrar sesion 
    document.getElementById("logOut").addEventListener("click",cerrarSesion);
    //boton para perfil usuario logueado
    document.getElementById("perfil").addEventListener("click",mostrarPerfil);
    document.getElementById("botonAtras").addEventListener("click",atras);

    enviarParametrosGET(miBackEnd + 'Profesor',cargarOpcionesProf);
    enviarParametrosGET(miBackEnd + 'Salon',cargarOpcionesSalon);
    // preguntar por el email! 
   
    $('txtNewClase').addEventListener("keyup", validarCampos);
    $('txtNewMod').addEventListener("keyup", validarCampos);
    $('txtNewDias').addEventListener("keyup", validarCampos);
    $('txtNewHoraInicio').addEventListener("keyup", validarCampos);
    $('txtNewHoraFin').addEventListener("keyup", validarCampos);
    $('txtNewCupos').addEventListener("keyup", validarCampos);
    
    $('btnGuardarClase').addEventListener("click",click);
    
}


function oculta(id){
    if (document.getElementById){ //se obtiene el id
    var el = document.getElementById('cartel'); 
    el.style.display = (el.style.display == 'none') ? 'block' : 'none'; 
    
    }

}
function oculta_muestra(id){
    if (document.getElementById){ //se obtiene el id
    var el = document.getElementById(id); 
    el.style.display = (el.style.display == 'none') ? 'block' : 'none'; 

    }

}
function atras(){
    window.location.assign("http://localhost/practica/profesor/menuAdminProf.html");//aca va el enlace de la pagina registrar; 
}
function cerrarSesion() {
    sessionStorage.clear();
    window.location.assign("http://localhost/practica/login.html");
}
function mostrarPerfil(){
    window.location.assign("http://localhost/practica/perfilUsuario.html");
}
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
    
    if( NewClase >=2 && NewMod >=2  && NewHoraInicio >=2 && NewHoraFin>=8 && NewCupos>=1 && validarSlctProf != '' && validarSlctProf != '' ){
        $('btnGuardarClase').disabled = false;
    }else{
        $('btnGuardarClase').disabled = true;
    }
    
}

function click(){
    $("btnGuardarClase").disabled=true;
    enviarInfoDeClase(miBackEnd + 'Clase/Registro', respuestaDeServidor);
}

function respuestaDeServidor(respuesta){
   
    
    $("txtNewClase").value='';
    $("txtNewMod").value='';
    $("txtNewDias").value='';
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
                alert("Ocurrio un error");
            }
        }
    }
    //Envio el mensaje
    xmlhttp.send();
}

function enviarInfoDeClase(servidor, funcionARealizar){

    //declaro el objeto
    var xmlhttp = new XMLHttpRequest(); 

    //agrega datos para pasar por POST
    var datos = new FormData();
    datos.append("tipoClase",$("txtNewClase").value);
    datos.append("modalidad",$("txtNewMod").value);
    datos.append("dias",$("txtNewDias").value);
    datos.append("horaDeInicio",$("txtNewHoraInicio").value);
    datos.append("horaDeFin",$("txtNewHoraFin").value);
    datos.append("fechaDeInicio",$("txtNewFechaInicio").value);
    datos.append("fechaDeFin",$("txtNewFechaFin").value);
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
                alert("Ocurrió un error");
            };
        }
    }
    //esto va siempre cuando se hace un formulario
    xmlhttp.setRequestHeader("enctype","multipart/form-data");
    //envio el mensaje 
    xmlhttp.send(datos);
}