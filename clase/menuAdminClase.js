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
    clickConsultarClase();
    oculta('botonAtras');
    oculta('clasesPorProf');
    oculta('formularioModificarClase'); 
    oculta('cartel');
    
    //boton para cerrar sesion 
    document.getElementById("logOut").addEventListener("click",cerrarSesion);
    //boton para perfil usuario logueado
    document.getElementById("perfil").addEventListener("click",mostrarPerfil);

    document.getElementById("botonAtras").addEventListener("click",atras);

    //document.getElementById("btnRegistrarClasePorProfesor").addEventListener("click",clickConsultarClasePorProf);
    //document.getElementById ('slctDatosClasesxProf').addEventListener('change',validacionClaseClasesxProf);
    document.getElementById ('slctTipoClase').addEventListener('change',validacionClase); 
    
   // document.getElementById ('tableClases').addEventListener('click',clickModifClase); 
    document.getElementById('btnGuardarClase').addEventListener("click",clickGuardarModClase);
    //document.getElementById('slctModClase').addEventListener('change',usarSelectClase);
    
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
    window.location.assign("http://localhost/practica/clase/registrarClase.html");//aca va el enlace de la pagina registrar; 
}

function clickConsultarClase(){
    muestra('botonAtras');
    muestra('clases'); 
    oculta('clasesPorProf'); 
    oculta('formularioModificarClase'); 
    oculta('cartel'); 
    cargarSkeletonTablaClases();
    enviarParametrosGET(miBackEnd + 'Actividad',cargarOpcionesClase); 
    enviarParametrosGET(miBackEnd + 'Clase', retornoDelClickConsultarClase);
    
}
function cargarSkeletonTablaClases(){
    var opciones = [];

    for(let i=0; i < 5; i++){
        opciones.push(
            '<tr>' +
                '<td><p id="skeletonTablaClases">' + "-" + '</p></td>' +
                '<td><p id="skeletonTablaClases">' + "-" + '</p></td>' +
                '<td><p id="skeletonTablaClases">' + "-" + '</p></td>' +
                
                '<td><p id="skeletonTablaClases">' + "-" + '</p></td>' +
                '<td><p id="skeletonTablaClases">' + "-" + '</p></td>' +
                '<td><p id="skeletonTablaClases">' + "-" + '</p></td>' +
                '<td><p id="skeletonTablaClases">' + "-" + '</p></td>' +
                
                '<td><p id="skeletonTablaClases">' + "-" + '</p></td>' +
                
            '</tr>'
        );
    }

    $('tableClases').innerHTML = opciones.join('');
    
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
    $("slctTipoClase").innerHTML = opciones.join('');  
    
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
                
                '<td><button class="btn  btn-danger modificacion" type="button" onclick="clickModifClase('+element.idClase+')">Modificar</button></td>'+

                '</tr>' );
                
            });


            
        $('tableClases').innerHTML=opciones.join(''); 
                    

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
           
            '<td><button class="btn btn-danger modificacion"  onclick="clickModifClase('+element.idClase+')">Modificar</button></td>'+

            '</tr>' );
            
        });
        $('tableClases').innerHTML=opciones.join(''); 
    }
}

function clickModifClase(idClase){
    

        swal({
            title: "Modificar",
            text: "¿Esta seguro que desea modificar a esta clase?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                
                
                validar(idClase); 
            } 
          });

       /* if (idDeBoton!=0){
            if(confirm('¿Esta seguro que desea modificar esta clase?')){
            validar(); 
            }}      
       return  idDeBoton; */
    
    
  

}

function validar(idClase){
    console.log(idClase);
    muestra('botonAtras');
    oculta('clases'); 
    oculta('clasesPorProf'); 
    muestra('formularioModificarClase'); 
    oculta('cartel'); 

    extra=idClase;
    enviarParametrosGET(miBackEnd + 'Clase/Consulta/'+idClase, retornoDelClickModificarClase);
    enviarParametrosGET(miBackEnd + 'Actividad',cargarOpcionesClaseMod);
    enviarParametrosGET(miBackEnd + 'Profesor',cargarOpcionesProf);
    enviarParametrosGET(miBackEnd + 'Salon',cargarOpcionesSalon);
}

function usarSelectClase(){
    enviarParametrosGET(miBackEnd + 'Actividad',cargarOpcionesClaseMod);
}


function cargarOpcionesClaseMod(nro){
    var clase= JSON.parse(nro);
    console.log(clase);
    clase.sort(function (x, y) { return x.nombre.localeCompare(y.nombre) });

    var opciones = []

   clase.forEach(element => {
        opciones.push('<option value="' + element.idActividad + '">' + element.nombre + '</option>');
    });
    
    $("slctModClase").innerHTML = opciones; 
}

function cargarOpcionesProf(nroProf){
    
    var profes= JSON.parse(nroProf);
    console.log(profes);
    profes.sort(function (x, y) { return x.nombre.localeCompare(y.nombre) });

    var opciones = []

    profes.forEach(element => {
        opciones.push('<option value="' + element.legajo + '">' + element.nombre +' '+ element.apellido + '</option>');
    });
    
    $("slctModDatosProf").innerHTML = opciones;
    
   
}
function cargarOpcionesSalon(nro){
    
    var salon= JSON.parse(nro);
    console.log(salon);
    salon.sort(function (x, y) { return x.nombreSalon.localeCompare(y.nombreSalon) });

    var opciones = []

    salon.forEach(element => {
        opciones.push('<option value="' + element.idSalon + '">' + element.nombreSalon +' capacidad:'+ element.capacidad + '</option>');
    });
    
    $("slctModDatosSalon").innerHTML = opciones;

   
}
function retornoDelClickModificarClase(valor){

    var clase =JSON.parse(valor);
    console.log(clase);
    $("slctModClase").value = clase["nombre"];
    $("slctModDias").value = clase["dias"];
    $("txtModHoraInicio").value = clase["horaDeInicio"];
    $("txtModHoraFin").value = clase["horaDeFin"];
    $("slctModDatosProf").value = clase["profesor"];
    $("slctModDatosSalon").value = clase["salon"];
    $("slctModMod").value = clase["modalidad"];
    $("txtModCupos").value = clase["cupos"];
    $("txtModFechaInicio").value = clase["fechaDeInicio"];

    

}

function clickGuardarModClase(){

     enviarInfoDeClase(miBackEnd + 'Clase/Actualizacion/'+extra, respuestaDeServidor);
 }
 
 function respuestaDeServidor(respuesta){
    swal("Guardado!", '"'+respuesta+'"', "success");
    clickConsultarClase();
    
 }

/*function clickConsultarClasePorProf(){
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

}*/
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
                swal("Error al guardar", "revise los datos cargados", "error");
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
                swal("Error al guardar", "revise los datos cargados", "error");
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
    datos.append("tipoActividad",$("slctClase").value);
    datos.append("dias",$("slctDias").value);
    datos.append("horaDeInicio",$("txtHoraInicio").value);
    datos.append("horaDeFin",$("txtHoraFin").value);
    datos.append("fechaDeInicio",$("txtFechaInicio").value);
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
                swal("Error al guardar", "revise los datos cargados", "error");
            };
        }
    }
    //esto va siempre cuando se hace un formulario
    xmlhttp.setRequestHeader("enctype","multipart/form-data");
    //envio el mensaje 
    xmlhttp.send(datos);
}
