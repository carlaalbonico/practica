//agrega funcion load a HTML; 
addEventListener("load",load)
 
var usuario= sessionStorage.getItem('nombre');
var email= sessionStorage.getItem('usuario');
var nroSocio;
//variable del servidor
var miBackEnd = 'http://localhost:555/';
var extra= 0; 


var todasSemanas = [];
var paginas;
var pagina = [];
var paginaActual = 1;
var salon = "Principal";

var clasesInscriptas=[];
var fecha;
var emailNuevo;
var idUsuario;
var idRutina; 

//DOM
function $(nombre)
{
    return document.getElementById(nombre);
}



function load(){

    TraerFechaHoy();

    console.log(email); 
   
    cargarBienvenido(usuario);
    enviarParametrosPOST(miBackEnd + 'Socio/Correo', rtaIdSocio,email);
    oculta('inscribirAClase');
    muestra('botonesInicio');
   
    muestra('fotobienvenido'); 
    muestra('fotobienvenido1'); 
    oculta('botonesSocio');
    oculta('historialInscripcion');
    oculta('historialSuscripcion');
    oculta('botonAtras');
    oculta('rutinasSocio');
    oculta('modificarSocio');
   
    //boton para cerrar sesion 
    document.getElementById("logOut").addEventListener("click",cerrarSesion);
  

 

   
    
    //document.getElementById('btnGuardar').addEventListener("click",click);
   
}
function cargarBienvenido(usuario){
    $('bienvenido').innerHTML='Bienvenido, '+usuario
}

    

function rtaIdSocio(respuesta){
    console.log(respuesta);
    var objetoUsuario = JSON.parse(respuesta);
    console.log(objetoUsuario);
    sessionStorage.setItem("idSocio",objetoUsuario['nroSocio']);
    nroSocio= sessionStorage.getItem('idSocio');
    enviarParametrosGET(miBackEnd + 'Socio/Suscripciones/' + nroSocio, retornarSuscripcionesActivas);
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
function clickMiCuenta(){
   
    enviarParametrosGET(miBackEnd + 'Socio/' + nroSocio, retornoClickConsultarSocio);
    
    muestra('botonesInicio');
    oculta('botonAtras'); 
    muestra('botonesSocio');
    oculta('historialInscripcion');
    oculta('historialSuscripcion');
    oculta('inscribirAClase');
    oculta('fotobienvenido'); 
    oculta('fotobienvenido1'); 
    oculta('rutinasSocio');
    oculta('modificarSocio');
}
function retornoClickConsultarSocio(respuesta) {
     
    muestra('botonesSocio');
   
    
    oculta('historialInscripcion');
   
    oculta('botonAtras');

    var socio = JSON.parse(respuesta);

    $("nroSocio").innerHTML = socio.nroSocio;
    $("nombreSocio").innerHTML = socio.nombre;
    $("apellidoSocio").innerHTML = socio.apellido;
    $("direccionSocio").innerHTML = socio.direccion;
    $("telefonoSocio").innerHTML = socio.telefono;
    $("emailSocio").innerHTML = socio.email;
    idUsuario=socio.usuario; 
    console.log(socio);
    console.log(idUsuario);

}


function clickModificarSocio() {

   
    
    swal({
        title: "Modificar",
        text: "¿Esta seguro que desea modificar a este socio?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            

            enviarParametrosGET(miBackEnd + 'Socio/' + nroSocio, retornoClickModificarSocio);
            
        } 
      });



   
}

function retornoClickModificarSocio(respuesta) {
   
    muestra('botonesInicio');
    oculta('botonAtras'); 
    oculta('botonesSocio');
    oculta('historialInscripcion');
    oculta('historialSuscripcion');
    oculta('inscribirAClase');
    oculta('fotobienvenido'); 
    oculta('fotobienvenido1'); 
    oculta('rutinasSocio');
    muestra('modificarSocio');

    var socioMod = JSON.parse(respuesta);
     console.log(socioMod);
    $("nombreSocioModificar").value = socioMod["nombre"];
    $("apellidoSocioModificar").value = socioMod["apellido"];
    $("direccionSocioModificar").value = socioMod["direccion"];
    $("telefonoSocioModificar").value = socioMod["telefono"];
    $("emailSocioModificar").value = socioMod["email"];

    $('nombreSocioModificar').addEventListener("keyup", validarSocioModificar);
    $('apellidoSocioModificar').addEventListener("keyup", validarSocioModificar);
    $('direccionSocioModificar').addEventListener("keyup", validarSocioModificar);
    $('telefonoSocioModificar').addEventListener("keyup", validarSocioModificar);
    $('emailSocioModificar').addEventListener("keyup", validarCorreo);
    $('btnModificarGuardar').addEventListener("click", clickGuardarModSocio);

}
function validarSocioModificar() {
    var ModNombre = $("nombreSocioModificar").value.length;
    var ModApellido = $("apellidoSocioModificar").value.length;
    var ModDireccion = $("direccionSocioModificar").value.length;
    var ModTelefono = $("telefonoSocioModificar").value.length;

    if (ModNombre >= 2 && ModApellido >= 2 && ModDireccion >= 2 && ModTelefono >= 10) {
        $('btnModificarGuardar').disabled = false;//habilitar
    } else {
        $('btnModificarGuardar').disabled = true;
    }

}

function validarCorreo(){

    var email = document.getElementById('emailSocioModificar').value;
    console.log(email);

    
    var pattEmail = new RegExp(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/);

    
    var resultadoEmail = pattEmail.test(email);

    if( resultadoEmail ){
        $('btnModificarGuardar').disabled = false;
    }else{
        $('btnModificarGuardar').disabled = true;
    }
}
function clickGuardarModSocio() {
    var nroSocio = document.getElementById("nroSocio").innerText;
    var email = document.getElementById('emailSocioModificar').value;
    console.log(email);
    $("btnModificarGuardar").disabled = true;
    emailNuevo=email; 
    enviarParametrosPOSTModificar(miBackEnd + 'Socio/Actualizacion/' + nroSocio, respuestaDeServidorMod);
    enviarParametrosPOST(miBackEnd + 'Usuario/EditarCorreo/'+ idUsuario,  respuestaDeServidorModEmail,email);
}
function respuestaDeServidorMod(respuesta){
    sessionStorage.setItem("usuario",emailNuevo);
    swal("Genial!", '"'+respuesta+'"', "success");

    clickMiCuenta()
}
function respuestaDeServidorModEmail() {
   
    console.log('correo cambiado');
   

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

function formato(texto){
    return texto.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2');
  }

  function formatoAño(texto){
    return texto.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1');
  }
function retornarSuscripcionesActivas(rta){

 respuesta=[];
 suscripcionActiva= JSON.parse(rta);
 
 if(suscripcionActiva.length==0){
    respuesta.push('  <h5 class="fw-bold">No posee una suscripcion activa</h5>');
 }else{
    suscripcionActiva.forEach(element=>{
        respuesta.push('<div class="card border-danger mb-3 px-0" style="max-width: 18rem;">'+
        '<div class="card-header bg-danger bg-opacity-10">'+element.nombreActividad+'</div>'+
        '<div class="card-body text-danger p-1">'+
          '<h5 class="card-title">'+element.nombreSuscripcion+'</h5>'+
          '<p class="card-text"> <b>Cant de clases: </b> '+element.cantClases+' <br><b>Fecha de Vencimiento:</b>'+formato(element.fechaVencimiento)+'</p>'+
        '</div>'+
        '</div>'
        )
    })
    
 }
 
 $('suscripcionActiva').innerHTML = respuesta.join('');
}


function clasesSalonPpal(){
    salon = "Principal"; 
    mostrarHorario(clasesHabilitadas,clasesInscriptas,salon,fecha);
}
function clasesSalonMusc(){
       salon = "Musculacion"; 
       mostrarHorario(clasesHabilitadas,clasesInscriptas,salon,fecha);
}
function cargarClasesInscriptas(rta){
    clasesInsc= JSON.parse(rta);




    //crea un array con los objetos de todos las fechas y dia de la semana
    clasesInsc.forEach(elemento => {
       
        
        clasesInscriptas.push(elemento.idClasePorDia); 
    });
    
}

function cargarClasesHabilitadas(rta){


clasesHabilitadas= JSON.parse(rta);



    if(clasesHabilitadas.length === 0){
        console.log("sin clases")
        $('semana').innerHTML = '<div class=" d-flex justify-content-center">no hay clases habilitadas para este socio.</div>';
    }else{
        mostrarHorario(clasesHabilitadas,clasesInscriptas,salon,fecha);
    }

}

function mostrarHorario(clases, clasesInscriptas,salon,fecha){
    todasSemanas= [];
    pagina = [];
    todosDias= [];
   
    var semana=[]; 
    //crea un array con los objetos de todos las fechas y dia de la semana
    clases.forEach(elemento => {
        let objeto={nombre:elemento.dias,fecha:elemento.fecha}
        
        semana.push(objeto); 
    });
    // filtra el array con los objetos de todos las fechas y dia de la semana para que tenga una sola fecha y dia
    var hash ={};

    semana= semana.filter( function(current){
    var exists= !hash[current.fecha];
    hash[current.fecha]= true;
    return exists;
    });
    console.log(semana);
    //tendria que traer las fechas mayores o igual a tal fecha (revisar igual)
    semana.forEach( element =>{
        let objeto={nombre:element.nombre,fecha:element.fecha}
        var fechaElemento = new Date(element.fecha);
         
        if(fechaElemento>=fecha){
           
            todosDias.push(objeto);}
        });

        

    console.log(JSON.stringify(todosDias));

    //arma cada columna con una fecha y dia y las guarda en todasSemanas
    todosDias.forEach( element =>{
        todasSemanas.push(armaColumnaPorDia(clases, clasesInscriptas,element.nombre,element.fecha, salon))

    });
    
    
   
 console.log(todosDias);
 console.log(todasSemanas);
 console.log(salon);
// para separar todas las columnas en 6 
 for(let i=0; i < 6; i++){
      
    pagina.push(todasSemanas[i]);
}    


$('semana').innerHTML = pagina.join('');
 //inserta en el container
//$('semana').innerHTML = todasSemanas.join('');
    
// calcula la cantidad de paginas
paginas = Math.ceil(todasSemanas.length / 6);
    


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

    var inicio = (6*pag) - 6;
    var fin = (6*pag);

    pagina = [];

    for(inicio; inicio < fin; inicio++){
        
        pagina.push(todasSemanas[inicio]);
    }

    paginaActual = pag;

    $('semana').innerHTML = pagina.join('');
}

function formateoHora(hora){
 return hora.format('HH:mm');
}

function armaColumnaPorDia(clases, clasesInscriptas ,dia, fecha, salon){

    var seleccionPorDia = [];
    var columnaDia=[];
    var dia; 
    var fecha;
     salon; 
   
    //pone en la columna el dia de la semana + la fecha
    columnaDia.push('<div class="col-2" >'+
            ' <div class="row " id="'+dia+'">'+
                '<div class="col mb-2">'+
                    '<div class="d-flex h-100 text-white bg-danger  justify-content-center rounded-3  align-items-center" style="  height: 80px;">'+
                    '<p class="fw-bold">' +dia+'  '+formato(fecha)+'</p>'+
                    '</div>'+
                    '</div>'+
                '</div>'
                    );
    //Procesa el json y lo separa por dia
    clases.forEach(clase => {
        
        if(clase.dias == dia && clase.fecha==fecha && clase.nombreSalon == salon){
            seleccionPorDia.push(clase);
            
        }
    });
    //para ordenar las horas
    seleccionPorDia.sort((a,b)=>a.horaDeInicio.localeCompare(b.horaDeInicio));


    
    if(seleccionPorDia.length === 0){
        
        columnaDia.push( '<div class=" d-flex justify-content-center">no hay clases habilitadas en este salon.</div>');
    }

    seleccionPorDia.forEach(clase => {
        console.log( (clasesInscriptas.includes(clase.idClasePorDia)));
        if (clasesInscriptas.includes(clase.idClasePorDia)) {
            columnaDia.push(' <div class="col px-0 " >'+
                    '<div class="card  bg-primary bg-opacity-25 mb-1 " style="  height: 250px;" >'+
                            '<div class="card-header">'+clase.horaDeInicio+'</div>'+
                            '<div class="card-body text-dark p-1" >'+
                                '<p class="card-title"><b>'+clase.nombreActividad+'</b></p>'+
                                '<p class="card-text"  style=" height: 110px;"> <b> Profe: </b> '+clase.profesor+' <br><b>Cupos libres: </b> '+clase.cupoDisponible+'</p>'+
                                '<div class=" d-flex  justify-content-end align-text-bottom"><button class="btn bg-light  "  onclick="clickEnviarBorrar(' + clase.idClasePorDia+ ')">Borrar</button></div>'+
                            '</div>'+            
                    '</div>'+
                '</div>')
            
        } else {
            columnaDia.push(
                ' <div class=" col px-0 ">'+
                    '<div class="card border-dark mb-1" style="  height: 250px;">'+
                            '<div class="card-header">'+clase.horaDeInicio+'</div>'+
                            '<div class="card-body text-dark  p-1" >'+
                                '<p class="card-title"><b>'+clase.nombreActividad+' </b></p>'+
                                '<p class="card-text"  style=" height: 110px;"> <b> Profe: </b> '+clase.profesor+' <br><b>Cupos libres: </b> '+clase.cupoDisponible+'</p>'+
                                '<div class=" d-flex  justify-content-end align-text-bottom"><button class="btn bg-primary bg-opacity-25 "  onclick="clickEnviarInscripcion(' + clase.idClasePorDia+ ')">Inscribir</button></div>'+
                            '</div>'+            
                    '</div>'+
                '</div>'
                    
                      );
        }
        
        
    });

    columnaDia.push('</div>'+
    '</div>');

    //console.log(columnaDia.join(''));
    return columnaDia.join('');
}


function clickEnviarInscripcion(idClase) {
    
    console.log(idClase);
    enviarParametrosPOSTInscribir(miBackEnd + 'Socio/Inscripcion', respuestaDeServidorInscripcion,nroSocio,idClase);
}
function respuestaDeServidorInscripcion(respuesta) {
    swal("Guardado!", '"'+respuesta+'"', "success");
    enviarParametrosGET(miBackEnd + 'Socio/Inscripciones/' + nroSocio, cargarClasesInscriptas);
    
    enviarParametrosGET(miBackEnd + 'Socio/ClasesHabilitadas/' + nroSocio, cargarClasesHabilitadas);
    //$("respuesta").innerHTML = respuesta;
}



function clickEnviarBorrar(idClase) {
    console.log(idClase);
    enviarParametrosPOSTInscribir(miBackEnd + 'Socio/Desinscripcion', respuestaDeServidorBorrar,nroSocio,idClase);
}
function respuestaDeServidorBorrar(respuesta) {
    swal("Borrado!", '"'+respuesta+'"', "success");
    enviarParametrosGET(miBackEnd + 'Socio/Inscripciones/' + nroSocio, cargarClasesInscriptas);
    
    enviarParametrosGET(miBackEnd + 'Socio/ClasesHabilitadas/' + nroSocio, cargarClasesHabilitadas);
    //$("respuesta").innerHTML = respuesta;
}


function ordenar(clases){
    var semana=[]; 
    console.log(clases);
    clases.forEach(elemento => {
        let objeto={nombre:elemento.dias,hora:elemento.horaDeInicio}
        
        semana.push(objeto); 
    });
    semana.sort((a,b)=>a.hora.localeCompare(b.hora));
    console.log('array ordenado: '+JSON.stringify(semana));
}

function clickRutinas(){
    oculta('botonesSocio');
   oculta('inscribirAClase');
    oculta('fotobienvenido');
    oculta('fotobienvenido1'); 
    oculta('historialInscripcion');
    oculta('historialSuscripcion');
    muestra('rutinasSocio');
    oculta('modificarSocio');
    enviarParametrosGET(miBackEnd + 'Rutina',retornoDelClickRutina);
    
}
function retornoDelClickRutina(rta){
    var rutinas= JSON.parse(rta);
    console.log(rutinas);

    var opciones=[];
        rutinas.forEach(rutina =>{
            opciones.push(' <div class="col-4">'+
            '<div class="card border-primary mb-1" style="max-width: 25rem;">'+
                    '<div class="card-header bg-primary bg-opacity-25">'+rutina.salon+'</div>'+
                    '<div class="card-body text-dark">'+
                        '<h5 class="card-title">'+rutina.nombre+'</h5>'+
                        '<p class="card-text"><b> Descripcion: </b> '+rutina.descripcion+'</p>'+
                        '<div class=" d-flex  justify-content-end"><button class="btn bg-primary bg-opacity-75 " data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="verRutina('+rutina.idRutina+')">Ver</button></div>'+
                    '</div>'+            
            '</div>'+
            '</div>')
        
        })

        $('rutinas').innerHTML = opciones.join('');
       
}

function verRutinaID(rta){
    console.log(rta);
    var rutinas= JSON.parse(rta);
    console.log(rutinas);
    var rutina=[];
    rutinas.forEach(element=>{
        if(element.idRutina==idRutina){
            let objeto={nombre:element.nombre,descripcion:element.descripcion, salon:element.salon}
        
            rutina.push(objeto); 
        }
    }
        )

        console.log(rutina);
        opciones=[];
        rutina.forEach(element=>{
            opciones.push('<div class="container">'+
    '<h2 class=" text-center mb-4">'+element.nombre+'</h2>'+
    '<p class="text-break fs-3">'+element.descripcion+'</p>'+
    '<div class="d-flex align-items-center"><h4 class=" align-items-center" >Salon: </h4><h5 class="lead">'+element.salon+'</h5></div>'+
    '</div>');
        })
         

   

    $('tablaRutinas').innerHTML= opciones.join('');
        
}

function verRutina(id){
   idRutina= id; 
   enviarParametrosGET(miBackEnd + 'Rutina',verRutinaID);
     

}

function quitarbarras(element){
    return element.slice(1, -1);
   }

   function exportarPDF(){
    
    var doc = new jsPDF('p', 'pt', 'a4');
    
    var tabla = document.getElementById("imprimir");
    
    var margin = 20; 
    var scale = ((doc.internal.pageSize.width - margin * 2) / (document.getElementById("imprimir").clientWidth)); 
    var scale_mobile = (doc.internal.pageSize.width - margin * 2) / document.body.getBoundingClientRect(); 
    console.log(tabla);

    console.log(scale);
    console.log(document.body.clientWidth);
  
    
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        
        doc.html(tabla, { 
            x: margin,
            y: margin,
            html2canvas:{
                scale: scale_mobile,
            },
            callback: function(doc){
                doc.output('dataurlnewwindow', {filename: 'pdf.pdf'}); 
            }
        });
    } else{
         
        doc.html(tabla, {
            x: margin,
            y: margin,
            html2canvas:{
                scale: scale,
            },
            callback: function(doc){
                doc.output('dataurlnewwindow', {filename: 'pdf.pdf'}); 
            }
        });
    }
};



function clickInscribirSocioClase() {
    oculta('botonesSocio');
    muestra('inscribirAClase');
    oculta('fotobienvenido');
    oculta('fotobienvenido1'); 
    oculta('historialInscripcion');
    oculta('historialSuscripcion');
    oculta('rutinasSocio');
    oculta('modificarSocio');

    enviarParametrosGET(miBackEnd + 'Socio/Inscripciones/' + nroSocio, cargarClasesInscriptas);
    
    enviarParametrosGET(miBackEnd + 'Socio/ClasesHabilitadas/' + nroSocio, cargarClasesHabilitadas);

}




function clickHistorialInscripcion(){
    const hoy = new Date();
    var fechaAnterior; 
    oculta('botonesSocio');
    oculta('inscribirAClase');
    oculta('fotobienvenido'); 
    oculta('fotobienvenido1');
    muestra('historialInscripcion');
    oculta('historialSuscripcion');
    oculta('rutinasSocio');
    oculta('modificarSocio');

  
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
   
    enviarParametrosPostHistorial(miBackEnd + 'Socio/HistorialInscripciones/' +nroSocio, cargarHistorialInscrip, fechaInicio,fechaFin);
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
        enviarParametrosPostHistorial(miBackEnd + 'Socio/HistorialInscripciones/' +nroSocio, cargarHistorialInscrip, fechaInicio,fechaFin);
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
                '<td>'+ formatoAño(element.fecha)+'</td>'+
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
                '<td><p id="skeletonTablaSocios">' + "-" + '</p></td>' +
              
            '</tr>'
        );
    }

    $('infoHistorialSuscrip').innerHTML = opciones.join('');
    
}



function clickHistorialSuscripcion(){
    const hoy = new Date();
    var fechaAnterior; 
    oculta('botonesSocio');
    oculta('inscribirAClase');
    oculta('fotobienvenido'); 
    oculta('fotobienvenido1');
    oculta('historialInscripcion');
    muestra('historialSuscripcion');
    oculta('rutinasSocio');
    oculta('modificarSocio');

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

     enviarParametrosPostHistorial(miBackEnd + 'Socio/HistorialSuscripciones/' + nroSocio, cargarHistorialSuscrip, fechaInicio,fechaFin);
     cargarSkeletonHistorialSus(); 
}



function validarFechaSus(){
    
    var fechaInicio = document.getElementById("txtFechaInicioSus").value;
    var fechaFin= document.getElementById("txtFechaFinSus").value;
    console.log( fechaInicio);
    console.log(fechaFin);
    enviarParametrosPostHistorial(miBackEnd + 'Socio/HistorialSuscripciones/' + nroSocio, cargarHistorialInscrip, fechaInicio,fechaFin);
    cargarSkeletonHistorialSus(); 

}

function cargarHistorialSuscrip(rta){

suscripciones= JSON.parse(rta);
console.log(suscripciones);
opciones=[];
suscripciones.forEach(
    element =>{
        opciones.push(
            '<tr >'+
                '<th scope="row">'+element.nombreSuscripcion+'</th>'+
                '<th scope="row">'+element.nombreActividad+'</th>'+
                '<td>'+element.cantClases+'</td>'+
                '<td>'+ formatoAño(element.fechaEmision)+'</td>'+
                '<td>'+ formatoAño(element.fechaVencimiento)+'</td>'+
                '<td>'+element.nroPago+'</td>'+
                '<td>'+ formatoAño(element.fecha)+'</td>'+
                '<td>$'+ element.importe+'</td>'+
            
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


function enviarParametrosPOST(servidor, funcionARealizar,email){

    //declaro el objeto
    var xmlhttp = new XMLHttpRequest(); 

    //agrega datos para pasar por POST
    var datos = new FormData();
    datos.append("email",email);
    

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


function enviarParametrosPOSTInscribir(servidor, funcionARealizar,idSocio,idClase) {

    //declaro el objeto
    var xmlhttp = new XMLHttpRequest();

    //agrega datos para pasar por POST
    var datos = new FormData();
    datos.append("nroSocio", idSocio);
    datos.append("idClasePorDia", idClase);


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

