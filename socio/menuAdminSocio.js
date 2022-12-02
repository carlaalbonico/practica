//agrega funcion load a HTML; 
addEventListener("load", load)
var usuario= sessionStorage.getItem('nombre');
//variable del servidor
var miBackEnd = 'http://localhost:555/';
var sociosDB;
var tablaSocios = [];
var paginas;
var pagina = [];
var paginaActual = 1;
var precio; 
var idSocio; 
var validacionFecha=0; 
var idSuscripcion;
var idCompraSusc;
var fecha;

//DOM
function $(nombre) {
    return document.getElementById(nombre);
}


function load() {
    oculta('cartelModalAceptar');
    oculta('cartelModalRechazar');
    
    sessionStorage.removeItem('idSocio');
    cargarBienvenido(usuario);
    //para ocultar los menus
    menuConsultarSocio();
    TraerFechaHoy(); 
    console.log(fecha);

   
    oculta('botonesAdminParaUnSocio');
    oculta('formularioModificarSocio');
    oculta('formularioChico');
    oculta('historialInscripcion');
    oculta('agregarSuscSocio');
    oculta('botonAtras');
   oculta('historialSuscripcion');
   oculta('historialSuscripcion');

    //para ocultar cartel del mensaje
    oculta_muestra('cartel');

    //boton para cerrar sesion 
    document.getElementById("logOut").addEventListener("click", cerrarSesion);
    //boton para perfil usuario logueado
    document.getElementById("perfil").addEventListener("click", mostrarPerfil);
    document.getElementById("botonAtras").addEventListener("click", atras);
    
    document.getElementById("btnModificar").addEventListener("click", clickModificarSocio);
    document.getElementById("btnBorrar").addEventListener("click", clickBorrarSocio);
    document.getElementById("btnHabilitar").addEventListener("click", clickHabilitarSocio);

   
}
function cargarBienvenido(usuario){
    $('bienvenido').innerHTML='Bienvenido, '+usuario
}
function TraerFechaHoy(){
    const hoy = new Date();
    let diaDeSemana = hoy.getDay();
    let dia = hoy.getDate();
    let mes = hoy.getMonth()+1;
    let año = hoy.getFullYear();
    var fechaCompleta; 
    fechaCompleta= año+'-'+mes+'-'+dia; 
    fecha= hoy;
    
}

function cerrarSesion() {
    sessionStorage.clear();
    window.location.assign("http://localhost/practica/login.html");
}
function mostrarPerfil() {
    window.location.assign("http://localhost/practica/perfilUsuario.html");
}

function oculta_muestra(id) {
    if (document.getElementById) { //se obtiene el id
        var el = document.getElementById(id);
        el.style.display = (el.style.display == 'none') ? 'block' : 'none';

    }

}

function muestra(id) {
    if (document.getElementById) { //se obtiene el id
        var el = document.getElementById(id); //se define la variable "el" igual a nuestro div

        el.style.display = "block";

    }

}
function oculta(id) {
    if (document.getElementById) { //se obtiene el id
        var el = document.getElementById(id);
        el.style.display = 'none';

    }

}
function atras() {
    oculta('cartel');    
    muestra('botonesAdminParaUnSocio');
    oculta('formularioModificarSocio');
    oculta('formularioChico');
    oculta('agregarSuscSocio');
    oculta('historialInscripcion');
    oculta('historialSuscripcion');
    oculta('botonAtras');

}

function menuRegistrarSocio() {
    window.location.assign("http://localhost/practica/socio/registrarSocio.html");//aca va el enlace de la pagina registrar; 
}

function menuConsultarSocio() {//oculta la botonera y visualiza el campo para escribir el email 
     
    muestra('busquedaSocios');
    clickBuscar();
    cargarSkeletonTablaSocios();
    
}

function cargarSkeletonTablaSocios(){
    var opciones = [];

    for(let i=0; i < 5; i++){
        opciones.push(
            '<tr>' +
                '<td><p id="skeletonTablaSocios">' + "-" + '</p></td>' +
                '<td><p id="skeletonTablaSocios">' + "-" + '</p></td>' +
                '<td><p id="skeletonTablaSocios">' + "-" + '</p></td>' +
                
                '<td><p id="skeletonTablaSocios">' + "-" + '</p></td>' +
            '</tr>'
        );
    }

    $('infoSocios').innerHTML = opciones.join('');
    
}

function clickBuscar() {    
    enviarParametrosGET(miBackEnd + 'Socio', cargarSocios);
    
    
}

function cargarSocios(respuesta) {

    sociosDB = JSON.parse(respuesta);

    cargarTablaSocios(sociosDB);
    
    
}

function cargarTablaSocios(socios){
    
    tablaSocios = [];
    pagina = [];

    socios.forEach(socio => {
        tablaSocios.push(
            '<tr >' +
            '<th scope="row">' + socio.nroSocio + '</th>' +
            '<td>' + socio.nombre + ' ' + socio.apellido + '</td>' +
            '<td>' + socio.email + '</td>' +

            '<td><button class="btn btn-outline-dark bg-primary  bg-opacity-75 modificacion"  onclick="clickConsultarSocio(' + socio.nroSocio + ')">Ver más</button></td>' +

            '</tr>'
        );
    });

    for(let i=0; i < 5; i++){
        
        pagina.push(tablaSocios[i]);
    }    

    $('infoSocios').innerHTML = pagina.join('');
    
    paginas = Math.ceil(tablaSocios.length / 5);

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
        
        pagina.push(tablaSocios[inicio]);
    }

    paginaActual = pag;

    $('infoSocios').innerHTML = pagina.join('');
}

function buscarPorNombre(){

    var nombreBuscar = $("nombreBuscado").value;

    var sociosFiltrados = [];

    sociosFiltrados = sociosDB.filter(socio => {
        var nombreMin = socio.nombre.toLowerCase();
        var apellidoMin = socio.apellido.toLowerCase();
        nombreMin = nombreMin.concat(" ");
        nombreApellido = nombreMin.concat(apellidoMin);
        return nombreApellido.includes(nombreBuscar.toLowerCase())
    });    

    cargarTablaSocios(sociosFiltrados);
}

function clickConsultarSocio(nroSocio) {
    
    idSocio=nroSocio; 
   
    enviarParametrosGET(miBackEnd + 'Socio/' + nroSocio, retornoClickConsultarSocio);
    enviarParametrosGET(miBackEnd + 'Socio/Suscripciones/' + nroSocio, retornarSuscripcionesActivas);
    oculta('busquedaSocios');
    muestra('cartel');
   
    var opciones=[];
    opciones.push('<div class="d-flex justify-content-center mt-5">'+
    '<div class="spinner-grow" role="status">'+
        '<span class="visually-hidden">Loading...</span>'+
    '</div>'+'</div><div class="d-flex justify-content-center mt-2">'+
    ' <div><p class="fw-bold">Cargando...</p></div>'+
'</div>');
$('respuesta').innerHTML = opciones.join(''); 
}

function retornoClickConsultarSocio(respuesta) {
    oculta('cartel');    
    muestra('botonesAdminParaUnSocio');
    oculta('formularioModificarSocio');
    oculta('formularioChico');
    oculta('historialInscripcion');
    oculta('historialSuscripcion');
    oculta('botonAtras');

    var socio = JSON.parse(respuesta);

    $("nroSocio").innerHTML = socio.nroSocio;
    $("nombreSocio").innerHTML = socio.nombre;
    $("apellidoSocio").innerHTML = socio.apellido;
    $("direccionSocio").innerHTML = socio.direccion;
    $("telefonoSocio").innerHTML = socio.telefono;
    $("emailSocio").innerHTML = socio.email;
    console.log(socio);
    if (socio.estado == 'HAB') {
        $(
            "estadoSocio").innerHTML = 'Habilitado';
        oculta('btnHabilitar');
        muestra('btnBorrar');
        console.log('socio Habilitado');
    }
    if (socio.estado == "DESHAB") {
        $(
            "estadoSocio").innerHTML = 'Deshabilitado';
        oculta('btnBorrar');
        muestra('btnHabilitar');
        console.log('socio deshabilitado');
    }

    var texto = socio.fechaDeAlta;
    var salida = formato(texto);
   


    $("altaSocio").innerHTML = salida;



    //$("respuesta").innerHTML=respuesta;
    if (socio['nroSocio'] == null) {
        swal("Precaucion!", "Seleccione un socio", "info");
        //$("respuesta").innerHTML = "Seleccione un socio";
    }

}
function formato(texto){
    return texto.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1');
  }
function retornarSuscripcionesActivas(rta){
 console.log(rta);
 respuesta=[];
 suscripcionActiva= JSON.parse(rta);
 console.log(suscripcionActiva);
 if(suscripcionActiva.length==0){
    respuesta.push('  <h5 class="fw-bold">No posee una suscripcion activa</h5>');
 }else{
    suscripcionActiva.forEach(element=>{
        respuesta.push('<div class="card border-danger mb-3" style="max-width: 18rem;">'+
        '<div class="card-header bg-danger bg-opacity-10">'+element.nombreActividad+'</div>'+
        '<div class="card-body text-danger">'+
          '<h5 class="card-title">'+element.nombreSuscripcion+'</h5>'+
          '<p class="card-text"> <b>Cant de clases: </b> '+element.cantClases+' <br><b>Fecha de Vencimiento:</b>'+formato(element.fechaVencimiento)+'</p>'+
        '</div>'+
        '</div>'
        )
    })
    
 }
 
 $('suscripcionActiva').innerHTML = respuesta.join('');
}


function clickModificarSocio() {

    var idSocioMod = document.getElementById("nroSocio").innerText;
    swal({
        title: "Modificar",
        text: "¿Esta seguro que desea modificar a este socio?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            

            enviarParametrosGET(miBackEnd + 'Socio/' + idSocioMod, retornoClickModificarSocio);
        } 
      });



   
}

function retornoClickModificarSocio(respuesta) {
    oculta('cartel');
    oculta('botonesAdminParaUnSocio');
    oculta('historialInscripcion');

    muestra('formularioModificarSocio');
    oculta('formularioChico');
    muestra('botonAtras');
    oculta('historialSuscripcion');
    var socioMod = JSON.parse(respuesta);

    $("nombreSocioModificar").value = socioMod["nombre"];
    $("apellidoSocioModificar").value = socioMod["apellido"];
    $("direccionSocioModificar").value = socioMod["direccion"];
    $("telefonoSocioModificar").value = socioMod["telefono"];

    $('nombreSocioModificar').addEventListener("keyup", validarSocioModificar);
    $('apellidoSocioModificar').addEventListener("keyup", validarSocioModificar);
    $('direccionSocioModificar').addEventListener("keyup", validarSocioModificar);
    $('telefonoSocioModificar').addEventListener("keyup", validarSocioModificar);
    $('btnModificarGuardar').addEventListener("click", clickGuardarModSocio);

}
function validarSocioModificar() {
    var ModNombre = $("nombreSocioModificar").value.length;
    var ModApellido = $("apellidoSocioModificar").value.length;
    var ModDireccion = $("direccionSocioModificar").value.length;
    var ModTelefono = $("telefonoSocioModificar").value.length;

    if (ModNombre >= 2 && ModApellido >= 2 && ModDireccion >= 2 && ModTelefono >= 8) {
        $('btnModificarGuardar').disabled = false;//habilitar
    } else {
        $('btnModificarGuardar').disabled = true;
    }

}
function clickGuardarModSocio() {
    var nroSocio = document.getElementById("nroSocio").innerText;
    $("btnModificarGuardar").disabled = true;

    enviarParametrosPOSTModificar(miBackEnd + 'Socio/Actualizacion/' + nroSocio, respuestaDeServidorMod);
}
function respuestaDeServidorMod(respuesta) {
    muestra('cartelModalAceptar');
    $("titulo").innerHTML='Genial';
    $("respuesta").innerHTML=rta;
    menuConsultarSocio();
}

function clickBorrarSocio() {
    var nroSocio = document.getElementById("nroSocio").innerText;


    swal({
        title: "Borrar",
        text: "¿Esta seguro que desea borrar a este socio?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            enviarParametrosPOSTBorrar(miBackEnd + 'Socio/Borrar/' + nroSocio, respuestaDeServidorBorrar)
        } 
      });

    //if (confirm('¿Esta seguro que desea borrar a este socio?')) {
        //pasar los parametros para borrar 

    //    enviarParametrosPOSTBorrar(miBackEnd + 'Socio/Borrar/' + nroSocio, respuestaDeServidorBorrar)
    //}
}

function clickHabilitarSocio() {
    var nroSocio = document.getElementById("nroSocio").innerText;

    swal({
        title: "Modificar",
        text: "¿Esta seguro que desea habilitar a este socio?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            enviarParametrosPOSTBorrar(miBackEnd + 'Socio/Habilitacion/' + nroSocio, respuestaDeServidorBorrar)
        } 
      });

    //if (confirm('¿Esta seguro que desea habilitar a este socio?')) {
        //pasar los parametros para borrar 

       // enviarParametrosPOSTBorrar(miBackEnd + 'Socio/Habilitacion/' + nroSocio, respuestaDeServidorBorrar)
    //}
}
function respuestaDeServidorBorrar(respuesta) {
    //muestra('cartel');
    // $("respuesta").innerHTML=respuesta;
    swal("Genial!", '"'+respuesta+'"', "success");
    menuConsultarSocio();

}

function cargarFormularioChico(respuesta) {
    var socioFC = JSON.parse(respuesta);
    $("nroSocioForm").innerHTML = '#'+socioFC.nroSocio +' - '+socioFC.nombre+' '+socioFC.apellido;
   
}
function clickRegistrarSuscripcion() {
    oculta('cartel');
    oculta('botonesAdminParaUnSocio');
    oculta('formularioModificarSocio');
    muestra('formularioChico');
    muestra('agregarSuscSocio');
    oculta('historialInscripcion');
    oculta('historialSuscripcion');
    muestra('botonAtras');
    //manda los datos para cargar el formularioChico
    var idSocio = document.getElementById("nroSocio").innerText;

    enviarParametrosGET(miBackEnd + 'Socio/' + idSocio, cargarFormularioChico);
    enviarParametrosGET(miBackEnd + 'Actividad',cargarOpcionesClase); 
    enviarParametrosGET(miBackEnd + 'Suscripcion/',cargarSuscripciones)
    
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
    $("slctTipoClase").innerHTML = opciones.join('');  
    
}

function selectActividad(){
    enviarParametrosGET(miBackEnd + 'Suscripcion/',cargarSuscripciones)
    var opciones=[];
    opciones.push('<div class="d-flex justify-content-center mt-2">'+
    '<div class="spinner-grow" role="status">'+
        '<span class="visually-hidden">Loading...</span>'+
    '</div>'+
'</div>');
$('suscripciones').innerHTML = opciones.join(''); 
}

function cargarSuscripciones(rta){
    console.log(rta);
    var tipoClase= document.getElementById("slctTipoClase").value; 
    suscripciones=  JSON.parse(rta); 
 console.log(tipoClase)
    if (tipoClase!=0){
            

        suscripciones.sort(function (x, y) { return x.actividad.localeCompare(y.actividad) });
        var suscripcionesFiltradas= suscripciones.filter( item =>{
            var nombreMin= item.actividad.toLowerCase();
            return nombreMin.includes(tipoClase.toLowerCase()); 
            
        }); 
    
        var opciones=[];
        suscripcionesFiltradas.forEach(suscripcion =>{
            opciones.push(' <div class="col-4">'+
            '<div class="card border-dark mb-1" style="max-width: 25rem;">'+
                    '<div class="card-header">'+suscripcion.actividad+'</div>'+
                    '<div class="card-body text-dark">'+
                        '<h5 class="card-title">'+suscripcion.nombre+'</h5>'+
                        '<p class="card-text"><b> Descripcion: </b> '+suscripcion.descSuscripcion+' <br> <b>Cant de clases: </b> '+suscripcion.cantClases+' <br> <b>Precio: </b> '+suscripcion.precio+'</p>'+
                        '<div class=" d-flex  justify-content-end"><button class="btn bg-primary bg-opacity-50 "  onclick="clickSuscripcion(' + suscripcion.idSuscripcion + ')">adquirir</button></div>'+
                    '</div>'+            
            '</div>'+
            '</div>')
    
    })
    $('suscripciones').innerHTML = opciones.join('');
        
    } else {
        var opciones=[];
        suscripciones.forEach(suscripcion =>{
            opciones.push(' <div class="col-4">'+
            '<div class="card border-primary mb-1" style="max-width: 25rem;">'+
                    '<div class="card-header bg-primary bg-opacity-25">'+suscripcion.actividad+'</div>'+
                    '<div class="card-body text-dark">'+
                        '<h5 class="card-title">'+suscripcion.nombre+'</h5>'+
                        '<p class="card-text"><b> Descripcion: </b> '+suscripcion.descSuscripcion+' <br> <b>Cant de clases: </b> '+suscripcion.cantClases+' <br> <b>Precio: $ </b> '+suscripcion.precio+'</p>'+
                        '<div class=" d-flex  justify-content-end"><button class="btn bg-primary bg-opacity-50 "  data-bs-toggle="modal" data-bs-target="#exampleModalToggle" onclick="clickAdquirirSuscripcion(' + suscripcion.idSuscripcion +','+suscripcion.precio+ ')">adquirir</button></div>'+
                    '</div>'+            
            '</div>'+
            '</div>')
        
        })

        $('suscripciones').innerHTML = opciones.join('');
    }
    
    
}

function clickAdquirirSuscripcion(idSusc,valorPrecio){
    precio=valorPrecio; 
    idSuscripcion=idSusc; 
   /* swal({
        title: "Adquirir suscripcion",
        text: "¿Esta seguro que desea adquirir la suscripcion para este socio?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            
            
            
        } 
      });*/

 console.log(idSuscripcion);
 
}

function confirmSuscripcion(){
    console.log(idSuscripcion);
    console.log(precio);


    enviarParametrosPOSTAdquirirSuscripcion(miBackEnd + 'Compra/Suscripcion', rtaAdquiriSuscripcion, idSuscripcion); 
}
function rtaAdquiriSuscripcion(rta){
    console.log(rta);
    console.log(precio);
    idCompraSusc=rta;
     $("idCompra").innerHTML=idCompraSusc;
     $("precio").innerHTML=precio;
      
}

function registrarPago(){
    enviarParametrosPOSTPago(miBackEnd + 'Pago', rtaPago, precio,idCompraSusc); 
}

function rtaPago(rta){

    muestra('cartelModalAceptar');
    $("titulo").innerHTML='Genial';
    $("respuesta").innerHTML=rta;
    //swal("Genial!", '"'+rta+'"', "success");
}

function clickInscribirSocioClase() {
    sessionStorage.setItem('idSocio', idSocio);
    window.location.assign("http://localhost/practica/socio/inscribirSocioClase.html");

}

function clickHistorialInscripcion(){
    const hoy = new Date();
    var fechaAnterior; 
    oculta('cartel');
    oculta('botonesAdminParaUnSocio');
    oculta('formularioModificarSocio');
    muestra('formularioChico');
    oculta('agregarSuscSocio');

    muestra('botonAtras');
     muestra('historialInscripcion');
     oculta('historialSuscripcion');
     enviarParametrosGET(miBackEnd + 'Socio/' + idSocio, cargarFormularioChico);

  
     console.log(fecha);
    fechaAnterior=sumarDias(hoy,-30);
    console.log(fecha);
    console.log(fechaAnterior);
    console.log(formatoDia(fecha));
    console.log(formatoDia(fechaAnterior));
   
    var fechaFin=  formatoDia(fecha);
    var fechaInicio= formatoDia(fechaAnterior);
    console.log(fechaInicio);
    console.log(fechaFin);
   
    enviarParametrosPostHistorial(miBackEnd + 'Socio/HistorialInscripciones/' + idSocio, cargarHistorialInscrip, fechaInicio,fechaFin);
    cargarSkeletonHistorial(); 
}

function cargarSkeletonHistorial(){
    var opciones = [];

    for(let i=0; i < 5; i++){
        opciones.push(
            '<tr>' +
                '<td><p id="skeletonTablaSocios">' + "-" + '</p></td>' +
                '<td><p id="skeletonTablaSocios">' + "-" + '</p></td>' +
                '<td><p id="skeletonTablaSocios">' + "-" + '</p></td>' +
                '<td><p id="skeletonTablaSocios">' + "-" + '</p></td>' +
                '<td><p id="skeletonTablaSocios">' + "-" + '</p></td>' +
              
            '</tr>'
        );
    }

    $('infoHistorialInscrip').innerHTML = opciones.join('');
    
}

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  
function formatoDia(element){
    let dia = element.getDate();
    let mes = element.getMonth()+1;
    let año = element.getFullYear();
    var fechaCompleta; 
    var fechaElemento;
    fechaElemento= [
        año,
        padTo2Digits(mes),
        padTo2Digits(dia),
      ].join('-');
	return fechaCompleta=fechaElemento; 
    
  }


function sumarDias(dia, dias){
    dia.setDate(dia.getDate() + dias);
    return dia;
  }



function validarFecha(){
    
        var fechaInicio = document.getElementById("txtFechaInicio").value;
        var fechaFin= document.getElementById("txtFechaFin").value;
        console.log( fechaInicio);
        console.log(fechaFin);
        enviarParametrosPostHistorial(miBackEnd + 'Socio/HistorialInscripciones/' + idSocio, cargarHistorialInscrip, fechaInicio,fechaFin);
        cargarSkeletonHistorial(); 
    
}


function cargarHistorialInscrip(rta){
console.log(rta);
inscripciones= JSON.parse(rta);
opciones=[];
inscripciones.forEach(
    element =>{
        opciones.push(
            '<tr >'+
                '<th scope="row">'+element.nombreActividad+'</th>'+
                '<td>'+formato(element.fecha)+'</td>'+
                '<td>'+element.dias+'</td>'+
                '<td>'+element.horaDeInicio+'</td>'+
                '<td>'+element.nombreSalon+'</td>'+
            
                '</tr>'

        );
    }
); 
$('infoHistorialInscrip').innerHTML = opciones.join('');


}
function cargarSkeletonHistorialSus(){
    var opciones = [];

    for(let i=0; i < 5; i++){
        opciones.push(
            '<tr>' +
                '<td><p id="skeletonTablaSocios">' + "-" + '</p></td>' +
                '<td><p id="skeletonTablaSocios">' + "-" + '</p></td>' +
                '<td><p id="skeletonTablaSocios">' + "-" + '</p></td>' +
                '<td><p id="skeletonTablaSocios">' + "-" + '</p></td>' +
                '<td><p id="skeletonTablaSocios">' + "-" + '</p></td>' +
                '<td><p id="skeletonTablaSocios">' + "-" + '</p></td>' +
                '<td><p id="skeletonTablaSocios">' + "-" + '</p></td>' +
              
            '</tr>'
        );
    }

    $('infoHistorialSuscrip').innerHTML = opciones.join('');
    
}



function clickHistorialSuscripcion(){
    const hoy = new Date();
    var fechaAnterior; 
    oculta('cartel');
    oculta('botonesAdminParaUnSocio');
    oculta('formularioModificarSocio');
    muestra('formularioChico');
    oculta('agregarSuscSocio');

    muestra('botonAtras');
     oculta('historialInscripcion');
     muestra('historialSuscripcion');
     enviarParametrosGET(miBackEnd + 'Socio/' + idSocio, cargarFormularioChico);

     console.log(fecha);
    fechaAnterior=sumarDias(hoy,-30);
    console.log(fecha);
    console.log(fechaAnterior);
    console.log(formatoDia(fecha));
    console.log(formatoDia(fechaAnterior));
   
    var fechaFin=  formatoDia(fecha);
    var fechaInicio= formatoDia(fechaAnterior);
    console.log(fechaInicio);
    console.log(fechaFin);

     enviarParametrosPostHistorial(miBackEnd + 'Socio/HistorialSuscripciones/' + idSocio, cargarHistorialSuscrip, fechaInicio,fechaFin);
     cargarSkeletonHistorialSus(); 
}



function validarFechaSus(){
    
    var fechaInicio = document.getElementById("txtFechaInicioSus").value;
    var fechaFin= document.getElementById("txtFechaFinSus").value;
    console.log( fechaInicio);
    console.log(fechaFin);
    enviarParametrosPostHistorial(miBackEnd + 'Socio/HistorialSuscripciones/' + idSocio, cargarHistorialInscrip, fechaInicio,fechaFin);
    cargarSkeletonHistorialSus(); 

}

function cargarHistorialSuscrip(rta){
console.log(rta);
suscripciones= JSON.parse(rta);
opciones=[];
suscripciones.forEach(
    element =>{
        opciones.push(
            '<tr >'+
                '<th scope="row">'+element.nombreSuscripcion+'</th>'+
                '<th scope="row">'+element.nombreActividad+'</th>'+
                '<td>'+element.cantClases+'</td>'+
                '<td>'+formato(element.fechaEmision)+'</td>'+
                '<td>'+formato(element.fechaVencimiento)+'</td>'+
                '<td>'+element.nroPago+'</td>'+
                '<td>'+formato(element.fecha)+'</td>'+
            
                '</tr>'

        );
    }
); 
$('infoHistorialSuscrip').innerHTML = opciones.join('');


}


function enviarParametrosGET(servidor, funcionARealizar) {

    //Declaro el objeto
    var xmlhttp = new XMLHttpRequest();

    //Indico hacia donde va el mensaje
    xmlhttp.open("GET", servidor, true);

    xmlhttp.onreadystatechange = function () {

        if (xmlhttp.readyState == XMLHttpRequest.DONE) {

            if (xmlhttp.status == 200) {
                //console.log(xmlhttp.responseText);
                funcionARealizar(xmlhttp.responseText);
            }
            else {
                swal("Error al guardar", "revise los datos cargados", "error");
                
            }
        }
    }
    //Envio el mensaje
    xmlhttp.send();
}

function enviarParametrosPOST(servidor, funcionARealizar) {

    //declaro el objeto
    var xmlhttp = new XMLHttpRequest();

    //agrega datos para pasar por POST
    var datos = new FormData();
    datos.append("email", $("txtEmail").value);


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

function enviarParametrosPOSTModificar(servidor, funcionARealizar) {

    //declaro el objeto
    var xmlhttp = new XMLHttpRequest();

    //agrega datos para pasar por POST
    var datos = new FormData();
    datos.append("nombre", $("nombreSocioModificar").value);
    datos.append("apellido", $("apellidoSocioModificar").value);
    datos.append("direccion", $("direccionSocioModificar").value);
    datos.append("telefono", $("telefonoSocioModificar").value);


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
function enviarParametrosPOSTAdquirirSuscripcion(servidor, funcionARealizar, idSuscripcion) {
 var idSuscripcion; 
    //declaro el objeto
    var xmlhttp = new XMLHttpRequest();

    //agrega datos para pasar por POST
    var datos = new FormData();
    datos.append("nroSocio", $("nroSocio").innerText);
    datos.append("idSuscripcion", idSuscripcion);


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

function enviarParametrosPOSTBorrar(servidor, funcionARealizar) {

    //declaro el objeto
    var xmlhttp = new XMLHttpRequest();

    //agrega datos para pasar por POST
    var datos = new FormData();
    datos.append("nroSocio", $("nroSocio").innerText);



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
function enviarParametrosPOSTPago(servidor, funcionARealizar,importe,idCompra) {
 var importe; 
 var idCompra;
    //declaro el objeto
 var xmlhttp = new XMLHttpRequest();

 //agrega datos para pasar por POST
 var datos = new FormData();
 datos.append("importe", importe);
 datos.append("idCompra", idCompra);
 datos.append("medioPago", $("slctFormaPago").value);
    

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
                swal("Error", "revise el pago.", "error");
            };
        }
    }
    //esto va siempre cuando se hace un formulario
    xmlhttp.setRequestHeader("enctype", "multipart/form-data");

    //envio el mensaje 
    xmlhttp.send(datos);

}

function enviarParametrosPostHistorial(servidor, funcionARealizar, fechaInicio,fechaFin){
  console.log(fechaInicio);
  console.log(fechaFin);
    //declaro el objeto
 var xmlhttp = new XMLHttpRequest();

 //agrega datos para pasar por POST
 var datos = new FormData();
 datos.append("fechaMin", fechaInicio);
 datos.append("fechaMax", fechaFin);

    

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
                swal("Error", "revise el periodo de fechas.", "error");
            };
        }
    }
    //esto va siempre cuando se hace un formulario
    xmlhttp.setRequestHeader("enctype", "multipart/form-data");

    //envio el mensaje 
    xmlhttp.send(datos);
}

