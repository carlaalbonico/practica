//agrega funcion load a HTML; 
addEventListener("load", load)

//variable del servidor
var miBackEnd = 'http://localhost:555/';
var sociosDB;
var tablaSocios = [];
var paginas;
var pagina = [];
var paginaActual = 1;

//DOM
function $(nombre) {
    return document.getElementById(nombre);
}


function load() {
    
    //para ocultar los menus
    menuConsultarSocio();
    oculta('botonesAdminParaUnSocio');
    oculta('formularioModificarSocio');
    oculta('formularioChico');
    oculta('inscribirSocioClase');
    oculta('registrarPago');
    oculta('estadoDeuda');
    oculta('botonAtras');
   

    //para ocultar cartel del mensaje
    oculta_muestra('cartel');

    //boton para cerrar sesion 
    document.getElementById("logOut").addEventListener("click", cerrarSesion);
    //boton para perfil usuario logueado
    document.getElementById("perfil").addEventListener("click", mostrarPerfil);

    //cuando elige la opcion de consultar socio en el menu
    //document.getElementById("btnMenuConsultarSocio").addEventListener("click", menuConsultarSocio);
    //cuando elige la opcion de registrar socio en el menu
    //document.getElementById("btnMenuRegistrarSocio").addEventListener("click", menuRegistrarSocio);

    document.getElementById("btnModificar").addEventListener("click", clickModificarSocio);
    document.getElementById("btnBorrar").addEventListener("click", clickBorrarSocio);
    document.getElementById("btnHabilitar").addEventListener("click", clickHabilitarSocio);

    document.getElementById("btnIrRegistrarPago").addEventListener("click", clickRegistrarPago);
    document.getElementById("btnRegistrarPago").addEventListener("click", clickRegistrarPago);
    //document.getElementById("btnGenerarCuota").addEventListener("click", clickGenerarCuota);
    document.getElementById("btnEstadoDeuda").addEventListener("click", clickEstadoDeuda);
    document.getElementById("btnInscribirSocioClase").addEventListener("click", clickInscribirSocioClase);
    document.getElementById("btnContinuarClase").addEventListener("click", clickContinuarTipoClase);
    document.getElementById("botonAtras").addEventListener("click", atras);
    document.getElementById('btnEnviarInscripcion').addEventListener("click", clickEnviarInscripcion);

    document.getElementById('btnRegistrarPagoCuota').addEventListener("click", clickRegistrarPagoCuota);
    document.getElementById('tableRegistrarPago').addEventListener('change', calcularTotalPago);
}



function cerrarSesion() {
    sessionStorage.clear();
    window.location.assign("http://localhost/practica/login.html");
}
function mostrarPerfil() {
    window.location.assign("http://localhost/practica/perfilUsuario.html");
}

function oculta_muestra(id) {
    if (document.getElementById) { //se obtiene el id
        var el = document.getElementById(id);
        el.style.display = (el.style.display == 'none') ? 'block' : 'none';

    }

}

function muestra(id) {
    if (document.getElementById) { //se obtiene el id
        var el = document.getElementById(id); //se define la variable "el" igual a nuestro div

        el.style.display = "block";

    }

}
function oculta(id) {
    if (document.getElementById) { //se obtiene el id
        var el = document.getElementById(id);
        el.style.display = 'none';

    }

}
function atras() {
    oculta('cartel');    
    muestra('botonesAdminParaUnSocio');
    oculta('formularioModificarSocio');
    oculta('formularioChico');
    oculta('registrarPago');

    oculta('estadoDeuda');
    oculta('inscribirSocioClase');
    oculta('botonAtras');

}

function menuRegistrarSocio() {
    window.location.assign("http://localhost/practica/socio/registrarSocio.html");//aca va el enlace de la pagina registrar; 
}

function menuConsultarSocio() {//oculta la botonera y visualiza el campo para escribir el email 
     
    muestra('busquedaSocios');
    clickBuscar();
    cargarSkeletonTablaSocios();
    
}

function cargarSkeletonTablaSocios(){
    var opciones = [];

    for(let i=0; i < 5; i++){
        opciones.push(
            '<tr>' +
                '<td><p id="skeletonTablaSocios">' + "-" + '</p></td>' +
                '<td><p id="skeletonTablaSocios">' + "-" + '</p></td>' +
                '<td><p id="skeletonTablaSocios">' + "-" + '</p></td>' +
                
                '<td><p id="skeletonTablaSocios">' + "-" + '</p></td>' +
            '</tr>'
        );
    }

    $('infoSocios').innerHTML = opciones.join('');
    
}

function clickBuscar() {    
    enviarParametrosGET(miBackEnd + 'Socio', cargarSocios);
    
    
}

function cargarSocios(respuesta) {

    sociosDB = JSON.parse(respuesta);

    cargarTablaSocios(sociosDB);
    
    
}

function cargarTablaSocios(socios){
    
    tablaSocios = [];
    pagina = [];

    socios.forEach(socio => {
        tablaSocios.push(
            '<tr >' +
            '<th scope="row">' + socio.nroSocio + '</th>' +
            '<td>' + socio.nombre + ' ' + socio.apellido + '</td>' +
            '<td>' + socio.email + '</td>' +

            '<td><button class="btn btn-success modificacion"  onclick="clickConsultarSocio(' + socio.nroSocio + ')">Ver más</button></td>' +

            '</tr>'
        );
    });

    for(let i=0; i < 5; i++){
        
        pagina.push(tablaSocios[i]);
    }    

    $('infoSocios').innerHTML = pagina.join('');
    
    paginas = Math.ceil(tablaSocios.length / 5);

    var listaPaginas = [];

    listaPaginas.push(
        '<li class="page-item">' +
            '<button class="page-link" aria-label="Previous" onclick="restarPagina()">' +
                '<span aria-hidden="true">&laquo;</span>' +
            '</button>' +
        '</li>'
    )
    
    for(let i=1; i <= paginas; i++){
        listaPaginas.push(
            '<li class="page-item"><button class="page-link" onclick="cambiarPagina('+ i +')">' + i +'</button></li>'
        );
    }

    listaPaginas.push(
        '<li class="page-item">' +
            '<button class="page-link" aria-label="Next" onclick="sumarPagina()">' +
                '<span aria-hidden="true">&raquo;</span>' +
            '</button>' +
        '</li>'
    )

    $('pages').innerHTML = listaPaginas.join('');
}

function restarPagina(){
    
    if( paginaActual - 1 > 0 ){

        cambiarPagina(paginaActual - 1);
    }
}

function sumarPagina(){
    
    if( paginaActual + 1 <= paginas ){

        cambiarPagina(paginaActual + 1);
    }
}

function cambiarPagina(pag){

    var inicio = (5*pag) - 5;
    var fin = (5*pag);

    pagina = [];

    for(inicio; inicio < fin; inicio++){
        
        pagina.push(tablaSocios[inicio]);
    }

    paginaActual = pag;

    $('infoSocios').innerHTML = pagina.join('');
}

function buscarPorNombre(){

    var nombreBuscar = $("nombreBuscado").value;

    var sociosFiltrados = [];

    sociosFiltrados = sociosDB.filter(socio => {
        var nombreMin = socio.nombre.toLowerCase();
        var apellidoMin = socio.apellido.toLowerCase();
        nombreMin = nombreMin.concat(" ");
        nombreApellido = nombreMin.concat(apellidoMin);
        return nombreApellido.includes(nombreBuscar.toLowerCase())
    });    

    cargarTablaSocios(sociosFiltrados);
}

function clickConsultarSocio(nroSocio) {

    enviarParametrosGET(miBackEnd + 'Socio/' + nroSocio, retornoClickConsultarSocio);
    oculta('busquedaSocios');
    muestra('cartel');
    $("respuesta").innerHTML = "procesando informacion";
}

function retornoClickConsultarSocio(respuesta) {
    oculta('cartel');    
    muestra('botonesAdminParaUnSocio');
    oculta('formularioModificarSocio');
    oculta('formularioChico');
    oculta('registrarPago');

    oculta('estadoDeuda');
    oculta('inscribirSocioClase');
    oculta('botonAtras');

    var socio = JSON.parse(respuesta);

    $("nroSocio").innerHTML = socio.nroSocio;
    $("nombreSocio").innerHTML = socio.nombre;
    $("apellidoSocio").innerHTML = socio.apellido;
    $("direccionSocio").innerHTML = socio.direccion;
    $("telefonoSocio").innerHTML = socio.telefono;
    $("emailSocio").innerHTML = socio.email;
    console.log(socio);
    if (socio.estado == 'HAB') {
        $(
            "estadoSocio").innerHTML = 'Habilitado';
        oculta('btnHabilitar');
        muestra('btnBorrar');
        console.log('socio Habilitado');
    }
    if (socio.estado == "DESHAB") {
        $(
            "estadoSocio").innerHTML = 'Deshabilitado';
        oculta('btnBorrar');
        muestra('btnHabilitar');
        console.log('socio deshabilitado');
    }

    var texto = socio.fechaDeAlta;
    var salida = formato(texto);
    console.log(salida);


    $("altaSocio").innerHTML = salida;



    //$("respuesta").innerHTML=respuesta;
    if (socio['nroSocio'] == null) {
        swal("Precaucion!", "Seleccione un socio", "info");
        //$("respuesta").innerHTML = "Seleccione un socio";
    }

}

function formato(texto){
    return texto.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1');
  }
function clickModificarSocio() {

    var idSocioMod = document.getElementById("nroSocio").innerText;
    swal({
        title: "Modificar",
        text: "¿Esta seguro que desea modificar a este socio?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            

            enviarParametrosGET(miBackEnd + 'Socio/' + idSocioMod, retornoClickModificarSocio);
        } 
      });



   
}

function retornoClickModificarSocio(respuesta) {
    oculta('cartel');
    oculta('botonesAdminParaUnSocio');
    oculta('registrarPago');
    oculta('estadoDeuda');
    oculta('inscribirSocioClase');
    muestra('formularioModificarSocio');
    oculta('formularioChico');
    muestra('botonAtras');
    var socioMod = JSON.parse(respuesta);

    $("nombreSocioModificar").value = socioMod["nombre"];
    $("apellidoSocioModificar").value = socioMod["apellido"];
    $("direccionSocioModificar").value = socioMod["direccion"];
    $("telefonoSocioModificar").value = socioMod["telefono"];

    $('nombreSocioModificar').addEventListener("keyup", validarSocioModificar);
    $('apellidoSocioModificar').addEventListener("keyup", validarSocioModificar);
    $('direccionSocioModificar').addEventListener("keyup", validarSocioModificar);
    $('telefonoSocioModificar').addEventListener("keyup", validarSocioModificar);
    $('btnModificarGuardar').addEventListener("click", clickGuardarModSocio);

}
function validarSocioModificar() {
    var ModNombre = $("nombreSocioModificar").value.length;
    var ModApellido = $("apellidoSocioModificar").value.length;
    var ModDireccion = $("direccionSocioModificar").value.length;
    var ModTelefono = $("telefonoSocioModificar").value.length;

    if (ModNombre >= 2 && ModApellido >= 2 && ModDireccion >= 2 && ModTelefono >= 8) {
        $('btnModificarGuardar').disabled = false;//habilitar
    } else {
        $('btnModificarGuardar').disabled = true;
    }

}
function clickGuardarModSocio() {
    var nroSocio = document.getElementById("nroSocio").innerText;
    $("btnModificarGuardar").disabled = true;

    enviarParametrosPOSTModificar(miBackEnd + 'Socio/Actualizacion/' + nroSocio, respuestaDeServidorMod);
}
function respuestaDeServidorMod(respuesta) {
    swal("Genial!", '"'+respuesta+'"', "success");
    menuConsultarSocio();
}

function clickBorrarSocio() {
    var nroSocio = document.getElementById("nroSocio").innerText;


    swal({
        title: "Borrar",
        text: "¿Esta seguro que desea borrar a este socio?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            enviarParametrosPOSTBorrar(miBackEnd + 'Socio/Borrar/' + nroSocio, respuestaDeServidorBorrar)
        } 
      });

    //if (confirm('¿Esta seguro que desea borrar a este socio?')) {
        //pasar los parametros para borrar 

    //    enviarParametrosPOSTBorrar(miBackEnd + 'Socio/Borrar/' + nroSocio, respuestaDeServidorBorrar)
    //}
}

function clickHabilitarSocio() {
    var nroSocio = document.getElementById("nroSocio").innerText;

    swal({
        title: "Modificar",
        text: "¿Esta seguro que desea habilitar a este socio?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            enviarParametrosPOSTBorrar(miBackEnd + 'Socio/Habilitacion/' + nroSocio, respuestaDeServidorBorrar)
        } 
      });

    //if (confirm('¿Esta seguro que desea habilitar a este socio?')) {
        //pasar los parametros para borrar 

       // enviarParametrosPOSTBorrar(miBackEnd + 'Socio/Habilitacion/' + nroSocio, respuestaDeServidorBorrar)
    //}
}
function respuestaDeServidorBorrar(respuesta) {
    //muestra('cartel');
    // $("respuesta").innerHTML=respuesta;
    swal("Genial!", '"'+respuesta+'"', "success");
    menuConsultarSocio();

}

function cargarFormularioChico(respuesta) {
    var socioFC = JSON.parse(respuesta);
    $("nroSocioForm").innerHTML = socioFC.nroSocio;
    $("nombreSocioForm").innerHTML = socioFC.nombre;
    $("apellidoSocioForm").innerHTML = socioFC.apellido;
}
function clickRegistrarPago() {
    oculta('cartel');
    oculta('botonesAdminParaUnSocio');
    oculta('formularioModificarSocio');
    muestra('formularioChico');
    muestra('registrarPago');

    oculta('estadoDeuda');
    oculta('inscribirSocioClase');
    muestra('botonAtras');
    //manda los datos para cargar el formularioChico
    var idSocio = document.getElementById("nroSocio").innerText;

    enviarParametrosGET(miBackEnd + 'Socio/' + idSocio, cargarFormularioChico);

    //manda a llamar a los estados de cuenta del socio
    enviarParametrosGET(miBackEnd + 'Cuota/' + idSocio, mostrarTablaRegistrarPago);

}
function mostrarTablaRegistrarPago(valor) {

    $('btnRegistrarPagoCuota').disabled = true;
    var analiza = JSON.parse(valor);
    console.log(analiza);


   
    console.log(salida);


    var opciones = [];


    analiza.forEach(element => {

        opciones.push('<tr >' +
            '<th scope="row">' + element.mes + '</th>' +
            '<td>' + element.importe + '</td>' +
            '<td>' + formato(element.fechaVencimiento) + '</td>' +
            '<td><input type="checkbox" name="checkBox" class="importes" id="' + element.idCuota + '" value="' + element.importe + '"></td>' +

            '</tr>');

    });

    $('tableRegistrarPago').innerHTML = opciones;

}

function calcularTotalPago() {

    //solo se usa para calcular el total y mostrarlo en pantalla; 
    var checkboxes = document.querySelectorAll(".importes");
    var Total = 0;
    let checked = [];
    checkboxes.forEach((element) => {
        if (element.checked == true) {
            checked.push(element.id);
            Total = parseFloat(Total) + parseFloat(element.value);
        }
    });


    $('precioTotal').innerHTML = Total;

    var validarTotal = document.getElementById('precioTotal').value;
    if (validarTotal != 0) {
        $('btnRegistrarPagoCuota').disabled = false;
    }
}
function clickRegistrarPagoCuota() {

    enviarParametrosPOSTPago(miBackEnd + 'Pago', respuestaDeServidorPago);



}
function respuestaDeServidorPago(respuesta) {

    $("respuestaPago").innerHTML = respuesta;
}




function clickEstadoDeuda() {
    oculta('cartel');
    oculta('botonesAdminParaUnSocio');
    oculta('formularioModificarSocio');
    oculta('registrarPago');

    muestra('formularioChico');
    muestra('estadoDeuda');
    oculta('inscribirSocioClase');
    muestra('botonAtras');
    //manda los datos para cargar el formularioChico
    var idSocio = document.getElementById("nroSocio").innerText;

    enviarParametrosGET(miBackEnd + 'Socio/' + idSocio, cargarFormularioChico);

    //manda a llamar a los estados de cuenta del socio
    enviarParametrosGET(miBackEnd + 'Cuota/Estado/' + idSocio, mostrarTablaEstadoDeuda);
}

function mostrarTablaEstadoDeuda(valor) {


    var analiza = JSON.parse(valor);
    console.log(analiza);

    var opciones = [];


    analiza.forEach(element => {
        opciones.push('<tr >' +
            '<th scope="row">' + element.mes + '</th>' +
            '<td>' + element.importe + '</td>' +
            '<td>' + formato(element.fechaVencimiento) + '</td>' +
            '<td>' + element.estado + '</td>' +
            '</tr>');

    });



    $('tableEstadoDeuda').innerHTML = opciones;



}



function clickInscribirSocioClase() {
    oculta('cartel');
    oculta('botonesAdminParaUnSocio');
    oculta('formularioModificarSocio');
    oculta('registrarPago');

    oculta('estadoDeuda');
    muestra('formularioChico');
    muestra('inscribirSocioClase');
    muestra('botonAtras');
    //manda los datos para cargar el formularioChico
    var idSocio = document.getElementById("nroSocio").innerText;

    enviarParametrosGET(miBackEnd + 'Socio/' + idSocio, cargarFormularioChico);
    //manda los datos para cargar el select
    enviarParametrosGET(miBackEnd + 'TipoClase', cargarOpcionesClase);

    oculta('continuarClase');
}


function cargarOpcionesClase(valor) {


    var clases = JSON.parse(valor);
    clases.sort(function (x, y) { return x.nombre.localeCompare(y.nombre) });

    var opciones = ['<option value=0>Seleccione una clase</option>']

    clases.forEach(element => {
        opciones.push('<option value="' + element.idTipoClase + '">' + element.nombre + '</option>');
    });

    $("slctTipoClase").innerHTML = opciones;
}
function clickContinuarTipoClase() {

    //manda los datos para cargar el formularioChico
    var tipoClase = document.getElementById("slctTipoClase").value;


    //manda los datos para cargar el select
    enviarParametrosGET(miBackEnd + 'Clase/' + tipoClase, cargarOpcionesTipoClases);


}

function cargarOpcionesTipoClases(valores) {
    muestra('continuarClase');
    var tipoClases = JSON.parse(valores);
    console.log(tipoClases);
    tipoClases.sort(function (x, y) { return x.nombre.localeCompare(y.nombre) });

    var opciones = ['<option value=0>Seleccione un tipo de clase</option>']

    tipoClases.forEach(element => {
        opciones.push('<option value="' + element.idClase + '">' + element.dias + ' ' + element.horaDeInicio + '-' + element.horaDeFin + '</option>');
    });

    $("slctNumClase").innerHTML = opciones;
    //tengo que agregar mensaje de error
}

function clickEnviarInscripcion() {
    enviarParametrosPOSTInscribir(miBackEnd + 'Socio/Inscripcion', respuestaDeServidorInscripcion);
}
function respuestaDeServidorInscripcion(respuesta) {
    swal("Guardado!", '"'+respuesta+'"', "success");
    
    //$("respuesta").innerHTML = respuesta;
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

function enviarParametrosPOST(servidor, funcionARealizar) {

    //declaro el objeto
    var xmlhttp = new XMLHttpRequest();

    //agrega datos para pasar por POST
    var datos = new FormData();
    datos.append("email", $("txtEmail").value);


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
                swal("Error", "revise los datos cargados", "error");
            };
        }
    }
    //esto va siempre cuando se hace un formulario
    xmlhttp.setRequestHeader("enctype", "multipart/form-data");

    //envio el mensaje 
    xmlhttp.send(datos);


}

function enviarParametrosPOSTModificar(servidor, funcionARealizar) {

    //declaro el objeto
    var xmlhttp = new XMLHttpRequest();

    //agrega datos para pasar por POST
    var datos = new FormData();
    datos.append("nombre", $("nombreSocioModificar").value);
    datos.append("apellido", $("apellidoSocioModificar").value);
    datos.append("direccion", $("direccionSocioModificar").value);
    datos.append("telefono", $("telefonoSocioModificar").value);


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
                swal("Error", "revise los datos cargados", "error");
            };
        }
    }
    //esto va siempre cuando se hace un formulario
    xmlhttp.setRequestHeader("enctype", "multipart/form-data");

    //envio el mensaje 
    xmlhttp.send(datos);


}
function enviarParametrosPOSTInscribir(servidor, funcionARealizar) {

    //declaro el objeto
    var xmlhttp = new XMLHttpRequest();

    //agrega datos para pasar por POST
    var datos = new FormData();
    datos.append("nroSocio", $("nroSocio").innerText);
    datos.append("idClase", $("slctNumClase").value);


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
                swal("Error", "revise los datos cargados", "error");
            };
        }
    }
    //esto va siempre cuando se hace un formulario
    xmlhttp.setRequestHeader("enctype", "multipart/form-data");

    //envio el mensaje 
    xmlhttp.send(datos);

}
function enviarParametrosPOSTBorrar(servidor, funcionARealizar) {

    //declaro el objeto
    var xmlhttp = new XMLHttpRequest();

    //agrega datos para pasar por POST
    var datos = new FormData();
    datos.append("nroSocio", $("nroSocio").innerText);



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
                swal("Error", "revise los datos cargados", "error");
            };
        }
    }
    //esto va siempre cuando se hace un formulario
    xmlhttp.setRequestHeader("enctype", "multipart/form-data");

    //envio el mensaje 
    xmlhttp.send(datos);

}
function enviarParametrosPOSTPago(servidor, funcionARealizar) {

    //calcula el total de los checks y lo envia 
    //arma el array para las cuotas
    var checkboxes = document.querySelectorAll(".importes");
    var Total = 0;
    let checked = [];
    checkboxes.forEach((element) => {
        if (element.checked == true) {
            checked.push(element.id);
            Total = parseFloat(Total) + parseFloat(element.value);
        }
    });

    var myJSON = JSON.stringify(checked);



    //declaro el objeto
    var xmlhttp = new XMLHttpRequest();

    //agrega datos para pasar por POST
    var datos = new FormData();

    datos.append("importe", Total);

    datos.append("cuotas", myJSON);


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
                swal("Error", "revise los datos cargados", "error");
            };
        }
    }
    //esto va siempre cuando se hace un formulario
    xmlhttp.setRequestHeader("enctype", "multipart/form-data");

    //envio el mensaje 
    xmlhttp.send(datos);

}