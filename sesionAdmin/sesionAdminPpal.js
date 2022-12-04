

//agrega funcion load a HTML; 

addEventListener("load",load)
 
var usuario= sessionStorage.getItem('nombre');
//variable del servidor
var miBackEnd = 'http://localhost:555/';
var extra= 0; 
var salon = "Principal";
var fecha;

var medioPago= "Efectivo";
//DOM
function $(nombre)
{
    return document.getElementById(nombre);
}


function load(){
    cargarBienvenido(usuario);
    
    
    TraerFechaHoy();
    oculta('pagos');
    oculta('verSuscripciones');
    oculta('botonAtras');
    oculta('cartel'); 
    muestra('botonesInicio');
    oculta('verHorarios');
    //boton para cerrar sesion 
    document.getElementById("logOut").addEventListener("click",cerrarSesion);
    //boton para perfil usuario logueado
    document.getElementById("perfil").addEventListener("click", mostrarPerfil);
 

   
    
    //document.getElementById('btnGuardar').addEventListener("click",click);
   
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
$('respuesta').innerHTML = opciones.join(''); 
}

function cerrarSesion() {
    sessionStorage.clear();
    window.location.assign("http://localhost/practica/login.html");
}


function oculta_muestra(id){
    if (document.getElementById){ //se obtiene el id
    var el = document.getElementById(id); 
    el.style.display = (el.style.display == 'none') ? 'block' : 'none'; 
    
    }

}
function mostrarPerfil() {
    window.location.assign("http://localhost/practica/perfilUsuario.html");
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
oculta('verSuscripciones');
oculta('botonAtras');
oculta('cartel'); 
muestra('botonesInicio');
oculta('verHorarios');
oculta('pagos');}

function menuRegistrarSocio() {
    window.location.assign("http://localhost/practica/socio/registrarSocio.html");//aca va el enlace de la pagina registrar; 
}
function clickVerSuscripciones() {
    oculta('cartel');
    oculta('botonesInicio');
    muestra('verSuscripciones');
    muestra('botonAtras');
    oculta('pagos');
    //manda los datos para cargar el formularioChico
   
  
    enviarParametrosGET(miBackEnd + 'Actividad',cargarOpcionesClase); 
    enviarParametrosGET(miBackEnd + 'Suscripcion/',cargarSuscripciones);
    
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
                       
                    '</div>'+            
            '</div>'+
            '</div>')
        
        })

        $('suscripciones').innerHTML = opciones.join('');
    }
    
    
}

function clasesSalonPpal(){
    salon = "Principal"; 
    mostrarHorario(clases,salon);
  }
function clasesSalonMusc(){
       salon = "Musculacion"; 
       mostrarHorario(clases,salon);
  }


function verHorarios(){
    oculta('cartel');
    oculta('botonesInicio');
    oculta('verSuscripciones');
    oculta('pagos');
    muestra('botonAtras');
    muestra('verHorarios');
    

    enviarParametrosGET(miBackEnd + 'Clase', cargarHorario);
}




function cargarHorario(respuesta){
    clases = JSON.parse(respuesta); 

    console.log(clases);

    mostrarHorario(clases, salon); 
    ordenar(clases);
}


function armarSemana(clases){
    clases.forEach(elemento => {
    
    
        diasSemana.push(elemento.dias); 
    });
    console.log(diasSemana);
    // filtra el array con los objetos de todos las fechas y dia de la semana para que tenga una sola fecha y dia
    var hash ={};
    
    diasSemana= diasSemana.filter( (item,index)=> {
        return diasSemana.indexOf(item)===index;
    });
    
    console.log(diasSemana);
}


function mostrarHorario(clases, salon){
    var semana=['Lunes', 'Martes', 'Miercoles','Jueves','Viernes', 'Sabado'];
   var todaSemana= [];

    
    semana.forEach( element =>{
        todaSemana.push(armaColumnaPorDia(clases,  salon, element))

    });
    
    
    $('tableHorario').innerHTML = todaSemana.join('');


}


function formateoHora(hora){
    return hora.format('HH:mm');
   }

function armaColumnaPorDia(clases, salon,dia){


var seleccionPorDia = [];
var columnaDia=[];

columnaDia.push('<div class="col-2" >'+
            ' <div class="row " id="'+dia+'">'+
                '<div class="col mb-2">'+
                    '<div class="d-flex h-100 text-white bg-danger  justify-content-center rounded-3  align-items-center" style=" height: 80px;">'+
                        '<p class="fs-5 fw-bold">' +dia+'</p>'+
                    '</div>'+
                '</div>'+
            '</div>'
                    );

//Procesa el json y lo separa por dia
clases.forEach(clase => {
        
    if(clase.dias == dia && clase.salon == salon){
        seleccionPorDia.push(clase);
        console.log(clase);
    }
});

//para ordenar las horas
seleccionPorDia.sort((a,b)=>a.horaDeInicio.localeCompare(b.horaDeInicio));


console.log(seleccionPorDia);

if(seleccionPorDia.length === 0){
    console.log("sin clases"); 
    columnaDia.push( '<div class=" d-flex justify-content-center">no hay clases en este salon.</div>');
}


seleccionPorDia.forEach(clase => {
    columnaDia.push(
    ' <div class="col px-0">'+
        '<div class="card border-dark mb-1" >'+
                '<div class="card-header bg-light">'+clase.horaDeInicio +'</div>'+
                '<div class="card-body text-dark px-1 " >'+
                    '<h5 class="card-title">'+clase.nombre+'</h5>'+
                    '<p class="card-text"  style=" height: 50px;"> <b> Profe: </b> '+clase.profesor+'</p>'+
                    
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
function previsualizar(){
    var tablaHorario = document.getElementById("tableHorario").outerHTML;
    $('salon').innerHTML = salon; 
    $('tablaHorario').innerHTML= tablaHorario; console.log('me llamamamamamamamam');
}
function previsualizarSuscripcion(){
    var tablaSusc = document.getElementById("suscripciones").outerHTML;
  
    $('tablaSuscripcion').innerHTML= tablaSusc; console.log('me llamamamamamamamam');
}


function exportarPDF(){
    
    var doc = new jsPDF('l', 'pt', 'a4');
    
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

function exportarPDFSus(){
    
    var doc = new jsPDF('l', 'pt', 'a4');
    
    var tabla = document.getElementById("imprimirSus");
    
    var margin = 20; 
    var scale = ((doc.internal.pageSize.width - margin * 2) / (document.getElementById("imprimirSus").clientWidth)); 
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
function cargarSkeleton(){
    var opciones = [];

    for(let i=0; i < 5; i++){
        opciones.push(
            '<tr>' +
                '<td><p id="skeletonTabla">' + "-" + '</p></td>' +
                '<td><p id="skeletonTabla">' + "-" + '</p></td>' +
                '<td><p id="skeletonTabla">' + "-" + '</p></td>' +
                
               
            '</tr>'
        );
    }

    $('infoPagos').innerHTML = opciones.join('');
    
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



function sumarDias(dia, dias){
    dia.setDate(dia.getDate() + dias);
    return dia;
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

function clickPagos(){
    oculta('botonesInicio');
    muestra('pagos');
    oculta('cartel');
    oculta('verSuscripciones');
    muestra('botonAtras');
    oculta('verHorarios');
    const hoy = new Date();
    var fechaAnterior; 
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
   
    enviarParametrosPostPago(miBackEnd + 'Pago/Historial' , verPagos, fechaInicio,fechaFin,medioPago);
    cargarSkeleton(); 
}

function validarFecha(){
    
    var fechaInicio = document.getElementById("txtFechaInicio").value;
    var fechaFin= document.getElementById("txtFechaFin").value;
    console.log( fechaInicio);
    console.log(fechaFin);
    enviarParametrosPostPago(miBackEnd + 'Pago/Historial' , verPagos, fechaInicio,fechaFin,medioPago);
    cargarSkeleton(); 

}
function formatoAño(texto){
    return texto.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1');
  }

function verPagos(rta){
var total=0; 
 console.log(rta)
var pagos= JSON.parse(rta);
     var opciones=[];
pagos.forEach(element=>{total=total+element.importe
    opciones.push(
        '<tr >'+
                '<th scope="row">'+element.medioPago+'</th>'+
                '<td>'+formatoAño(element.fecha)+'</td>'+
                '<td> $'+element.importe+'</td>'+
             
        '</tr>'
    )
});
console.log(total);
opciones.push('<tr >'+
'<th scope="row">TOTAL</th>'+
'<td></td>'+
'<td scope="row"> $'+total+'</td>'+

'</tr>');
 $('infoPagos').innerHTML=opciones.join('');
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

function enviarParametrosPostPago(servidor, funcionARealizar, fechaInicio,fechaFin,medioPago){
    console.log(fechaInicio);
    console.log(fechaFin);
      //declaro el objeto
   var xmlhttp = new XMLHttpRequest();
  
   //agrega datos para pasar por POST
   var datos = new FormData();
   datos.append("fechaMin", fechaInicio);
   datos.append("fechaMax", fechaFin);
   datos.append("medioPago", medioPago);
  
      
  
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