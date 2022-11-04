//agrega funcion load a HTML; 
addEventListener("load",load)
 
//variable del servidor
var miBackEnd = 'http://localhost:555/';
var extra= 0; 
//DOM
function $(nombre)
{
    return document.getElementById(nombre);
}


function load(){
    clickConsultarSusc();
    oculta('botonAtras');
    oculta('formularioModSusc'); 
    oculta('cartel');
    
    //boton para cerrar sesion 
    document.getElementById("logOut").addEventListener("click",cerrarSesion);
    //boton para perfil usuario logueado
    document.getElementById("perfil").addEventListener("click",mostrarPerfil);

    document.getElementById("botonAtras").addEventListener("click",atras);

    //document.getElementById("btnRegistrarClasePorProfesor").addEventListener("click",clickConsultarClasePorProf);
    
    document.getElementById ('slctTipoClase').addEventListener('change',validacionClase); 
    
    //document.getElementById ('tableClases').addEventListener('click',clickModifClase); 
    //document.getElementById('btnGuardarClase').addEventListener("click",click);
    
}

function cerrarSesion() {
    sessionStorage.clear();
    window.location.assign("http://localhost/practica/login.html");
}
function mostrarPerfil(){
    window.location.assign("http://localhost/practica/perfilUsuario.html");
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
function atras(){ 
    oculta('botonAtras');
    
    muestra('suscripcion'); 
    
    oculta('formularioModSusc'); 
    oculta('cartel'); 

}
function clickRegistrarSusc(){
    window.location.assign("http://localhost/practica/suscripcion/registrarSusc.html");//aca va el enlace de la pagina registrar; 
}

function clickConsultarSusc(){
    muestra('botonAtras');
    muestra('suscripcion'); 
    
    oculta('formularioModSusc'); 
    oculta('cartel'); 

    enviarParametrosGET(miBackEnd + 'Actividad',cargarOpcionesClase); 
    enviarParametrosGET(miBackEnd + 'Suscripcion', retornoDelClickConsultarClase);
    
}

function validacionClase(){
    enviarParametrosGET(miBackEnd + 'Clase', retornoDelClickConsultarClase);
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
    $("slctTipoClase").innerHTML = opciones;    
    
}

function retornoDelClickConsultarClase(valor){

    
    var tipoClase= document.getElementById("slctTipoClase").value; 
    var suscripcion =JSON.parse(valor);
    console.log(suscripcion); 
        if (tipoClase!=0){
            

            suscripcion.sort(function (x, y) { return x.nombre.localeCompare(y.nombre) });
            var suscripcionFiltradas= clases.filter( item =>{
                var nombreMin= item.nombre.toLowerCase();
                return nombreMin.includes(tipoClase.toLowerCase()); 
                
            }); 

            var opciones=[]; 


            suscripcionFiltradas.forEach(element => {
                opciones.push('<tr >'+
                
                '<td>'+element.nombre+'</td>'+
                '<td>'+element.cantClases+'</td>'+
                '<td>'+element.descSuscripcion+'</td>'+
                '<td>'+element.actividad+'</td>'+
                '<td>'+element.precio+'</td>'+
               
                
                '<td><button class="btn btn-success modificacion"  onclick="clickModifSuscripcion(' + element.idSuscripcion + ')">Ver más</button></td>' +

                '</tr>' );
                
            });


            
        $('tableSuscripciones').innerHTML=opciones; 
                    

    }else{
        
        var opciones=[]; 

        suscripcion.forEach(element => {
            opciones.push('<tr >'+
                '<td>'+element.nombre+'</td>'+
                '<td>'+element.cantClases+'</td>'+
                '<td>'+element.descSuscripcion+'</td>'+
                '<td>'+element.actividad+'</td>'+
                '<td>'+element.precio+'</td>'+
               
                
                '<td><button class="btn btn-success modificacion"  onclick="clickModifSuscripcion(' + element.idSuscripcion + ')">Ver más</button></td>' +

                '</tr>' );
            
        });
        $('tableSuscripciones').innerHTML=opciones; 
    }
}

function clickModifSuscripcion(){
    
    let modificacion = document.querySelectorAll(".modificacion"); 
    var idDeBoton=0; 
    modificacion.forEach((boton) => {
      boton.addEventListener("click", function(e){
        e.preventDefault();
        
        console.log(boton.id); 
        idDeBoton= boton.id; 
        extra=  idDeBoton;
       
        if (idDeBoton!=0){
            if(confirm('¿Esta seguro que desea modificar esta clase?')){
            validar(); 
            }}      
       return  idDeBoton; 
      })
    });
    
    

}


 
 function respuestaDeServidor(respuesta){
     muestra('cartel');
     $("respuesta").innerHTML=respuesta;
    
 }


function enviarParametrosGET(servidor,funcionARealizar){

    //Declaro el objeto
    var xmlhttp = new XMLHttpRequest();

    //Indico hacia donde va el mensaje
    xmlhttp.open("GET", servidor, true);

    xmlhttp.onreadystatechange = function(){

        if(xmlhttp.readyState == XMLHttpRequest.DONE){

            if(xmlhttp.status == 200){
                console.log(xmlhttp.responseText);
                funcionARealizar(xmlhttp.responseText);
            }
            else{
                alert("Ocurrio un error");
            }
        }
    }
    //Envio el mensaje
    xmlhttp.send();
}


function enviarInfoDeClase(servidor, funcionARealizar){

    //declaro el objeto
    var xmlhttp = new XMLHttpRequest(); 

    //agrega datos para pasar por POST
    var datos = new FormData();
    datos.append("idclase",extra);
    datos.append("dias",$("slctDias").value);
    datos.append("horaDeInicio",$("txtHoraInicio").value);
    datos.append("horaDeFin",$("txtHoraFin").value);
    datos.append("fechaDeInicio",$("txtFechaInicio").value);
    datos.append("fechaDeFin",$("txtFechaFin").value);
    datos.append("cupos",$("txtCupos").value);
    datos.append("profesor",$("slctDatosProf").value);
    datos.append("salon",$("slctDatosSalon").value);
    datos.append("modalidad",$("slctMod").value);
        //indico hacia donde va el mensaje
        
    xmlhttp.open ("POST", servidor, true); 

    //seteo el evento
    xmlhttp.onreadystatechange = function(){
        //veo si llego la respuesta del servidor
        if(xmlhttp.readyState==XMLHttpRequest.DONE){
            //reviso si la respuesta del servidor es la correcta
            if(xmlhttp.status==200){
                funcionARealizar(xmlhttp.response);
            }else{
                alert("Ocurrió un error");
            };
        }
    }
    //esto va siempre cuando se hace un formulario
    xmlhttp.setRequestHeader("enctype","multipart/form-data");
    //envio el mensaje 
    xmlhttp.send(datos);
}
