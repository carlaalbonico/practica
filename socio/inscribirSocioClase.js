
//agrega funcion load a HTML; 
addEventListener("load", load)
var usuario= sessionStorage.getItem('nombre');
//variable del servidor
var miBackEnd = 'http://localhost:555/';
var todasSemanas = [];
var paginas;
var pagina = [];
var paginaActual = 1;
var salon = "Principal";
var fechaHoy;
var idSocio= sessionStorage.getItem('idSocio');
var clasesInscriptas=[];

//DOM
function $(nombre) {
    return document.getElementById(nombre);
}


function load() {
    cargarBienvenido(usuario);
    //para ocultar los menus
    console.log(idSocio);
    muestra('formularioChico');
    muestra('inscribirSocioClase');
  
    muestra('botonAtras');
   

    TraerFechaHoy();


    //para ocultar cartel del mensaje
    oculta_muestra('cartel');

    //boton para cerrar sesion 
    document.getElementById("logOut").addEventListener("click", cerrarSesion);
    //boton para perfil usuario logueado
    document.getElementById("perfil").addEventListener("click", mostrarPerfil);
    document.getElementById("botonAtras").addEventListener("click", atras);
    
    enviarParametrosGET(miBackEnd + 'Socio/' + idSocio, cargarFormularioChico);
    enviarParametrosGET(miBackEnd + 'Socio/Inscripciones/' + idSocio, cargarClasesInscriptas);
    
    enviarParametrosGET(miBackEnd + 'Socio/ClasesHabilitadas/' + idSocio, cargarClasesHabilitadas);

    
   
}
function cargarBienvenido(usuario){
    $('bienvenido').innerHTML='Bienvenido, '+usuario
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
    window.location.assign("http://localhost/practica/socio/menuAdminSocio.html");

}


function cargarFormularioChico(respuesta) {
    var socioFC = JSON.parse(respuesta);
    $("nroSocioForm").innerHTML = socioFC.nroSocio;
    $("nombreSocioForm").innerHTML = socioFC.nombre;
    $("apellidoSocioForm").innerHTML = socioFC.apellido;
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
    return texto.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2');
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

console.log(clasesInsc);


    //crea un array con los objetos de todos las fechas y dia de la semana
    clasesInsc.forEach(elemento => {
       
        
        clasesInscriptas.push(elemento.idClasePorDia); 
    });
    console.log(clasesInscriptas);
}

function cargarClasesHabilitadas(rta){


clasesHabilitadas= JSON.parse(rta);

console.log(clasesHabilitadas);

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


    console.log("array de clases inscriptas"+clasesInscriptas); 
    if(seleccionPorDia.length === 0){
        console.log("sin clases"); 
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
    enviarParametrosPOSTInscribir(miBackEnd + 'Socio/Inscripcion', respuestaDeServidorInscripcion,idSocio,idClase);
}
function respuestaDeServidorInscripcion(respuesta) {
    swal("Guardado!", '"'+respuesta+'"', "success");
    enviarParametrosGET(miBackEnd + 'Socio/Inscripciones/' + idSocio, cargarClasesInscriptas);
    
    enviarParametrosGET(miBackEnd + 'Socio/ClasesHabilitadas/' + idSocio, cargarClasesHabilitadas);
    //$("respuesta").innerHTML = respuesta;
}



function clickEnviarBorrar(idClase) {
    console.log(idClase);
    enviarParametrosPOSTInscribir(miBackEnd + 'Socio/Desinscripcion', respuestaDeServidorBorrar,idSocio,idClase);
}
function respuestaDeServidorBorrar(respuesta) {
    swal("Borrado!", '"'+respuesta+'"', "success");
    enviarParametrosGET(miBackEnd + 'Socio/Inscripciones/' + idSocio, cargarClasesInscriptas);
    
    enviarParametrosGET(miBackEnd + 'Socio/ClasesHabilitadas/' + idSocio, cargarClasesHabilitadas);
    //$("respuesta").innerHTML = respuesta;
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