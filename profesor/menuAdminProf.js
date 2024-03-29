//agrega funcion load a HTML; 
addEventListener("load",load)
var usuario= sessionStorage.getItem('nombre');
//variable del servidor
var miBackEnd = 'http://localhost:555/';

//DOM
function $(nombre)
{
    return document.getElementById(nombre);
}
var idUsuario; 
var flag; 

function load(){
    cargarBienvenido(usuario);
    menuConsultarProf();
    
    oculta('datosParaUnProf'); 
    oculta('formularioModificarProf'); 
    oculta('ordenadoPorEspecialidad'); 
    oculta('cartel');
    oculta('botonAtras');
    oculta('ClasesACargo');
    

    //boton para cerrar sesion 
    document.getElementById("logOut").addEventListener("click",cerrarSesion);
    //boton para perfil usuario logueado
    document.getElementById("perfil").addEventListener("click",mostrarPerfil);
    
    //cuando elige la opcion de consultar socio en el menu
    //document.getElementById("btnConsultarProf").addEventListener("click",clickConsultarProf);
    //cuando elige la opcion de registrar socio en el menu
    //document.getElementById("btnRegistrarProf").addEventListener("click",clickRegistrarProf);
   
    //cuando escribe un nombre y hace click en buscar
   // document.getElementById("btnBuscarProf").addEventListener("click",clickBuscarProf);
    
    //cuando elige el prof y hace click en boton consultar prof
   // document.getElementById("btnConsultarProf2").addEventListener("click",clickConsultarProf2);

    document.getElementById("btnModificarProf").addEventListener("click",clickModificarProf);
    
    document.getElementById("btnBorrarProf").addEventListener("click",clickBorrarProf);
    
    document.getElementById("btnHabilitarProf").addEventListener("click",clickHabilitarProf);
   
    document.getElementById("botonAtras").addEventListener("click",atras);
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
   

    
    muestra('busquedaProfes');
    oculta('datosParaUnProf'); 
    oculta('formularioModificarProf'); 
    oculta('ordenadoPorEspecialidad'); 
    oculta('cartel');
    oculta('botonAtras');
    oculta('ClasesACargo');
}

function clickRegistrarProf(){
    window.location.assign("http://localhost/practica/profesor/registrarProfe.html");//aca va el enlace de la pagina registrar; 
}

function menuConsultarProf(){//oculta la botonera y visualiza el campo para escribir el email 
   
    muestra('busquedaProfes');
    oculta('formularioModificarProf');
    oculta('datosParaUnProf'); 
    oculta('formularioModificarProf'); 
    oculta('ordenadoPorEspecialidad'); 
    oculta('cartel');
    oculta('botonAtras');
    oculta('ClasesACargo');
    clickBuscarProf();
   
    cargarSkeletonTablaProfes();
   
  
    
}

function cargarSkeletonTablaProfes(){
    var opciones = [];

    for(let i=0; i < 5; i++){
        opciones.push(
            '<tr>' +
                '<td><p id="skeletonTablaProfes">' + "-" + '</p></td>' +
                '<td><p id="skeletonTablaProfes">' + "-" + '</p></td>' +
                '<td><p id="skeletonTablaProfes">' + "-" + '</p></td>' +
                

            '</tr>'
        );
    }

    $('infoProfes').innerHTML = opciones.join('');
    
}

function clickBuscarProf(){
   
    enviarParametrosGET(miBackEnd + 'Profesor',cargarProfes); 
}

function cargarProfes(respuesta){
   
    profeDB = JSON.parse(respuesta);

    cargarTablaProfes(profeDB);

   console.log(profeDB);
    
}
function cargarTablaProfes(profes){
    
    tablaProfes = [];
    pagina = [];

    profes.forEach(profe => {
        tablaProfes.push(
            '<tr >' +
            '<th scope="row">' + profe.legajo+ '</th>' +
            '<td>' + profe.nombre + ' ' + profe.apellido + '</td>' +
            '<td><button class="btn bg-primary btn-outline-dark bg-opacity-25 modificacion"  onclick="clickConsultarProf(' + profe.legajo + ')">Ver más</button></td>' +

            '</tr>'
        );
    });

    for(let i=0; i < 5; i++){
        
        pagina.push(tablaProfes[i]);
    }    

    $('infoProfes').innerHTML = pagina.join('');
    
    paginas = Math.ceil(tablaProfes.length / 5);

    var listaPaginas = [];

    listaPaginas.push(
        '<li class="page-item">' +
            '<button class="page-link" aria-label="Previous" onclick="restarPagina()">' +
                '<span aria-hidden="true">&laquo;</span>' +
            '</button>' +
        '</li>'
    )
    
    for(let i=1; i <= paginas; i++){
        listaPaginas.push(
            '<li class="page-item"><button class="page-link" onclick="cambiarPagina('+ i +')">' + i +'</button></li>'
        );
    }

    listaPaginas.push(
        '<li class="page-item">' +
            '<button class="page-link" aria-label="Next" onclick="sumarPagina()">' +
                '<span aria-hidden="true">&raquo;</span>' +
            '</button>' +
        '</li>'
    )

    $('pages').innerHTML = listaPaginas.join('');
}

function restarPagina(){
    
    if( paginaActual - 1 > 0 ){

        cambiarPagina(paginaActual - 1);
    }
}

function sumarPagina(){
    
    if( paginaActual + 1 <= paginas ){

        cambiarPagina(paginaActual + 1);
    }
}

function cambiarPagina(pag){

    var inicio = (5*pag) - 5;
    var fin = (5*pag);

    pagina = [];

    for(inicio; inicio < fin; inicio++){
        
        pagina.push(tablaProfes[inicio]);
    }

    paginaActual = pag;

    $('infoProfes').innerHTML = pagina.join('');
}

function buscarPorNombre(){

    var nombreBuscar = $("nombreBuscado").value;

    var profesFiltrados = [];

    profesFiltrados = profeDB.filter(profe => {
        var nombreMin = profe.nombre.toLowerCase();
        var apellidoMin = profe.apellido.toLowerCase();
        nombreMin = nombreMin.concat(" ");
        nombreApellido = nombreMin.concat(apellidoMin);
        return nombreApellido.includes(nombreBuscar.toLowerCase())
    });    

    cargarTablaProfes(profesFiltrados);
}


function clickConsultarProf(legajo){

    oculta('busquedaProfes');
   
    muestra('cartel');
    var opciones=[];
    opciones.push('<div class="d-flex justify-content-center mt-5">'+
    '<div class="spinner-grow" role="status">'+
        '<span class="visually-hidden">Loading...</span>'+
    '</div>'+'</div><div class="d-flex justify-content-center mt-2">'+
    ' <div><p class="fw-bold">Cargando...</p></div>'+
    '</div>');
    $('respuesta').innerHTML = opciones.join('');   
    //pide datos para completar datos del profesor
    enviarParametrosGET(miBackEnd + 'Profesor/'+legajo, retornoDelClickConsultarProf);
    //pide datos para completar el cuadro del costado de los datos del profesor FALTA
    enviarParametrosGET(miBackEnd + 'Profesor/Clase/'+legajo, retornoDelClickConsultarClasesXProf);
}
 
function retornoDelClickConsultarProf(respuesta){
   
    
    muestra('datosParaUnProf'); 
    oculta('formularioModificarProf'); 
    oculta('ordenadoPorEspecialidad'); 
    oculta('cartel');
    muestra('botonAtras');
    muestra('ClasesACargo');

    var profe = JSON.parse(respuesta);
    console.log(profe);
    $("legajoProf").innerHTML = profe.legajo;
    $("nombreProf").innerHTML = profe.nombre;
    $("apellidoProf").innerHTML = profe.apellido;
    $("direccionProf").innerHTML = profe.direccion;
    $("telefonoProf").innerHTML = profe.telefono;
    $("emailProf").innerHTML = profe.email;
    $("especialidadProf").innerHTML = profe.especialidad;
    $("estadoProf").innerHTML = profe.estado;
    idUsuario=profe.usuario; 
   
    console.log(idUsuario);

    if(profe.estado=='HAB'){$(
        "estadoProf").innerHTML = 'Habilitado';
    oculta('btnHabilitarProf');
    muestra('btnBorrarProf');
    console.log('profe Habilitado');  }
    if(profe.estado=="DESHAB"){$(
        "estadoProf").innerHTML = 'Deshabilitado';
    oculta('btnBorrarProf');
    muestra('btnHabilitarProf');
    console.log('profe deshabilitado');  }

    $("altaProf").innerHTML = formato(profe.fechaDeAlta);

    

    //$("respuesta").innerHTML=respuesta;
    if(profe['legajo'] == 0){
        swal("Precaucion!", "Seleccione un profesor", "info");
        //$("respuesta").innerHTML="Seleccione un profesor";
    }
     
}
function retornoDelClickConsultarClasesXProf(valor){
    var analiza =JSON.parse(valor); 
    console.log(analiza); 

    var opciones=[]; 


    analiza.forEach(element => {
        opciones.push('<tr >'+
        '<th scope="row">'+element.idClase+'</th>'+
        '<td>'+element.nombre+'</td>'+
        '<td>'+element.dias+'</td>'+
        '<td>'+element.horaDeInicio+'</td>'+
        '<td>'+element.horaDeFin+'</td>'+
        '<td>'+element.salon+'</td>'+
        '<td>'+element.cupos+'</td>'+
        '</tr>' );
        
    });

  

    $('tableClasesACargo').innerHTML=opciones;
}
function clickModificarProf(){

    //enviarMensajeAlServidor("/Provincias/Backend/?provincia="+ valorProvincia,cargarOpcionesLocalidad);
    var legajo= document.getElementById("legajoProf").innerText; 
    swal({
        title: "Modificar",
        text: "¿Esta seguro que desea modificar a este profesor?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            enviarParametrosGET(miBackEnd + 'Profesor/'+legajo, retornoDelClickModificarProf);
        }
      });
    
    
   
}
function retornoDelClickModificarProf(respuesta){
    flag=0; 
    console.log(flag);
     
    oculta('datosParaUnProf'); 
    muestra('formularioModificarProf'); 
    
    
    oculta('ordenadoPorEspecialidad'); 
    oculta('cartel');
    oculta('botonAtras');
    oculta('ClasesACargo');
   
    
     
    var profMod = JSON.parse(respuesta);
    
   $("nombreProfModificar").value = profMod["nombre"];
   $("apellidoProfModificar").value = profMod["apellido"];
   $("direccionProfModificar").value = profMod["direccion"];
   $("telefonoProfModificar").value = profMod["telefono"];
   $("especialidadProfModificar").value = profMod["especialidad"];
   $("emailProfModificar").value = profMod["email"];

   $('nombreProfModificar').addEventListener("keyup", validarProfModificar);
   $('apellidoProfModificar').addEventListener("keyup", validarProfModificar);
   $('direccionProfModificar').addEventListener("keyup", validarProfModificar);
   $('telefonoProfModificar').addEventListener("keyup",validarProfModificar);
   $('especialidadProfModificar').addEventListener("keyup",validarProfModificar);
   $('emailProfModificar').addEventListener("keyup", validarCorreo);
   $('btnModificarGuardar').addEventListener("click",clickGuardarModSocio);
    
}
function formato(texto){
    return texto.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1');
  }
function validarProfModificar(){
    var ModNombre = $("nombreProfModificar").value.length;
    var ModApellido = $("apellidoProfModificar").value.length;
    var ModDireccion = $("direccionProfModificar").value.length;
    var ModTelefono = $("telefonoProfModificar").value.length;
    var ModEspec = $("especialidadProfModificar").value.length;

    if( ModNombre >=2 && ModApellido >=2  && ModDireccion >=2 && ModTelefono >=10 && ModEspec>3){
        $('btnModificarGuardar').disabled = false;
    }else{
        $('btnModificarGuardar').disabled = true;
    }

}
function validarCorreo(){

    var email = document.getElementById('emailProfModificar').value;
    console.log(email);

    
    var pattEmail = new RegExp(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/);

    
    var resultadoEmail = pattEmail.test(email);

    if( resultadoEmail ){
        $('btnModificarGuardar').disabled = false;
    }else{
        $('btnModificarGuardar').disabled = true;
    }
}

function clickGuardarModSocio(){
    var legajo= document.getElementById("legajoProf").innerText; 
    var email = document.getElementById('emailProfModificar').value;
    console.log(email);
    $('btnModificarGuardar').disabled = true;
    enviarParametrosPOSTActualizar(miBackEnd + 'Profesor/Actualizacion/'+legajo, respuestaDeServidorMod);
    enviarParametrosPOST(miBackEnd + 'Usuario/EditarCorreo/'+ idUsuario,  respuestaDeServidorModEmail,email);
}


function respuestaDeServidorMod(respuesta) {
    console.log(flag);
   swal("Genial!", '"'+respuesta+'"', "success");
    menuConsultarProf();
    
}
function respuestaDeServidorModEmail() {
    
    console.log('correo cambiado');
    flag=flag+1; 
    console.log(flag);
}



function clickHabilitarProf(legajo){
    var legajo= document.getElementById("legajoProf").innerText;

    swal({
        title: "Modificar",
        text: "¿Esta seguro que desea habilitar a este profesor?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            enviarParametrosPOSTBorrar(miBackEnd + 'Profesor/Habilitacion/'+legajo, retornoDelServHabBorrar);  
        } 
      });


    //if(confirm('¿Esta seguro que desea habilitar a este profesor?')){
        //pasar los parametros para borrar 
        //enviarParametrosPOSTBorrar(miBackEnd + 'Profesor/Habilitacion/'+legajo, retornoDelServHabBorrar);  
    //}
}


function clickBorrarProf(legajo){
    var legajo= document.getElementById("legajoProf").innerText;

    swal({
        title: "Borrar",
        text: "¿Esta seguro que desea borrar a este profesor?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            enviarParametrosPOSTBorrar(miBackEnd + 'Profesor/Borrar/'+legajo,retornoDelServHabBorrar);
        } 
      });

    //if(confirm('¿Esta seguro que desea borrar a este profesor?')){
        //pasar los parametros para borrar 
        //enviarParametrosPOSTBorrar(miBackEnd + 'Profesor/Borrar/'+legajo,retornoDelServHabBorrar)
   // }
}
function retornoDelServHabBorrar(respuesta){
   

    swal("Genial!", '"'+respuesta+'"', "success");
    //confirmacion de borrado
   
    oculta('menuConsultarProf'); 
    oculta('datosParaUnProf'); 
    oculta('formularioModificarProf'); 
    oculta('ordenadoPorEspecialidad'); 
  
    oculta('botonAtras');
}
     
function clickOrdenadoPorEsp(){
    
    oculta('menuConsultarProf'); 
    oculta('datosParaUnProf'); 
    oculta('formularioModificarProf'); 
    muestra('ordenadoPorEspecialidad'); 
    oculta('cartel');
    oculta('botonAtras');
    //para el boton del principio 
    //Profesor/Esp por post
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
function enviarParametrosPOST(servidor, funcionARealizar,email) {

    //declaro el objeto
    var xmlhttp = new XMLHttpRequest();

    //agrega datos para pasar por POST
    var datos = new FormData();
    datos.append("email", email);


    //indico hacia donde va el mensaje
    xmlhttp.open("POST", servidor, true);

    //seteo el evento
    xmlhttp.onreadystatechange = function () {
        //veo si llego la respuesta del servidor
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            //reviso si la respuesta del servidor es la correcta
            if (xmlhttp.status == 200) {
                funcionARealizar(xmlhttp.response);
            } else {
                swal("Error", "revise los datos cargados", "error");
            };
        }
    }
    //esto va siempre cuando se hace un formulario
    xmlhttp.setRequestHeader("enctype", "multipart/form-data");

    //envio el mensaje 
    xmlhttp.send(datos);


}

function enviarParametrosPOSTBorrar(servidor, funcionARealizar){

    //declaro el objeto
    var xmlhttp = new XMLHttpRequest(); 

    //agrega datos para pasar por POST
    var datos = new FormData();
    datos.append("legajo",$("legajoProf").innerText);
    
   

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

function enviarParametrosPOSTEsp(servidor, funcionARealizar){

    //declaro el objeto
    var xmlhttp = new XMLHttpRequest(); 

    //agrega datos para pasar por POST
    var datos = new FormData();
    datos.append('especialidad',$("txtEmail").value);
   

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

function enviarParametrosPOSTActualizar(servidor, funcionARealizar){

    //declaro el objeto
    var xmlhttp = new XMLHttpRequest(); 
   

    //agrega datos para pasar por POST
    var datos = new FormData();
    datos.append('nombre',$('nombreProfModificar').value);
    datos.append('apellido',$('apellidoProfModificar').value);
    datos.append('direccion',$('direccionProfModificar').value);
    datos.append('telefono',$('telefonoProfModificar').value);
    datos.append('especialidad',$('especialidadProfModificar').value);

   

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