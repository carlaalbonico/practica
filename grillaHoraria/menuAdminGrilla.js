addEventListener("load", load)

var miBackEnd = 'http://localhost:555/';

var todasSemanas = [];
var paginas;
var pagina = [];
var paginaActual = 1;


function $(nombre) {
    return document.getElementById(nombre);
}

function load() {

   oculta('botonAtras');
   oculta('sociosInscriptos');
    traerClases(miBackEnd + 'ClasePorDia', verClases);
    TraerFechaHoy();


     //boton para cerrar sesion 
     document.getElementById("logOut").addEventListener("click", cerrarSesion);
     //boton para perfil usuario logueado
     document.getElementById("perfil").addEventListener("click", mostrarPerfil);
 
     document.getElementById("botonAtras").addEventListener("click", atras);
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



function cargarSkeletonTabla(){
    var opciones = [];

    for(let i=0; i < 5; i++){
        opciones.push(
            '<tr>' +
                '<td><p id="skeletonTabla">' + "-" + '</p></td>' +
                '<td><p id="skeletonTabla">' + "-" + '</p></td>' +
                '<td><p id="skeletonTabla">' + "-" + '</p></td>' +
                
                '<td><p id="skeletonTabla">' + "-" + '</p></td>' +
                '<td><p id="skeletonTabla">' + "-" + '</p></td>' +
                '<td><p id="skeletonTabla">' + "-" + '</p></td>' +
            '</tr>'
        );
    }

    $('semana').innerHTML = opciones.join('');
    
}
function TraerFechaHoy(){
    const fecha = new Date();
    let diaDeSemana = fecha.getDay();
    let dia = fecha.getDate();
    let mes = fecha.getMonth();

}



function formato(texto){
    return texto.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2');
  }


function fechas(clases){
    var fechas =[];

    clases.forEach(clase => {
         if(!diasFechas.includes(clase.fecha))
        fechas.push(clase.fecha);
    });

    console.log(fechas);
    return fechas;

}


function verClases(respuesta){
     console.log(respuesta);
    clases = JSON.parse(respuesta); 
   
    console.log(clases);
    cargarSkeletonTabla();
    diasFechas(clases);
    mostrarHorario(clases);
}





function diasFechas(clases){
    var todosDias=[];
    
    clases.forEach(elemento => {
        let objeto={nombre:elemento.dias,fecha:elemento.fecha}
        var fechaDia= todosDias.fecha;
        todosDias.push(objeto);
         
        return todosDias;
    });

    var hash ={};

todosDias= todosDias.filter( function(current){
    var exists= !hash[current.fecha];
    hash[current.fecha]= true;
    return exists;
});

console.log(JSON.stringify(todosDias));
return todosDias; 
}


function mostrarHorario(clases){
    todasSemanas= [];
    pagina = [];
    
    
    var todosDias=[];
    //crea un array con los objetos de todos las fechas y dia de la semana
    clases.forEach(elemento => {
        let objeto={nombre:elemento.dias,fecha:elemento.fecha}
        var fechaDia= todosDias.fecha;
        todosDias.push(objeto);
         
        return todosDias;
    });
// filtra el array con los objetos de todos las fechas y dia de la semana para que tenga una sola fecha y dia
    var hash ={};

    todosDias= todosDias.filter( function(current){
    var exists= !hash[current.fecha];
    hash[current.fecha]= true;
    return exists;
    });

    console.log(JSON.stringify(todosDias));
  //arma cada columna con una fecha y dia 
    todosDias.forEach( element =>{
        todasSemanas.push(armaColumnaPorDia(clases, element.nombre,element.fecha))

    });
    
    
   
 console.log(todosDias);
 console.log(todasSemanas);

 for(let i=0; i < 6; i++){
        
    pagina.push(todasSemanas[i]);
}    

$('semana').innerHTML = pagina.join('');
 //inserta en el container
//$('semana').innerHTML = todasSemanas.join('');
    

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

function armaColumnaPorDia(clases, dia, fecha){

    var seleccionPorDia = [];
    var columnaDia=[];
    var dia; 
    var fecha;
   
    //pone en la columna el dia de la semana + la fecha
    columnaDia.push('<div class="col-2" >'+
            ' <div class="row " id="'+dia+'">'+
                '<div class="col mb-2">'+
                    '<div class="d-flex h-100 text-white bg-dark  bg-opacity-75 rounded-3 badge bg-primary text-wrap " >'+
                    '<p class="fs-3">' +dia+' '+formato(fecha)+'</p>'+
                    '</div>'+
                '</div>'
                    );
    //Procesa el json y lo separa por dia
    clases.forEach(clase => {
        
        if(clase.dias == dia && clase.fecha==fecha){
            seleccionPorDia.push(clase);
            
        }
    });

    

    seleccionPorDia.forEach(clase => {
        columnaDia.push(
        ' <div class="col">'+
            '<div class="card border-dark mb-1" style="max-width: 18rem;">'+
                    '<div class="card-header">'+clase.horaDeInicio+'</div>'+
                    '<div class="card-body text-dark">'+
                        '<h5 class="card-title">'+clase.actividad+'</h5>'+
                        '<p class="card-text"> <b> Profe: </b> '+clase.profesor+' <br><b>Cupos libres: </b> '+clase.cupoDisponible+'</p>'+
                        '<div class=" d-flex  justify-content-end"><button class="btn bg-primary bg-opacity-50 "  onclick="clickClase(' + clase.idClase + ')">Ver</button></div>'+
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

function clickClase(idClase){
    traerClases(miBackEnd + 'ClasePorDia/'+idClase, inscriptosAClase);

}




function inscriptosAClase(rta){
    muestra('botonAtras');
    oculta('grillaHorarios');
    muestra('sociosInscriptos');
    console.log(rta);
    inscriptos = JSON.parse(rta);
    if(inscriptos.length === 0){
        console.log("sin inscriptos")
        $('infoSociosInscrip').innerHTML = '<div class=" d-flex justify-content-center">no hay socios inscriptos</div>';
    }



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