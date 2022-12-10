

//agrega funcion load a HTML; 

addEventListener("load",load)
 
var usuario= sessionStorage.getItem('nombre');
//variable del servidor
var miBackEnd = 'http://localhost:555/';
var fecha;
var medioPago= "Efectivo";
let myChart;
let barras;
let myChart2;
//DOM
function $(nombre)
{
    return document.getElementById(nombre);
}


function load(){
    totalSocios();
    totalProfes(); 
    totalClases();
    totalRutinas();
    TraerFechaHoy(); 
    cargarBienvenido(usuario);
   
   
    inscriptosXActividad();
    actividadXDia(); 
    inscripcionesActivas();
   
    oculta('botonAtras');
    oculta('cartel'); 
   
    
    
  
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

function inscripcionesActivas(){
    enviarParametrosGET(miBackEnd + 'Informe/SuscripcionesActivas' ,  graficoBarrasSus)
    $('graficoBarrasSusc').innerHTML=' <canvas id="BarrasSusc"></canvas>';
}
function totalSocios(){
    enviarParametrosGET(miBackEnd + 'Informe/TotalSocios' ,  kpiTotalSocios)
   
}
function totalProfes(){
    enviarParametrosGET(miBackEnd + 'Informe/TotalProfes' ,  kpiTotalProfes)
   
}
function totalClases(){
    enviarParametrosGET(miBackEnd + 'Informe/TotalClases' , kpiTotalClases)
   
}
function totalRutinas(){
    enviarParametrosGET(miBackEnd + 'Informe/TotalRutinas' , kpiTotalRutinas)
   
}


function kpiTotalSocios(rta){
    var array=JSON.parse(rta);
    console.log(array);
    
      var total=[]; 

    array.forEach(element=>{
        
        total.push(element.Total)
    })
    $('totalSocios').innerHTML=total+' socios';
}
function kpiTotalProfes(rta){
    var array=JSON.parse(rta);
    console.log(array);
    
      var total=[]; 

    array.forEach(element=>{
        
        total.push(element.Total)
    })
    $('totalProfes').innerHTML=total+' profesores';
}
function kpiTotalClases(rta){
    var array=JSON.parse(rta);
    console.log(array);
    
      var total=[]; 

    array.forEach(element=>{
        
        total.push(element.Total)
    })
    $('totalClases').innerHTML=total+' clases';
}
function kpiTotalRutinas(rta){
    var array=JSON.parse(rta);
    console.log(array);
    
      var total=[]; 

    array.forEach(element=>{
        
        total.push(element.Total)
    })
    $('totalRutinas').innerHTML=total+' rutinas';
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
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
          hoverOffset: 4
        }]
      }
    }) ;
}
function graficoBarrasSus(rta){
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
    const ctx = document.getElementById('BarrasSusc');
    if (myChart2) {
        myChart2.destroy();
    }
    myChart2= new Chart(ctx,
    {
       
        
        type: 'bar',
        data: {
        labels: valoresNombre,
        datasets: [{
            axis: 'y',  
          label: 'cantidad de suscripciones activas',
          data: total,
          borderWidth: 1,
          backgroundColor: [
            'rgba(255, 99, 132)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        indexAxis: 'y',
        scales: {
            x: {
              beginAtZero: true,
              ticks: {
                  // forces step size to be 50 units
                  stepSize: 1
                }
            }
          }
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