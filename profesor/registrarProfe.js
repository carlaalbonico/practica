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
    //boton para ir atras
    document.getElementById("botonAtras").addEventListener("click",atras);

   
    
   
    $('txtNewEmailProf').addEventListener("change", comprobarCorreo);
    $('txtNewNombreProf').addEventListener("keyup", validarCampos);
    $('txtNewApellidoProf').addEventListener("keyup", validarCampos);
    $('txtNewDireccionProf').addEventListener("keyup", validarCampos);
    $('txtNewTelefonoProf').addEventListener("keyup", validarCampos);
    $('txtNewEspProf').addEventListener("keyup", validarCampos);
    $('btnGuardarProf').addEventListener("click",click);
    
}
function cargarBienvenido(usuario){
    $('bienvenido').innerHTML='Bienvenido, '+usuario
}

function oculta(id){
    if (document.getElementById){ //se obtiene el id
    var el = document.getElementById(id); 
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
function comprobarCorreo(){
    var NewEmail = $('txtNewEmailProf').value;
    var pattEmail = new RegExp(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/);
    var testEmail = pattEmail.test(NewEmail);

    if( testEmail ){
        $('btnGuardarProf').disabled = false;
        comprobarCorreoEnServidor(miBackEnd + "Usuario/Correo", respuestaDeComprobacion);
    }else{
        $('btnGuardarProf').disabled = true;
        
        swal("Correo", "Correo electrónico incompleto", "error");
    }
}
function respuestaDeComprobacion(respuesta){
    if(respuesta == "Correo duplicado"){
        $("respuesta").style.color = 'red';
        $("respuesta").innerHTML = respuesta;
        $("txtNewNombreProf").disabled = true;
        $("txtNewApellidoProf").disabled = true;
        $("txtNewDireccionProf").disabled = true;
        $("txtNewTelefonoProf").disabled = true;
        $("txtNewEspProf").disabled = true;
        $('btnGuardarProf').disabled = true;
        swal("Correo Duplicado!", '"'+respuesta+'"', "error")
        .then((willDelete) => {
            if (willDelete) {
                
    
                $("txtNewNombre").disabled = false;
                $("txtNewApellido").disabled = false;
                $("txtNewDireccion").disabled = false;
                $("numNewTelefono").disabled = false;
            } 
          });
    }
    else{
        $("txtNewNombreProf").disabled = false;
        $("txtNewApellidoProf").disabled = false;
        $("txtNewDireccionProf").disabled = false;
        $("txtNewTelefonoProf").disabled = false;
        $("txtNewEspProf").disabled = false;
        muestra('cartel');
        $("respuesta").style.color = 'green';
        $("respuesta").innerHTML = respuesta;
        
    }
}

function comprobarCorreoEnServidor(servidor, funcionARealizar){
    var xmlhttp = new XMLHttpRequest(); 

    var datos = new FormData();
    datos.append("email",$("txtNewEmailProf").value);

    xmlhttp.open ("POST", servidor, true); 

    xmlhttp.onreadystatechange = function(){
        
        if(xmlhttp.readyState==XMLHttpRequest.DONE){
            if(xmlhttp.status==200){
                funcionARealizar(xmlhttp.response);
            }else{
                swal("Error al guardar", "revise los datos cargados", "error");
            };
        }
    }
    xmlhttp.setRequestHeader("enctype","multipart/form-data");
    xmlhttp.send(datos);
}

function validarCampos(){
    var NewNombre = $("txtNewNombreProf").value.length;
    var NewApellido = $("txtNewApellidoProf").value.length;
    var NewDireccion = $("txtNewDireccionProf").value.length;
    var NewTelefono = $("txtNewTelefonoProf").value.length;
    var NewEspecialidad = $("txtNewEspProf").value.length;
    
    if( NewNombre >=2 && NewApellido >=2  && NewDireccion >=2 && NewTelefono >=8 && NewEspecialidad>=3 ){
        $('btnGuardarProf').disabled = false;
    }else{
        $('btnGuardarProf').disabled = true;
    }
}

function click(){
    $("btnGuardarProf").disabled=true;
    enviarInfoDeProf(miBackEnd + 'Profesor/Registro', respuestaDeServidor);
}

function respuestaDeServidor(respuesta){
   
    swal("Genial!", '"'+respuesta+'"', "success");
        $("txtNewEmailProf").value='';
        $("txtNewNombreProf").value='';
        $("txtNewApellidoProf").value='';
        $("txtNewDireccionProf").value='';
        $("txtNewTelefonoProf").value='';
        $("txtNewEspProf").value='';
        $('btnGuardarProf').disabled = false;
}

function enviarInfoDeProf(servidor, funcionARealizar){

    //declaro el objeto
    var xmlhttp = new XMLHttpRequest(); 

    //agrega datos para pasar por POST
    var datos = new FormData();
    datos.append("email",$("txtNewEmailProf").value);
    datos.append("nombre",$("txtNewNombreProf").value);
    datos.append("apellido",$("txtNewApellidoProf").value);
    datos.append("direccion",$("txtNewDireccionProf").value);
    datos.append("telefono",$("txtNewTelefonoProf").value);
    datos.append("especialidad",$("txtNewEspProf").value);
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
                swal("Error al guardar", "revise los datos cargados", "error");
            };
        }
    }
    //esto va siempre cuando se hace un formulario
    xmlhttp.setRequestHeader("enctype","multipart/form-data");
    //envio el mensaje 
    xmlhttp.send(datos);
}