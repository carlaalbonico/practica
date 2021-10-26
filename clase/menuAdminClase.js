//agrega funcion load a HTML; 
addEventListener("load",load)
 
//variable del servidor
var miBackEnd = 'http://localhost:555/';

//DOM
function $(nombre)
{
    return document.getElementById(nombre);
}


function load(){
    oculta('botonAtras');
    muestra('botonesAdmin'); 
    oculta('clases'); 
    oculta('clasesPorProf'); 
    oculta('formularioModificarClase'); 
    oculta('cartel'); 
    //boton para cerrar sesion 
    document.getElementById("logOut").addEventListener("click",cerrarSesion);
    //boton para perfil usuario logueado
    document.getElementById("perfil").addEventListener("click",mostrarPerfil);

    document.getElementById("botonAtras").addEventListener("click",atras);

    document.getElementById("btnRegistrarClase").addEventListener("click",clickRegistrarClase);
    document.getElementById("btnConsultarClase").addEventListener("click",clickConsultarClase);
    document.getElementById("btnRegistrarClasePorProfesor").addEventListener("click",clickConsultarClasePorProf);
    document.getElementById ('slctTipoClase').addEventListener('change',validacionClase); 
    
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
    muestra('botonesAdmin'); 
    oculta('clases'); 
    oculta('clasesPorProf'); 
    oculta('formularioModificarClase'); 
    oculta('cartel'); 

}
function clickRegistrarClase(){
    window.location.assign("http://localhost/practica/clase/registrarClase.html");//aca va el enlace de la pagina registrar; 
}

function clickConsultarClase(){
    muestra('botonAtras');
    oculta('botonesAdmin');
    muestra('clases'); 
    oculta('clasesPorProf'); 
    oculta('formularioModificarClase'); 
    oculta('cartel'); 

    enviarParametrosGET(miBackEnd + 'TipoClase',cargarOpcionesClase); 
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
    console.log(clases); 
   
    console.log(tipoClase); 
        if (tipoClase!=0){
            console.log('diferente');

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
                '<td><button class="btn btn-outline-danger my-2 my-sm-0" type="button" id="btnModificar">Modificar</button></td>'+

                '</tr>' );
                
            });
        $('tableClases').innerHTML=opciones; 
                    

    }else{
        console.log('todas'); 

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
        '<td><button class="btn btn-outline-danger my-2 my-sm-0" type="button" id="btnModificar">Modificar</button></td>'+

        '</tr>' );
        
    });
    $('tableClases').innerHTML=opciones; }
    
}


function clickConsultarClasePorProf(){
    muestra('botonAtras');
    oculta('botonesAdmin');
    oculta('clases'); 
    muestra('clasesPorProf'); 
    oculta('formularioModificarClase'); 
    oculta('cartel'); 


}

function clickModificarClase(){
    muestra('botonAtras');
    oculta('botonesAdmin');
    oculta('clases'); 
    oculta('clasesPorProf'); 
    muestra('formularioModificarClase'); 
    oculta('cartel'); 
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
