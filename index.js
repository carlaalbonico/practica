addEventListener("load", load);

function $(nombre)
{
    return document.getElementById(nombre);
}


function load(){ oculta('btnvolveract');
    oculta('descNatural'); 
    oculta('descFuncional'); 
    oculta('descStreching'); 
    oculta('descSpinning'); 
    oculta('descFreeBox'); 
    oculta('descRutinas'); 
    

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
    muestra('btnvolveract');
    oculta('cartelPpal');
    oculta('videoPpal');

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
   oculta('cartelPpal');
    oculta('descFuncional'); 
    oculta('descStreching'); 
    oculta('descSpinning'); 
    oculta('descFreeBox'); 
    oculta('descRutinas'); 
   oculta_muestra('descNatural');
   oculta('videoPpal');
   muestra('btnvolveract');
}
function muestraFuncional(){
    oculta('cartelPpal');
    oculta('descNatural'); 
  
    oculta('descStreching'); 
    oculta('descSpinning'); 
    oculta('descFreeBox'); 
    oculta('descRutinas'); 
    oculta_muestra('descFuncional');
    oculta('videoPpal');
    muestra('btnvolveract');
 }
 
 function muestraStreching(){
    oculta('cartelPpal');
    oculta('descNatural'); 
    oculta('descFuncional'); 
    
    oculta('descSpinning'); 
    oculta('descFreeBox'); 
    oculta('descRutinas'); 
    oculta_muestra('descStreching');
    oculta('videoPpal');
    muestra('btnvolveract');
    
 }
 function muestraFreeBox(){
    oculta('cartelPpal');
    oculta('descNatural'); 
    oculta('descFuncional'); 
    oculta('descStreching'); 
    oculta('descSpinning'); 
    
    oculta('descRutinas'); 
    oculta_muestra('descFreeBox');
    oculta('videoPpal');
    muestra('btnvolveract');
 }
 function muestraRutinas(){
    oculta('cartelPpal');
    oculta('descNatural'); 
    oculta('descFuncional'); 
    oculta('descStreching'); 
    oculta('descSpinning'); 
    oculta('descFreeBox'); 
    
    oculta_muestra('descRutinas');
    oculta('videoPpal');
    muestra('btnvolveract');
 }
 function muestraSpinning(){
    oculta('cartelPpal');
    oculta('descNatural'); 
    oculta('descFuncional'); 
    oculta('descStreching'); 
     
    oculta('descFreeBox'); 
    oculta('descRutinas'); 
    oculta_muestra('descSpinning');
    oculta('videoPpal');
    muestra('btnvolveract');
 }
 