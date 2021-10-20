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

    //para ocultar los menus
    muestra('botonesAdmin'); 
    oculta('consultarSocio'); 
    oculta('botonesAdminParaUnSocio'); 
    oculta('formularioModificarSocio'); 
    oculta('formularioChico');
    oculta('inscribirSocioClase'); 
    oculta('registrarPago'); 
    oculta('estadoDeuda');
    oculta('botonAtras');
    
    //para ocultar cartel del mensaje
    oculta_muestra('cartel');

    //boton para cerrar sesion 
    document.getElementById("logOut").addEventListener("click",cerrarSesion);
    //boton para perfil usuario logueado
    document.getElementById("perfil").addEventListener("click",mostrarPerfil);
    
    //cuando elige la opcion de consultar socio en el menu
    document.getElementById("btnMenuConsultarSocio").addEventListener("click",menuConsultarSocio);
    //cuando elige la opcion de registrar socio en el menu
    document.getElementById("btnMenuRegistrarSocio").addEventListener("click",menuRegistrarSocio);
   
    //cuando escribe un nombre y hace click en buscar
    document.getElementById("btnBuscar").addEventListener("click",clickBuscar);
    //cuando elige el socio y hace click en boton consultar socio
    document.getElementById("btnConsultarSocio").addEventListener("click",clickConsultarSocio);

    document.getElementById("btnModificar").addEventListener("click",clickModificarSocio);
    document.getElementById("btnBorrar").addEventListener("click",clickBorrarSocio);
    
    document.getElementById("btnIrRegistrarPago").addEventListener("click",clickRegistrarPago);
    document.getElementById("btnRegistrarPago").addEventListener("click",clickRegistrarPago);
    document.getElementById("btnGenerarCuota").addEventListener("click",clickGenerarCuota);
    document.getElementById("btnEstadoDeuda").addEventListener("click",clickEstadoDeuda);
    document.getElementById("btnInscribirSocioClase").addEventListener("click",clickInscribirSocioClase);
    document.getElementById("btnContinuarClase").addEventListener("click",clickContinuarTipoClase); 
    document.getElementById("botonAtras").addEventListener("click",atras);
    document.getElementById('btnEnviarInscripcion').addEventListener("click",clickEnviarInscripcion); 
    
    document.getElementById('btnRegistrarPagoCuota').addEventListener("click",clickRegistrarPagoCuota); 
    document.getElementById ('tableRegistrarPago').addEventListener('change',calcularTotalPago); 
    
    //close del mensaje 
    document.getElementById("btnClose").addEventListener("click",oculta);
    $('btnConsultarSocio').disabled=true;
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
    oculta('cartel');
    oculta('consultarSocio');
    muestra('botonesAdminParaUnSocio'); 
    oculta('formularioModificarSocio'); 
    oculta('formularioChico');
    oculta('registrarPago'); 
    
    oculta('estadoDeuda');
    oculta('inscribirSocioClase');
    oculta('botonAtras');
    
}

function menuRegistrarSocio(){
    window.location.assign("http://localhost/practica/socio/registrarSocio.html");//aca va el enlace de la pagina registrar; 
}

function menuConsultarSocio(){//oculta la botonera y visualiza el campo para escribir el email 
    oculta('botonesAdmin'); 
    muestra('consultarSocio'); 
    
  
}
function clickBuscar(){
   // $('btnConsultarSocio').disabled=false;
    enviarParametrosGET(miBackEnd + 'Socio',cargarOpcionesConsultar); 
}

function cargarOpcionesConsultar(nroSocio){
    $('btnConsultarSocio').disabled=true;
    var nombreBuscar = document.getElementById('txtNombreBuscar').value;
    var socios = JSON.parse(nroSocio);
    console.log(socios);
    socios.sort(function (x, y) { return x.nombre.localeCompare(y.nombre) });
    var sociosFiltrados= socios.filter( item =>{
        var nombreMin= item.nombre.toLowerCase(); 
        return nombreMin.includes(nombreBuscar.toLowerCase())
    }); 
    
    
    var opciones = []

    sociosFiltrados.forEach(element => {
        opciones.push('<option value="' + element.nroSocio + '">' + element.nombre +' '+ element.apellido + '</option>');
    });
    
    $("slctSocio").innerHTML = opciones;

    var validarSlctSocio = document.getElementById("slctSocio").value;
    if( validarSlctSocio != '' ){
        $('btnConsultarSocio').disabled = false;
    }
}



function clickConsultarSocio(){

    //enviarMensajeAlServidor("/Provincias/Backend/?provincia="+ valorProvincia,cargarOpcionesLocalidad);
    var idSocio= document.getElementById("slctSocio").value; 
    
    enviarParametrosGET(miBackEnd + 'Socio/'+idSocio, retornoClickConsultarSocio);

    if(idSocio == null){
        muestra('cartel');
        $("respuesta").innerHTML="Seleccione un socio";
    }
    muestra('cartel');
  
    $("respuesta").innerHTML="procesando informacion";
}
 
function retornoClickConsultarSocio(respuesta){
    oculta('cartel');
    oculta('consultarSocio');
    muestra('botonesAdminParaUnSocio'); 
    oculta('formularioModificarSocio'); 
    oculta('formularioChico');
    oculta('registrarPago'); 
    
    oculta('estadoDeuda');
    oculta('inscribirSocioClase');
    oculta('botonAtras');
     
    var socio = JSON.parse(respuesta);
    
    $("nroSocio").innerHTML = socio.nroSocio;
    $("nombreSocio").innerHTML = socio.nombre;
    $("apellidoSocio").innerHTML = socio.apellido;
    $("direccionSocio").innerHTML = socio.direccion;
    $("telefonoSocio").innerHTML = socio.telefono;
    $("emailSocio").innerHTML = socio.email;
    $("estadoSocio").innerHTML = socio.estado;
    $("altaSocio").innerHTML = socio.fechaDeAlta;
        

    //$("respuesta").innerHTML=respuesta;
    if(socio['nroSocio'] == null){
        
        $("respuesta").innerHTML="Seleccione un socio";
    }
     
}
function clickModificarSocio(){

    //enviarMensajeAlServidor("/Provincias/Backend/?provincia="+ valorProvincia,cargarOpcionesLocalidad);
    var idSocioMod= document.getElementById("slctSocio").value; 
    
    enviarParametrosGET(miBackEnd + 'Socio/'+idSocioMod, retornoClickModificarSocio);
   
}
function retornoClickModificarSocio(respuesta){
    oculta('cartel');
    oculta('botonesAdminParaUnSocio');
    oculta('registrarPago'); 
    oculta('estadoDeuda');
    oculta('inscribirSocioClase');
    muestra('formularioModificarSocio'); 
    oculta('formularioChico');
    muestra('botonAtras');
    var socioMod = JSON.parse(respuesta);
    
   
    
    $("nombreSocioModificar").value = socioMod["nombre"];
    $("apellidoSocioModificar").value = socioMod["apellido"];
    $("direccionSocioModificar").value = socioMod["direccion"];
    $("telefonoSocioModificar").value = socioMod["telefono"];
    
    $('nombreSocioModificar').addEventListener("keyup", validarSocioModificar);
    $('apellidoSocioModificar').addEventListener("keyup", validarSocioModificar);
    $('direccionSocioModificar').addEventListener("keyup", validarSocioModificar);
    $('telefonoSocioModificar').addEventListener("keyup",validarSocioModificar);
    $('btnModificarGuardar').addEventListener("click",clickGuardarModSocio);
    
}
function validarSocioModificar(){
    var ModNombre = $("nombreSocioModificar").value.length;
    var ModApellido = $("apellidoSocioModificar").value.length;
    var ModDireccion = $("direccionSocioModificar").value.length;
    var ModTelefono = $("telefonoSocioModificar").value.length;

    if( ModNombre >=2 && ModApellido >=2  && ModDireccion >=2 && ModTelefono >=8){
        $('btnModificarGuardar').disabled = false;//habilitar
    }else{
        $('btnModificarGuardar').disabled = true;
    }

}
function clickGuardarModSocio(){
    var nroSocio= document.getElementById("slctSocio").value;
    $("btnModificarGuardar").disabled=true;

    enviarParametrosPOSTModificar(miBackEnd + 'Socio/Actualizacion/'+nroSocio, respuestaDeServidorMod);
}
function respuestaDeServidorMod(respuesta){
    
    $("respuesta").innerHTML=respuesta;
}

function clickBorrarSocio(){
    var nroSocio= document.getElementById("slctSocio").value;
    
    if(confirm('¿Esta seguro que desea borrar a este socio?')){
        //pasar los parametros para borrar 

        enviarParametrosPOSTBorrar(miBackEnd + 'Socio/Borrar/'+nroSocio,respuestaDeServidorBorrar)
    }
}
function respuestaDeServidorBorrar(respuesta){
    muestra('cartel');
    $("respuesta").innerHTML=respuesta;

    muestra('botonesAdmin'); 
    oculta('consultarSocio'); 
    oculta('botonesAdminParaUnSocio'); 
    oculta('formularioModificarSocio'); 
    oculta('formularioChico');
    oculta('inscribirSocioClase'); 
    oculta('registrarPago'); 
    oculta('estadoDeuda');
    oculta('botonAtras');
}

function cargarFormularioChico(respuesta){
    var socioFC= JSON.parse(respuesta);
    $("nroSocioForm").innerHTML = socioFC.nroSocio;
    $("nombreSocioForm").innerHTML = socioFC.nombre;
    $("apellidoSocioForm").innerHTML = socioFC.apellido;
}
function clickRegistrarPago(){
    oculta('cartel');
    oculta('botonesAdminParaUnSocio');
    oculta('formularioModificarSocio'); 
    muestra('formularioChico');
    muestra('registrarPago'); 
    
    oculta('estadoDeuda');
    oculta('inscribirSocioClase');
    muestra('botonAtras');
   //manda los datos para cargar el formularioChico
   var idSocio= document.getElementById("slctSocio").value; 
    
   enviarParametrosGET(miBackEnd + 'Socio/'+idSocio,cargarFormularioChico);

   //manda a llamar a los estados de cuenta del socio
   enviarParametrosGET(miBackEnd + 'Cuota/'+idSocio,mostrarTablaRegistrarPago);  
   
}
function mostrarTablaRegistrarPago(valor){

    $('btnRegistrarPagoCuota').disabled = true;
    var analiza =JSON.parse(valor); 
    console.log(analiza); 

    var opciones=[]; 


    analiza.forEach(element => {
        opciones.push('<tr >'+
            '<th scope="row">'+element.mes+'</th>'+
            '<td>'+element.importe+'</td>'+
            '<td>'+element.fechaVencimiento+'</td>'+
            '<td><input type="checkbox" name="checkBox" class="importes" id="checkBox" value="'+element.importe+'"></td>'+
            
        '</tr>' );
        
    });

    $('tableRegistrarPago').innerHTML=opciones;
    
}

function calcularTotalPago(){
    var checkboxes = document.querySelectorAll(".importes");
    var Total = 0;
     
    checkboxes.forEach((element)=>{
       if(element.checked==true){
        
        Total = parseFloat(Total) + parseFloat(element.value);
       }
    });

    $('precioTotal').innerHTML = Total;
    var validarTotal = document.getElementById('precioTotal').value;
    if( validarTotal != 0 ){
        $('btnRegistrarPagoCuota').disabled = false;
    }
}
function clickRegistrarPagoCuota(){

    enviarParametrosPOSTPago(miBackEnd + 'Pago', respuestaDeServidorPago);
    alert('se mando'); 

}
function respuestaDeServidorPago(respuesta){
    alert('llego'); 
    $("respuestaPago").innerHTML=respuesta;
} 


function clickGenerarCuota(){
    oculta('cartel');
    oculta('botonesAdminParaUnSocio');
    oculta('formularioModificarSocio'); 
    oculta('registrarPago'); 
    oculta('formularioChico');
    
    oculta('estadoDeuda');
    oculta('inscribirSocioClase');
    oculta('botonAtras');
    //hay que arreglarlo

    enviarParametrosGET(miBackEnd + 'Cuota',function(){
        muestra('cartel')
        $("respuesta").innerHTML='Se generaron las cuotas para los clientes'; 
    });
}

function clickEstadoDeuda(){
    oculta('cartel');
    oculta('botonesAdminParaUnSocio');
    oculta('formularioModificarSocio'); 
    oculta('registrarPago'); 
    
    muestra('formularioChico');
    muestra('estadoDeuda');
    oculta('inscribirSocioClase');
    muestra('botonAtras');
    //manda los datos para cargar el formularioChico
    var idSocio= document.getElementById("slctSocio").value; 
    
    enviarParametrosGET(miBackEnd + 'Socio/'+idSocio,cargarFormularioChico);

    //manda a llamar a los estados de cuenta del socio
    enviarParametrosGET(miBackEnd + 'Cuota/Estado/'+idSocio,mostrarTablaEstadoDeuda); 
}

function mostrarTablaEstadoDeuda(valor){

   
    var analiza =JSON.parse(valor); 
    console.log(analiza); 

    var opciones=[]; 


    analiza.forEach(element => {
        opciones.push('<tr >'+
        '<th scope="row">'+element.mes+'</th>'+
        '<td>'+element.importe+'</td>'+
        '<td>'+element.fechaVencimiento+'</td>'+
        '<td>'+element.estado+'</td>'+
        '</tr>' );
        
    });

  

    $('tableEstadoDeuda').innerHTML=opciones;
    


}



function clickInscribirSocioClase(){
    oculta('cartel');
    oculta('botonesAdminParaUnSocio');
    oculta('formularioModificarSocio'); 
    oculta('registrarPago'); 
    
    oculta('estadoDeuda');
    muestra('formularioChico');
    muestra('inscribirSocioClase');
    muestra('botonAtras');
   //manda los datos para cargar el formularioChico
    var idSocio= document.getElementById("slctSocio").value; 
    
    enviarParametrosGET(miBackEnd + 'Socio/'+idSocio,cargarFormularioChico);
     //manda los datos para cargar el select
    enviarParametrosGET(miBackEnd + 'TipoClase',cargarOpcionesClase); 
    
    oculta('continuarClase'); 
}


function cargarOpcionesClase(valor){
    
    
    var clases= JSON.parse(valor);
    clases.sort(function (x, y) { return x.nombre.localeCompare(y.nombre) });
   
    var opciones = ['<option value=0>Seleccione una clase</option>']

    clases.forEach(element => {
        opciones.push('<option value="' + element.idTipoClase + '">' + element.nombre + '</option>');
    });
    
    $("slctTipoClase").innerHTML = opciones;
}
function clickContinuarTipoClase(){
    
   //manda los datos para cargar el formularioChico
    var tipoClase= document.getElementById("slctTipoClase").value; 
    
    
     //manda los datos para cargar el select
    enviarParametrosGET(miBackEnd + 'Clase/'+tipoClase,cargarOpcionesTipoClases); 
    
   
}

function cargarOpcionesTipoClases(valores){
    muestra('continuarClase'); 
    var tipoClases= JSON.parse(valores);
    console.log(tipoClases); 
    tipoClases.sort(function (x, y) { return x.nombre.localeCompare(y.nombre) });
   
    var opciones = ['<option value=0>Seleccione un tipo de clase</option>']

    tipoClases.forEach(element => {
        opciones.push('<option value="' + element.idClase + '">' + element.dias + ' '+element.horaDeInicio+'-'+ element.horaDeFin + '</option>');
    });
   
    $("slctNumClase").innerHTML = opciones;
    //tengo que agregar mensaje de error
}

function clickEnviarInscripcion(){
    enviarParametrosPOSTInscribir(miBackEnd + 'Socio/Inscripcion', respuestaDeServidorInscripcion);
}
function respuestaDeServidorInscripcion(respuesta){
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

function enviarParametrosPOSTModificar(servidor, funcionARealizar){

    //declaro el objeto
    var xmlhttp = new XMLHttpRequest(); 

    //agrega datos para pasar por POST
    var datos = new FormData();
    datos.append("nombre",$("nombreSocioModificar").value);
    datos.append("apellido",$("apellidoSocioModificar").value);
    datos.append("direccion",$("direccionSocioModificar").value);
    datos.append("telefono",$("telefonoSocioModificar").value);
   

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
function enviarParametrosPOSTInscribir(servidor, funcionARealizar){

    //declaro el objeto
    var xmlhttp = new XMLHttpRequest(); 

    //agrega datos para pasar por POST
    var datos = new FormData();
    datos.append("nroSocio",$("slctSocio").value);
    datos.append("idClase",$("slctNumClase").value);
   

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
function enviarParametrosPOSTBorrar(servidor, funcionARealizar){

    //declaro el objeto
    var xmlhttp = new XMLHttpRequest(); 

    //agrega datos para pasar por POST
    var datos = new FormData();
    datos.append("nroSocio",$("slctSocio").value);
    
   

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
function enviarParametrosPOSTPago(servidor, funcionARealizar){

    //declaro el objeto
    var xmlhttp = new XMLHttpRequest(); 

    //agrega datos para pasar por POST
    var datos = new FormData();
    datos.append("importe",$("precioTotal").value);
    
   

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