addEventListener("load", load);

function $(nombre)
{
    return document.getElementById(nombre);
}


function load(){
    document.getElementById("natural").addEventListener("click",muestraNatural);
    document.getElementById("funcional").addEventListener("click",muestraFuncional);
    document.getElementById("freebox").addEventListener("click",muestraFreeBox);
    document.getElementById("streching").addEventListener("click",muestraStreching);
    document.getElementById("spinning").addEventListener("click",muestraSpinning);
    document.getElementById("rutinas").addEventListener("click",muestraRutinas);

    document.getElementById("logIn").addEventListener("click",registrar);
    document.getElementById("home").addEventListener("click",home);
    document.getElementById("activities").addEventListener("click",activities);
    document.getElementById("schedule").addEventListener("click",schedule);
    document.getElementById("contact").addEventListener("click",contact);
   
}

function registrar(){
    window.location.assign("http://localhost/practica/login.html");
    
}
function home(){
    window.location.assign("http://localhost/practica/index.html");
}
function activities(){
    window.location.assign("http://localhost/practica/actividades.html");
}
function schedule(){
    window.location.assign("http://localhost/practica/horarios.html");
}
function contact(){
    window.location.assign("http://localhost/practica/contacto.html");
}

function TraerFecha(){
    const fecha = new Date();
    let anio = fecha.getFullYear();
    $("txtFecha").innerHTML = anio;
}
function muestraNatural(){
    window.location.assign("http://localhost/practica/actividades.html");
    oculta('descFuncional'); 
    oculta('descStreching'); 
    oculta('descSpinning'); 
    oculta('descFreeBox'); 
    oculta('descRutinas'); 
   oculta_muestra('descNatural');
}
function muestraFuncional(){
    window.location.assign("http://localhost/practica/actividades.html");
    oculta('descNatural'); 
  
    oculta('descStreching'); 
    oculta('descSpinning'); 
    oculta('descFreeBox'); 
    oculta('descRutinas'); 
    oculta_muestra('descFuncional');
 }
 
 function muestraStreching(){
    
    oculta('descNatural'); 
    oculta('descFuncional'); 
    
    oculta('descSpinning'); 
    oculta('descFreeBox'); 
    oculta('descRutinas'); 
    oculta_muestra('descStreching');
    window.location.assign("http://localhost/practica/actividades.html");
 }
 function muestraFreeBox(){
    window.location.assign("http://localhost/practica/actividades.html");
    oculta('descNatural'); 
    oculta('descFuncional'); 
    oculta('descStreching'); 
    oculta('descSpinning'); 
    
    oculta('descRutinas'); 
    oculta_muestra('descFreeBox');
 }
 function muestraRutinas(){
    window.location.assign("http://localhost/practica/actividades.html");
    oculta('descNatural'); 
    oculta('descFuncional'); 
    oculta('descStreching'); 
    oculta('descSpinning'); 
    oculta('descFreeBox'); 
    
    oculta_muestra('descRutinas');
 }
 function muestraSpinning(){
    window.location.assign("http://localhost/practica/actividades.html");
    oculta('descNatural'); 
    oculta('descFuncional'); 
    oculta('descStreching'); 
     
    oculta('descFreeBox'); 
    oculta('descRutinas'); 
    oculta_muestra('descSpinning');
 }
 