function mostrarHorario(clases,dia, fecha){

    var seleccionPorDia = [];
    var columnaDia=[];
    var clases=[];

    //pone en la columna el dia de la semana + la fecha
    columnaDia.push(' <div class="row" id="'+dia+'">'+
                '<div class="col">'+
                    '<div class="d-flex h-100 text-white bg-dark rounded-3" >'+
                                    '<h3>'+dia +'</h3>'+
                                    '<h2> '+fecha+'</h2>'+
                    '</div>'+
                '</div>'
                    );
    //Procesa el json y lo separa por dia
    clases.forEach(clase => {
        
        if(clase.dias == dia && clase.fecha==fecha){
            seleccionPorDia.push(clase);
            
        }
    });

    

    seleccionPorDia.forEach(clase => {
        columnaDia.push(
        ' <div class="col">'+
            '<div class="card border-dark mb-1" style="max-width: 18rem;">'+
                    '<div class="card-header">'+clase.horaDeInicio+'</div>'+
                    '<div class="card-body text-dark">'+
                        '<h5 class="card-title">'+clase.actividad+'</h5>'+
                        '<p class="card-text"> <b> Profe: </b> '+clase.profesor+' <br><b>Cupos libres: </b> '+clase.cupoDisponible+'</p>'+
                        
                    '</div>'+            
            '</div>'+
        '</div>'
            
              );
    });

    columnaDia.push('</div>');

    //console.log(columnaDia.join(''));
    return columnaDia.join('');
}