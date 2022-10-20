addEventListener("load", load);

function $(nombre)
{
    return document.getElementById(nombre);
}


function load(){
     
     oculta('descFuncional'); 
     oculta('descStreching'); 
     oculta('descSpinning'); 
     oculta('descFreeBox'); 
     oculta('descRutinas'); 

     document.getElementById("btnnatural").addEventListener("click",muestraNatural);
     document.getElementById("btnfuncional").addEventListener("click",muestraFuncional);
     document.getElementById("btnfreebox").addEventListener("click",muestraFreeBox);
     document.getElementById("btnstreching").addEventListener("click",muestraStreching);
     document.getElementById("btnspinning").addEventListener("click",muestraSpinning);
     document.getElementById("btnrutinas").addEventListener("click",muestraRutinas);

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

function muestraNatural(){
    
    oculta('descFuncional'); 
    oculta('descStreching'); 
    oculta('descSpinning'); 
    oculta('descFreeBox'); 
    oculta('descRutinas'); 
   oculta_muestra('descNatural');
}
function muestraFuncional(){
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
 }
 function muestraFreeBox(){
    oculta('descNatural'); 
    oculta('descFuncional'); 
    oculta('descStreching'); 
    oculta('descSpinning'); 
    
    oculta('descRutinas'); 
    oculta_muestra('descFreeBox');
 }
 function muestraRutinas(){
    oculta('descNatural'); 
    oculta('descFuncional'); 
    oculta('descStreching'); 
    oculta('descSpinning'); 
    oculta('descFreeBox'); 
    
    oculta_muestra('descRutinas');
 }
 function muestraSpinning(){
    oculta('descNatural'); 
    oculta('descFuncional'); 
    oculta('descStreching'); 
     
    oculta('descFreeBox'); 
    oculta('descRutinas'); 
    oculta_muestra('descSpinning');
 }
 