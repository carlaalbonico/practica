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
var fechaHoy;
var clasesInscriptas=[];
//DOM
function $(nombre)
{
    return document.getElementById(nombre);
}


function load(){

    TraerFechaHoy();

    console.log(email); 
   
    cargarBienvenido(usuario);
    enviarParametrosPOST(miBackEnd + 'Socio/Correo', rtaIdSocio);
    oculta('inscribirAClase');
    muestra('botonesInicio');
   
    oculta('botonesSocio');
    oculta('historialInscripcion');
    oculta('historialSuscripcion');
    oculta('botonAtras');

     
    //boton para cerrar sesion 
    document.getElementById("logOut").addEventListener("click",cerrarSesion);
    //boton para perfil usuario logueado
    document.getElementById("perfil").addEventListener("click",mostrarPerfil);

 

   
    
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
    oculta('botonAtras');
    oculta('inscribirAClase');
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
    

}

function TraerFechaHoy(){
    const fecha = new Date();
    let diaDeSemana = fecha.getDay();
    let dia = fecha.getDate();
    let mes = fecha.getMonth()+1;
    let año = fecha.getFullYear();
    var fechaCompleta; 
    fechaCompleta= new Date(año+'-'+mes+'-'+dia); 
    fechaHoy= fechaCompleta;
}

function formato(texto){
    return texto.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1');
  }
function retornarSuscripcionesActivas(rta){

 respuesta=[];
 suscripcionActiva= JSON.parse(rta);
 
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


function clasesSalonPpal(){
    salon = "Principal"; 
    mostrarHorario(clasesHabilitadas,clasesInscriptas,salon,fechaHoy);
}
function clasesSalonMusc(){
       salon = "Musculacion"; 
       mostrarHorario(clasesHabilitadas,clasesInscriptas,salon,fechaHoy);
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
        mostrarHorario(clasesHabilitadas,clasesInscriptas,salon,fechaHoy);
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
                    '<p class="fs-5 fw-bold">' +dia+'  '+formato(fecha)+'</p>'+
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
                    '<div class="card  bg-primary bg-opacity-75 mb-1 " style="  height: 250px;" >'+
                            '<div class="card-header">'+clase.horaDeInicio+'</div>'+
                            '<div class="card-body text-dark " >'+
                                '<h5 class="card-title">'+clase.nombreActividad+'</h5>'+
                                '<p class="card-text"  style=" height: 96px;"> <b> Profe: </b> '+clase.profesor+' <br><b>Cupos libres: </b> '+clase.cupoDisponible+'</p>'+
                                '<div class=" d-flex  justify-content-end align-text-bottom"><button class="btn bg-light  "  onclick="clickEnviarBorrar(' + clase.idClasePorDia+ ')">Borrar</button></div>'+
                            '</div>'+            
                    '</div>'+
                '</div>')
            
        } else {
            columnaDia.push(
                ' <div class=" col px-0 ">'+
                    '<div class="card border-dark mb-1" style="  height: 250px;">'+
                            '<div class="card-header">'+clase.horaDeInicio+'</div>'+
                            '<div class="card-body text-dark   " >'+
                                '<h5 class="card-title">'+clase.nombreActividad+'</h5>'+
                                '<p class="card-text"  style=" height: 96px;"> <b> Profe: </b> '+clase.profesor+' <br><b>Cupos libres: </b> '+clase.cupoDisponible+'</p>'+
                                '<div class=" d-flex  justify-content-end align-text-bottom"><button class="btn bg-primary bg-opacity-75 "  onclick="clickEnviarInscripcion(' + clase.idClasePorDia+ ')">Inscribir</button></div>'+
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




function clickInscribirSocioClase() {
    muestra('inscribirAClase');
    enviarParametrosGET(miBackEnd + 'Socio/Inscripciones/' + nroSocio, cargarClasesInscriptas);
    
    enviarParametrosGET(miBackEnd + 'Socio/ClasesHabilitadas/' + nroSocio, cargarClasesHabilitadas);

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


function enviarParametrosPOST(servidor, funcionARealizar){

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

