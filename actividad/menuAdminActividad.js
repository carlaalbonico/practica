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
    oculta('botonAtras');
    oculta('clasesPorProf');
    oculta('formularioModificarClase'); 
    oculta('cartel');
    
    //boton para cerrar sesion 
    document.getElementById("logOut").addEventListener("click",cerrarSesion);
    //boton para perfil usuario logueado
    document.getElementById("perfil").addEventListener("click",mostrarPerfil);

    document.getElementById("botonAtras").addEventListener("click",atras);

    document.getElementById("btnRegistrarClasePorProfesor").addEventListener("click",clickConsultarClasePorProf);
    document.getElementById ('slctDatosClasesxProf').addEventListener('change',validacionClaseClasesxProf);
    document.getElementById ('slctTipoClase').addEventListener('change',validacionClase); 
    
    document.getElementById ('tableClases').addEventListener('click',clickModifClase); 
    document.getElementById('btnGuardarClase').addEventListener("click",click);
    
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
    
    muestra('clases'); 
    oculta('clasesPorProf'); 
    oculta('formularioModificarClase'); 
    oculta('cartel'); 

}
function clickRegistrarClase(){
    window.location.assign("http://localhost/practica/clase/registrarActividad.html");//aca va el enlace de la pagina registrar; 
}

function clickConsultarClase(){
    muestra('botonAtras');
    
    oculta('cartel'); 

    enviarParametrosGET(miBackEnd + 'Actividad',cargarOpcionesClase); 
    enviarParametrosGET(miBackEnd + 'Clase', retornoDelClickConsultarClase);
    
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
    var clases =JSON.parse(valor);
   
        if (tipoClase!=0){
            

            clases.sort(function (x, y) { return x.nombre.localeCompare(y.nombre) });
            var clasesFiltradas= clases.filter( item =>{
                var nombreMin= item.nombre.toLowerCase();
                return nombreMin.includes(tipoClase.toLowerCase()); 
                
            }); 

            var opciones=[]; 


            clasesFiltradas.forEach(element => {
                opciones.push('<tr >'+
                '<th scope="row">'+element.idClase+'</th>'+
                '<td>'+element.nombre+'</td>'+
                '<td>'+element.dias+'</td>'+
                '<td>'+element.horaDeInicio+'</td>'+
                '<td>'+element.horaDeFin+'</td>'+
                '<td>'+element.salon+'</td>'+
                '<td>'+element.profesor+'</td>'+
                '<td>'+element.cupos+'</td>'+
                
                '<td><button class="btn  btn-danger modificacion" type="button" id="'+element.idClase+'">Modificar</button></td>'+

                '</tr>' );
                
            });


            
        $('tableClases').innerHTML=opciones; 
                    

    }else{
        
        var opciones=[]; 

        clases.forEach(element => {
            opciones.push('<tr >'+
            '<th scope="row">'+element.idClase+'</th>'+
            '<td>'+element.nombre+'</td>'+
            '<td>'+element.dias+'</td>'+
            '<td>'+element.horaDeInicio+'</td>'+
            '<td>'+element.horaDeFin+'</td>'+
            '<td>'+element.salon+'</td>'+
            '<td>'+element.profesor+'</td>'+
            '<td>'+element.cupos+'</td>'+
           
            '<td><button class="btn btn-danger modificacion"  id="'+element.idClase+'">Modificar</button></td>'+

            '</tr>' );
            
        });
        $('tableClases').innerHTML=opciones; 
    }
}

function clickModifClase(){
    
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

function validar(){
    muestra('botonAtras');
    
    muestra('clases'); 
    oculta('clasesPorProf'); 
    muestra('formularioModificarClase'); 
    oculta('cartel'); 
    enviarParametrosGET(miBackEnd + 'Clase', retornoDelClickModificarClase);
    enviarParametrosGET(miBackEnd + 'Actividad',cargarOpcionesClaseMod);
    enviarParametrosGET(miBackEnd + 'Profesor',cargarOpcionesProf);
    enviarParametrosGET(miBackEnd + 'Salon',cargarOpcionesSalon);
}
function cargarOpcionesClaseMod(nro){
    var clase= JSON.parse(nro);
    console.log(clase);
    clase.sort(function (x, y) { return x.nombre.localeCompare(y.nombre) });

    var opciones = []

   clase.forEach(element => {
        opciones.push('<option value="' + element.idActividad + '">' + element.nombre + '</option>');
    });
    
    $("slctClase").innerHTML = opciones; 
}

function cargarOpcionesProf(nroProf){
    
    var profes= JSON.parse(nroProf);
    console.log(profes);
    profes.sort(function (x, y) { return x.nombre.localeCompare(y.nombre) });

    var opciones = []

    profes.forEach(element => {
        opciones.push('<option value="' + element.legajo + '">' + element.nombre +' '+ element.apellido + '</option>');
    });
    
    $("slctDatosProf").innerHTML = opciones;
    
   
}
function cargarOpcionesSalon(nro){
    
    var salon= JSON.parse(nro);
    console.log(salon);
    salon.sort(function (x, y) { return x.nombreSalon.localeCompare(y.nombreSalon) });

    var opciones = []

    salon.forEach(element => {
        opciones.push('<option value="' + element.idSalon + '">' + element.nombreSalon +' capacidad:'+ element.capacidad + '</option>');
    });
    
    $("slctDatosSalon").innerHTML = opciones;

   
}
function retornoDelClickModificarClase(valor){

    var clases =JSON.parse(valor);
        var dia ;
        var horaInicio;
        var horaFin;
      
    console.log(clases); 

     clases.forEach(element => {
        if(element.idClase==extra){
           console.log(element.dias); 
           console.log(element.horaDeInicio); 
           console.log(element.horaDeFin); 
           console.log(element.profesor); 
           console.log(element.salon); 
        dia = element.dias;
        horaInicio = element.horaDeInicio;
        horaFin= element.horaDeFin;
        profesor= element.profesor;
        salon = element.salon;
       
        }
        
    });
   
        $("slctDias").value = dia;
        $("txtHoraInicio").value = horaInicio;
        $("txtHoraFin").value = horaFin;
        
}

function click(){
    // $("btnGuardarClase").disabled=true;
    alert(extra);
     enviarInfoDeClase(miBackEnd + 'Clase/Actualizacion'+extra, respuestaDeServidor);
 }
 
 function respuestaDeServidor(respuesta){
     muestra('cartel');
     $("respuesta").innerHTML=respuesta;
    
 }

function clickConsultarClasePorProf(){
    muestra('botonAtras');
    
    oculta('clases'); 
    muestra('clasesPorProf'); 
    oculta('formularioModificarClase'); 
    oculta('cartel'); 

    enviarParametrosGET(miBackEnd + 'Profesor',cargarOpcionesClasesxProf);




}
function cargarOpcionesClasesxProf(nroProf){
    
    var profes= JSON.parse(nroProf);
    console.log(profes);
    profes.sort(function (x, y) { return x.nombre.localeCompare(y.nombre) });

    var opciones = []

    profes.forEach(element => {
        opciones.push('<option value="' + element.legajo + '">' + element.nombre +' '+ element.apellido + '</option>');
    });
    
    $("slctDatosClasesxProf").innerHTML = opciones;
    
}
function validacionClaseClasesxProf(){
    var legajo= document.getElementById("slctDatosClasesxProf").value; 
    console.log(legajo);
    enviarParametrosGET(miBackEnd + 'Clase/Profesor/'+legajo,  cargarOpcionesClasesPorProf);
}

function cargarOpcionesClasesPorProf(valor){
    console.log(valor);
    var clases =JSON.parse(valor);

    console.log(clases);
    var opciones=[]; 

    clases.forEach(element => {
        opciones.push('<tr >'+
        '<th scope="row">'+element.idClase+'</th>'+
        '<td>'+element.dias+'</td>'+
        '<td>'+element.horaDeInicio+'</td>'+
        '<td>'+element.horaDeFin+'</td>'+
        '<td>'+element.salon+'</td>'+
        '</tr>' );
        
    });
    $('tableClasesPorProf').innerHTML=opciones; 

}
function enviarParametrosGET(servidor,funcionARealizar){

    //Declaro el objeto
    var xmlhttp = new XMLHttpRequest();

    //Indico hacia donde va el mensaje
    xmlhttp.open("GET", servidor, true);

    xmlhttp.onreadystatechange = function(){

        if(xmlhttp.readyState == XMLHttpRequest.DONE){

            if(xmlhttp.status == 200){
                //console.log(xmlhttp.responseText);
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

function enviarParametrosPOSTEsp(servidor, funcionARealizar){

    //declaro el objeto
    var xmlhttp = new XMLHttpRequest(); 

    //agrega datos para pasar por POST
    var datos = new FormData();
    datos.append('especialidad',$("txtEmail").value);
   

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
                alert("ocurrio un error");
            };
        }
    }
    //esto va siempre cuando se hace un formulario
    xmlhttp.setRequestHeader("enctype","multipart/form-data");

    //envio el mensaje 
    xmlhttp.send(datos);


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
