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

    enviarParametrosGET(miBackEnd + 'Actividad',cargarOpcionesActividades); 
   
    
    document.getElementById('btnGuardarSusc').addEventListener("click",click);
    
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
    window.location.assign("http://localhost/practica/suscripcion/menuAdminSusc.html");//aca va el enlace de la pagina registrar; 
}
function cerrarSesion() {
    sessionStorage.clear();
    window.location.assign("http://localhost/practica/login.html");
}
function mostrarPerfil(){
    window.location.assign("http://localhost/practica/perfilUsuario.html");
}
function cargarOpcionesActividades(nro){
    var clase= JSON.parse(nro);
    console.log(clase);
    clase.sort(function (x, y) { return x.nombre.localeCompare(y.nombre) });

    var opciones = []

   clase.forEach(element => {
        opciones.push('<option value="' + element.idActividad + '">' + element.nombre + '</option>');
    });
    
    $("slctAct").innerHTML = opciones; 
}




function validarCampos(){
    var NewSusc = $("txtNombre").value.length;
    var NewCant = $("txtCant").value.length;
    var NewDesc = $("txtDesc").value.length;
    var NewPrecio = $("txtPrecio").value.length;
    
    
    var validarSlct= document.getElementById("slctAct").value;
   
    
    if( NewSusc >=2 && NewCant >=1   && NewDesc>=10 && validarSlct != '' && NewPrecio >2 ){
        $('btnGuardarSusc').disabled = false;
    }else{
        $('btnGuardarSusc').disabled = true;
    }
    
}

function click(){
   // $("btnGuardarClase").disabled=true;
    enviarInfoDeSusc(miBackEnd + 'Suscripcion/Registro', respuestaDeServidor);
}

function respuestaDeServidor(respuesta){
    swal("Genial!", '"'+respuesta+'"', "success");
    
    $("txtNombre").value='';
    $("txtCant").value='';
    $("txtDesc").value='';
    $("slctAct").value='';
    $("txtPrecio").value='';
   
    
    $('btnGuardarSusc').disabled = false;
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

function enviarInfoDeSusc(servidor, funcionARealizar){

    //declaro el objeto
    var xmlhttp = new XMLHttpRequest(); 

    //agrega datos para pasar por POST
    var datos = new FormData();
    datos.append("nombre",$("txtNombre").value);
    datos.append("cantClases",$("txtCant").value);
    datos.append("descSuscripcion",$("txtDesc").value);
    datos.append("actividad",$("slctAct").value);
    datos.append("precio",$("txtPrecio").value);
    
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

