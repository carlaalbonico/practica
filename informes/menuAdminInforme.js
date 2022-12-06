

//agrega funcion load a HTML; 

addEventListener("load",load)
 
var usuario= sessionStorage.getItem('nombre');
//variable del servidor
var miBackEnd = 'http://localhost:555/';
var fecha;
var medioPago= "Efectivo";
let myChart;
let barras;
//DOM
function $(nombre)
{
    return document.getElementById(nombre);
}


function load(){
    TraerFechaHoy(); 
    cargarBienvenido(usuario);
   
   
    inscriptosXActividad();
    actividadXDia(); 
    oculta('botonAtras');
    oculta('cartel'); 
    oculta('botonesInforme');
    oculta('myChart');
    muestra('reporteTorta');
    oculta('reportePago');
  
    //boton para cerrar sesion 
    document.getElementById("logOut").addEventListener("click",cerrarSesion);
    //boton para perfil usuario logueado
    
    document.getElementById("perfil").addEventListener("click", mostrarPerfil);
 

   
    
    //document.getElementById('btnGuardar').addEventListener("click",click);
   
}
function cargarBienvenido(usuario){
    $('bienvenido').innerHTML='Bienvenido, '+usuario
}
function mostrarPerfil() {
    window.location.assign("http://localhost/practica/perfilUsuario.html");
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
function validarFecha(){
    
    var fechaInicio = document.getElementById("txtFechaInicio").value;
    var fechaFin= document.getElementById("txtFechaFin").value;
    console.log( fechaInicio);
    console.log(fechaFin);
    enviarParametrosPostPago(miBackEnd + 'Pago/Historial' , generarJsonSumado, fechaInicio,fechaFin,medioPago);
}
function formatoAño(texto){
    return texto.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1');
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
   
    const hoy = new Date();
    var fechaAnterior; 
  
    fechaAnterior=sumarDias(hoy,-30);
   
   
    var fechaFin=  formatoDia(fecha);
    var fechaInicio= formatoDia(fechaAnterior);
  
   
    enviarParametrosPostPago(miBackEnd + 'Pago/Historial' , generarJsonSumado, fechaInicio,fechaFin,medioPago);
    $('pagos').innerHTML=' <canvas id="graficoPagos"></canvas>';
}

function actividadXDia(){
    enviarParametrosGET(miBackEnd + 'Informe/ClasesXDia' , generarJsonSumado)
    $('graficoBarras').innerHTML=' <canvas id="barras"></canvas>';
}

function generarJsonSumado(rta){
  
    var array= JSON.parse(rta); 
    console.log(array);

      
      var valoresDias=[]; 
      var total=[]; 

array.forEach(element=>{
    valoresDias.push(element.dias);
    total.push(element.Total)
}
    
);
console.log(valoresDias);
console.log(total);
      ctx = document.getElementById('barras');
    
     if (barras) {
        barras.destroy();
    }
    barras = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: valoresDias,
    datasets: [{
      label: 'cantidad de actividades por dia',
      data: total,
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
            // forces step size to be 50 units
            stepSize: 1
          }
      }
    }
  }
});

}

function inscriptosXActividad(){
    enviarParametrosGET(miBackEnd + 'Informe/InscriptosXActividad' , graficoTorta)
    $('graficoTorta').innerHTML=' <canvas id="torta"></canvas>';
}



function graficoTorta(rta){
    var array=JSON.parse(rta);
    console.log(array);

    var valoresNombre=[]; 
      var total=[]; 

    array.forEach(element=>{
        valoresNombre.push(element.nombre);
        total.push(element.Total)
    })
    console.log(total);
    console.log(valoresNombre);
    const ctx = document.getElementById('torta');
    if (myChart) {
        myChart.destroy();
    }
    myChart= new Chart(ctx,
    {
        type: 'pie',
        data: {
        labels: valoresNombre,
        datasets: [{
          label: 'cantidad de inscriptos por actividad',
          data: total,
          backgroundColor: [
            'red',
            'green',
            'blue',
            'yellow',
            'orange',
            'pink'
          ],
          hoverOffset: 4
        }]
      }
    }) ;
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