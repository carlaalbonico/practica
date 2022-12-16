addEventListener("load", load)

var usuario= sessionStorage.getItem('nombre');
var miBackEnd = 'http://localhost:555/';

var todasSemanas = [];
var paginas;
var pagina = [];
var paginaActual = 1;
var salon = "Principal";

var fecha;
var clase;

function $(nombre) {
    return document.getElementById(nombre);
}

function load() {
    cargarBienvenido(usuario);
   oculta('botonAtras');
   oculta('sociosInscriptos');
   muestra('grillaHorarios');
   cargando();
   TraerFechaHoy();
   console.log(fecha);

    traerClases(miBackEnd + 'ClasePorDia', verClases);
    
    
     console.log(salon);

     //boton para cerrar sesion 
     document.getElementById("logOut").addEventListener("click", cerrarSesion);
     //boton para perfil usuario logueado
     document.getElementById("perfil").addEventListener("click", mostrarPerfil);
 
     document.getElementById("botonAtras").addEventListener("click", atras);
}
function cargarBienvenido(usuario){
    $('bienvenido').innerHTML='Bienvenido, '+usuario
}

function cargando(){
    var opciones=[];
    opciones.push('<div class="d-flex justify-content-center mt-5">'+
    '<div class="spinner-grow" role="status">'+
        '<span class="visually-hidden">Loading...</span>'+
    '</div>'+'</div><div class="d-flex justify-content-center mt-2">'+
    ' <div><p class="fw-bold">Cargando...</p></div>'+
'</div>');
$('semana').innerHTML = opciones.join(''); 
}

function cerrarSesion() {
    sessionStorage.clear();
    window.location.assign("http://localhost/practica/login.html");
}
function mostrarPerfil() {
    window.location.assign("http://localhost/practica/perfilUsuario.html");
}

function oculta(id) {
    if (document.getElementById) { //se obtiene el id
        var el = document.getElementById(id);
        el.style.display = 'none';

    }

}
function muestra(id) {
    if (document.getElementById) { //se obtiene el id
        var el = document.getElementById(id); //se define la variable "el" igual a nuestro div

        el.style.display = "block";

    }

}

function atras() {
     
    muestra('grillaHorarios');
   oculta('botonAtras');
   oculta('sociosInscriptos');

}
function clasesSalonPpal(){
    salon = "Principal"; 
    mostrarHorario(clases,salon,fecha);
  }
function clasesSalonMusc(){
       salon = "Musculacion"; 
       mostrarHorario(clases,salon,fecha);
  }
 function estaSemana(){
    calcularSemanaActual();
   
    traerClases(miBackEnd + 'ClasePorDia', verClases);
 }

 function anteriorSemana(){
    calcularSemanaAnterior();
   
    traerClases(miBackEnd + 'ClasePorDia', verClases);
 }

function cargarSkeletonTabla(){
    var opciones = [];

   

    $('semana').innerHTML = opciones.join('');
    
}
function TraerFechaHoy(){
    const hoy = new Date();
    fecha=sumarDias(hoy,-1);
    console.log (fecha); 
}


function diahoy(){
    let diaDeSemana = hoy.getDay();
    let dia = hoy.getDate();
    let mes = hoy.getMonth()+1;
    let año = hoy.getFullYear();
    var fechaCompleta; 
    fechaCompleta= año+'-'+mes+'-'+dia; 
}
function sumarDias(dia, dias){
    dia.setDate(dia.getDate() + dias);
    return dia;
  }


function calcularDomingo(){
    const fecha = new Date();
    let diaDeSemana = fecha.getDay();
   
   
  
    var diaDomingo; 

   switch (diaDeSemana){
        case 0: diaDomingo=sumarDias(fecha,0);
        case 1: diaDomingo=sumarDias(fecha,-1);
        case 2: diaDomingo=sumarDias(fecha,-2);
        case 3: diaDomingo=sumarDias(fecha,-3);
        case 4: diaDomingo=sumarDias(fecha,-4);
        case 5: diaDomingo=sumarDias(fecha,-5);
        case 6: diaDomingo=sumarDias(fecha,-6);

    }
    
    console.log('dia domingo: '+diaDomingo);
}




function formato(texto){
    return texto.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2');
  }





function verClases(respuesta){
    //console.log(respuesta);
    clases = JSON.parse(respuesta); 
   console.log(clases);
   //console.log(clases);
    cargarSkeletonTabla();
   
    console.log(fecha);
    mostrarHorario(clases,salon,fecha);
    
}





function mostrarHorario(clases, salon,fecha){
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
        todasSemanas.push(armaColumnaPorDia(clases, element.nombre,element.fecha, salon))

    });
    
    
   

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

function armaColumnaPorDia(clases, dia, fecha, salon){

    var seleccionPorDia = [];
    var columnaDia=[];
    var dia; 
    var fecha;
     salon; 
   
    //pone en la columna el dia de la semana + la fecha
    columnaDia.push('<div class="col-2" >'+
            ' <div class="row " id="'+dia+'">'+
                '<div class="col mb-2">'+
                    '<div class="d-flex h-100 text-white bg-danger  justify-content-center rounded-3  align-items-center" style=" height: 80px;">'+
                        '<p class="fs-5 fw-bold">' +dia+'  '+formato(fecha)+'</p>'+
                    '</div>'+
                '</div>'+
            '</div>'
                    );
    //Procesa el json y lo separa por dia
    clases.forEach(clase => {
        
        if(clase.dias == dia && clase.fecha==fecha && clase.nombreSalon == salon){
            seleccionPorDia.push(clase);
            console.log(clase);
        }
    });
    //para ordenar las horas
    seleccionPorDia.sort((a,b)=>a.horaDeInicio.localeCompare(b.horaDeInicio));

    if(seleccionPorDia.length === 0){
        console.log("sin clases"); 
        columnaDia.push( '<div class=" d-flex justify-content-center">no hay clases en este salon.</div>');
    }
    

    seleccionPorDia.forEach(clase => {
        columnaDia.push(
        ' <div class="col px-0">'+
            '<div class="card border-dark mb-1" >'+
                    '<div class="card-header" id="cardhora">'+clase.horaDeInicio+'</div>'+
                    '<div class="card-body text-dark  px-1 " >'+
                        '<h5 class="card-title" id="cardactividad">'+clase.actividad+'</h5>'+
                        '<div class="card-text "  style="height: 75px; "> <div id="cardprofe"><b> Profe: </b> '+clase.profesor+'</div><div> <b>Cupos libres: </b> '+clase.cupoDisponible+'</div></div>'+
                        '<div class=" d-flex  justify-content-end"><button class="btn bg-primary bg-opacity-25 "  onclick="clickClase('+clase.clase+',/'+clase.actividad+'/,/'+clase.horaDeInicio+'/)">Ver</button></div>'+
                    '</div>'+            
            '</div>'+
        '</div>'
            
              );
    });

    columnaDia.push('</div>'+
    '</div>');

    //console.log(columnaDia.join(''));
    return columnaDia.join('');
}

function clickClase(idClase,actividad,hora){
    console.log(idClase);
    console.log(actividad);
    console.log(hora);
    clase= idClase; 
    
    cargarFormularioChico(actividad,hora);
    traerClases(miBackEnd + 'ClasePorDia/'+idClase, inscriptosAClase);
}
function cargarFormularioChico(actividad,hora) {
    activity= String(actividad);
    hour= String(hora);
 
  
   acti=quitarbarras(activity);
   horas=quitarbarras(hour);
    $("claseChico").innerHTML = ''+acti+' - '+horas+' ';
   
}

function quitarbarras(element){
 return element.slice(1, -1);
}




function inscriptosAClase(rta){
    muestra('botonAtras');
    oculta('grillaHorarios');
    muestra('sociosInscriptos');
    console.log(rta);
    inscriptos = JSON.parse(rta);
    tablaSocios = [];

    if(inscriptos.length === 0){
        console.log("sin inscriptos")
        $('infoSociosInscrip').innerHTML = '<div class=" d-flex justify-content-center mt-2">no hay socios inscriptos</div>';
    }else{
        inscriptos.forEach(socio => {
            tablaSocios.push(
                '<tr >' +
                '<th scope="row">' + socio.nroSocio + '</th>' +
                '<td>' + socio.nombre + ' ' + socio.apellido + '</td>' +
                
    
                '<td><button class="btn bg-primary bg-opacity-25 modificacion" id="presente' + socio.nroSocio +'" onclick="presente(' + socio.nroSocio +')">presente</button></td>' +
                '<td><button class="btn bg-danger bg-opacity-25 modificacion" id="ausente' + socio.nroSocio +'"  onclick="ausente(' + socio.nroSocio + ')">ausente</button></td>' +
                '</tr>'
            );
        });

        $('infoSociosInscrip').innerHTML = tablaSocios.join('');
    }



}


function presente(idSocio){
    var presente= 1; 
    console.log(presente);
    enviarParametrosPOSTAsistencia(miBackEnd + 'Socio/Asistencia', respuestaDeServidorPresente,idSocio,clase,presente);
    var nombreBton= "presente"+idSocio;
    console.log(nombreBton);
    $(nombreBton).disabled = true; 
}
function respuestaDeServidorPresente(respuesta) {
    swal("Guardado  presente!", '"'+respuesta+'"', "success");
     
}

function ausente(idSocio){
    var presente= 0; 
    enviarParametrosPOSTAsistencia(miBackEnd + 'Socio/Asistencia', respuestaDeServidorAusente,idSocio,clase,presente);
    var nombreBton= "ausente"+idSocio;
    console.log(nombreBton);
    $(nombreBton).disabled = true; 
}
function respuestaDeServidorAusente(respuesta) {
    swal("Guardado  ausente!", '"'+respuesta+'"', "success");
    
}


function traerClases(servidor, funcionARealizar) {

    var xmlhttp = new XMLHttpRequest();
    
    xmlhttp.open("GET", servidor, true);
    
    xmlhttp.onreadystatechange = function () {
        
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            
            if (xmlhttp.status == 200) {                
                funcionARealizar(xmlhttp.responseText);

            } else {
                swal("Error", "revise los datos cargados", "error");
            }
        }
    }
    
    xmlhttp.send();
}

function enviarParametrosPOSTAsistencia(servidor, funcionARealizar,idSocio,clase,presente) {
    console.log(presente);
    console.log(clase);
    //declaro el objeto
    var xmlhttp = new XMLHttpRequest();

    //agrega datos para pasar por POST
    var datos = new FormData();
    datos.append("nroSocio", idSocio);
    datos.append("idClasePorDia", clase);
    datos.append("presente", presente);

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