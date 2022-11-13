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


