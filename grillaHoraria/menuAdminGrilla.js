addEventListener("load", load)

var usuario= sessionStorage.getItem('nombre');
var miBackEnd = 'http://localhost:555/';

var todasSemanas = [];
var paginas;
var pagina = [];
var paginaActual = 1;
var salon = "Principal";
var fechaDomingo;
var fecha;

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
    traerClases(miBackEnd + 'ClasePorDia', verClases);
    //TraerFechaHoy();
    
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
    let diaDeSemana = hoy.getDay();
    let dia = hoy.getDate();
    let mes = hoy.getMonth()+1;
    let año = hoy.getFullYear();
    var fechaCompleta; 
    fechaCompleta= new Date(año+'-'+mes+'-'+dia); 
    fecha= fechaCompleta;
}
function sumarDias(fecha, dias){
    fecha.setDate(fecha.getDate() + dias);
    return fecha;
  }


function calcularSemanaActual(){
    const fecha = new Date();
    let diaDeSemana = fecha.getDay();
    let dia = fecha.getDate();
    let mes = fecha.getMonth()+1;
    let año = fecha.getFullYear();
    var fechaCompleta; 
    var fechaDom;
    var diaDomingo; 

    fechaCompleta= new Date(año+'-'+mes+'-'+dia); 

    console.log(fechaCompleta);
    switch (diaDeSemana){
        case 0: diaDomingo=sumarDias(fechaCompleta,-6);
        case 1: diaDomingo=sumarDias(fechaCompleta,-0);
        case 2: diaDomingo=sumarDias(fechaCompleta,-1);
        case 3: diaDomingo=sumarDias(fechaCompleta,-2);
        case 4: diaDomingo=sumarDias(fechaCompleta,-3);
        case 5: diaDomingo=sumarDias(fechaCompleta,-4);
        case 6: diaDomingo=sumarDias(fechaCompleta,-5);

    }
    

    fechaDom=new Date(diaDomingo);

    fechaDomingo= fechaDom;
    console.log('dia domingo: '+fechaDomingo);
}


//Arreglar porqe no me funciona si 
function calcularSemanaAnterior(){
    const fecha = new Date();
    let diaDeSemana = fecha.getDay();
    let dia = fecha.getDate();
    let mes = fecha.getMonth()+1;
    let año = fecha.getFullYear();
    var fechaCompleta; 
    var fechaDom;
    var diaDomingo; 


    fechaCompleta= new Date(año+'-'+mes+'-'+dia); 

    fechaCompleta= sumarDias(fechaCompleta,-7);
    console.log(fechaCompleta);
    switch (diaDeSemana){
        case 0: diaDomingo=sumarDias(fechaCompleta,-6);
        case 1: diaDomingo=sumarDias(fechaCompleta,-0);
        case 2: diaDomingo=sumarDias(fechaCompleta,-1);
        case 3: diaDomingo=sumarDias(fechaCompleta,-2);
        case 4: diaDomingo=sumarDias(fechaCompleta,-3);
        case 5: diaDomingo=sumarDias(fechaCompleta,-4);
        case 6: diaDomingo=sumarDias(fechaCompleta,-5);

    }
    

    fechaDom=new Date(diaDomingo);
    fechaDomingo= fechaDom;
    //fechaDomingo= fechaDom;
    console.log('dia domingo anterior: '+fechaDomingo);
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
                    '<div class="d-flex h-100 text-white bg-danger  justify-content-center rounded-3  align-items-center" style="width: 235px;  height: 80px;">'+
                    '<p class="fs-4 fw-bold">' +dia+'  '+formato(fecha)+'</p>'+
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
    if(seleccionPorDia.length === 0){
        console.log("sin clases"); 
        columnaDia.push( '<div class=" d-flex justify-content-center">no hay clases en este salon.</div>');
    }
    

    seleccionPorDia.forEach(clase => {
        columnaDia.push(
        ' <div class="col">'+
            '<div class="card border-dark mb-1" >'+
                    '<div class="card-header">'+clase.horaDeInicio+'</div>'+
                    '<div class="card-body text-dark text-wrap  " style=" height: 194px;">'+
                        '<h5 class="card-title">'+clase.actividad+'</h5>'+
                        '<p class="card-text"  style=" height: 72px;"> <b> Profe: </b> '+clase.profesor+' <br><b>Cupos libres: </b> '+clase.cupoDisponible+'</p>'+
                        '<div class=" d-flex  justify-content-end"><button class="btn bg-primary bg-opacity-75 "  onclick="clickClase(' + clase.clase+ ')">Ver</button></div>'+
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
    console.log(idClase);
    traerClases(miBackEnd + 'ClasePorDia/'+idClase, inscriptosAClase);

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
                
    
                '<td><button class="btn bg-danger bg-opacity-75 modificacion"  onclick="(' + socio.nroSocio + ')">presente</button></td>' +
    
                '</tr>'
            );
        });

        $('infoSociosInscrip').innerHTML = tablaSocios.join('');
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