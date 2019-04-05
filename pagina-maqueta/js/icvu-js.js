/***************************
// REVISAR
// https://jsfiddle.net/PN03/4th0e7e6/8/
// https://stackoverflow.com/questions/40435332/google-charts-sankey-node-text-style
// https://github.com/google/google-visualization-issues/issues/2380
// ALTURA DINAMICA
// https://stackoverflow.com/questions/35408995/google-sankey-chart-adjust-height-automatically
// function
// https://stackoverflow.com/questions/34566777/google-charts-how-to-hide-dynamically-created-series-and-show-only-one-in-legend
// SANKEY D3 https://bl.ocks.org/emeeks/e749224c89f82788cb18
// LEYENDAS https://stackoverflow.com/questions/16980002/how-to-prevent-legend-labels-being-cut-off-in-google-charts
// COLOR https://stackoverflow.com/questions/40435332/google-charts-sankey-node-text-style
// DYNAMICALLY https://stackoverflow.com/questions/21933951/how-to-control-show-hide-the-tooltip-dynamically-in-google-chart-api
// https://stackoverflow.com/questions/42947236/position-icon-after-google-line-chart-title AGREGAR ICONO AL TITULO *****
// https://stackoverflow.com/questions/46401043/adding-a-small-custom-icon-and-popup-to-a-title-of-google-charts ***** IDEM
// =====================================================================================
// =================
// REVISAR ESTO !!!
// =================
// https://developers.google.com/chart/interactive/docs/basic_interactivity
// https://developers.google.com/chart/interactive/docs/animation
// https://developers.google.com/chart/interactive/docs/events
//  https://developers.google.com/chart/interactive/docs/overlays#fullpage2  ****
// http://a32.me/2018/01/change-tooltip-position-on-google-charts/
// =====================================================================================
***************************/
/*
console.log("hola");

$.getScript( "js/jquery.csv.min.js" )
  .done(function( script, textStatus ) {
    console.log( "---- ok" );
  })
  .fail(function( jqxhr, settings, exception ) {
    console.log( "Triggered ajaxError handler." );
});

$.getScript( "js/radar.js" )
  .done(function( script, textStatus ) {
    console.log( "---- ok2" );
  })
  .fail(function( jqxhr, settings, exception ) {
    console.log( "Triggered ajaxError handler." );
});

var order1 = 0;
var theTitle = '';
var view;


  //function cmToInches(dataTable, rowNum, colNum){
  function AddLabel(dataTable, rowNum){
    //return Math.floor(dataTable.getValue(rowNum, 1) / 2);
    return ""+dataTable.getValue(rowNum, order1);
  }

google.charts.load('current', {
  packages:['bar', 'table',
  'corechart', 'controls']
}).then(function () {

  // AQUI DEFINO EL ID DEL GRAFICO A EXPORTAR
  var chartContainerRANKING = document.getElementById('chartRanking');
  var chartContainerDETAIL = document.getElementById('chartDetail');
  var button = document.getElementById('button');


  function downloadCanvas(link, canvasId, filename) {
    console.log("SI");
      link.href = document.getElementById(canvasId).toDataURL();
      link.download = filename;
console.log("link: "+link);
console.log("canvasId: "+canvasId);
console.log("filename: "+filename);
//console.log("link.href: "+link.href);
//console.log("- link.download: "+link.download);


  //e.href = url;
  //e.download = 'test.txt'

    link.click();

      //image.href = imageURL;
      //image.download = 'test.txt'
  }

}); // FIN }).then(function () {


  var MAXHeight = 1500;
  /// Dashboard --->
  var data;
  var dashboard;
  var barChart;
  var chartDetail;

  var options = {
    width: 200,
    height: MAXHeight,
    title: 'AAaaa ',
    colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'],
    animation:{
      duration: 1000,
      easing: 'out',
    }
  };

  //Color barchart: los de cada dimensión//
  var colores={
    colors: ["#3399FF","#7AC943","#FF931E","#FF1D25","#FF7BAC","#FCEE21"]
  }
  //FIN!//


  // Set a callback to run when the Google Visualization API is loaded.
  google.charts.setOnLoadCallback(drawDashboard);


  // Callback that creates and populates a data table,
  // instantiates a dashboard, a range slider and a pie chart,
  // passes in the data and draws it.
  function drawDashboard() {

    var data1;
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // ORDEN NECESARIO DE DATOS DE ENTRADA:
    // Comuna,Población,Distribución,Localización,Metropolitana,Dependencia FCM (%),Gasto total municipal por cada habitante de la comuna  M$ / Habitante (promedio 2013-2015),ICVU2017,CL,AN,CS,CM,SM,VE,RANGO

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    $.get("datos_icvu2.csv", function(csvString) { // INICIO get
        data1 = $.csv.toArrays(csvString, {onParseValue: $.csv.hooks.castToScalar});

        // this new DataTable object holds all the data
        data = new google.visualization.arrayToDataTable(data1);

        var table = new google.visualization.Table(document.getElementById('tabla'));
        table.draw(data, {
          showRowNumber: true,
          width: '90%',
          height: '200'}
          );

        view = new google.visualization.DataView(data);
        //view.setColumns([0,1,2,3,4,5,6]);
        //data.sort([{column: 1}, {column: 0}]);
        data.sort([{column: order1, desc: true}]);

        // Create a dashboard
        dashboard = new google.visualization.Dashboard( document.getElementById('dashboard_div')) ;

        // Create a range slider, passing some options
        var PoblacionRangeSlider = new google.visualization.ControlWrapper({
          'controlType': 'NumberRangeFilter',
          'containerId': 'filter_poblacion_div',
          'options': {
            //'filterColumnLabel': 'Población',
            'filterColumnIndex': 1,
            'minValue': '0',
            ui: {
                labelStacking: 'vertical',
                allowTyping: false,
                allowMultiple: false,
                height: 100
            }
          }
        });

        // Create a range slider, passing some options
        var DependenciaRangeSlider = new google.visualization.ControlWrapper({
          'controlType': 'NumberRangeFilter',
          'containerId': 'filter_dependencia_div',
          'options': {
            //'filterColumnLabel': 'Población',
            'filterColumnIndex': 5,
            'minValue': '0',
            ui: {
                labelStacking: 'vertical',
                allowTyping: false,
                allowMultiple: false,
                height: 100
            }
          }
        });

        // Create a range slider, passing some options
        var PerCapitaRangeSlider = new google.visualization.ControlWrapper({
          'controlType': 'NumberRangeFilter',
          'containerId': 'filter_per_capita_div',
          'options': {
            //'filterColumnLabel': 'Población',
            'filterColumnIndex': 6,
            'minValue': '0',
            ui: {
                labelStacking: 'vertical',
                allowTyping: false,
                allowMultiple: false,
                height: 100
            }
          }
        });


        // Create a CategoryFilter, passing some options
        var MetropolitanaFilter = new google.visualization.ControlWrapper({
          'controlType': 'CategoryFilter',
          'containerId': 'filter_metropolitana_div',
          'options': {
            'filterColumnIndex': 4,
            ui: {
                labelStacking: 'vertical',
                allowTyping: false,
                allowMultiple: false,
                height: 100
            }
            //'filterColumnLabel': 'Metropolitana',
          }
        });

        // Create a CategoryFilter, passing some options
        var LocalizacionFilter = new google.visualization.ControlWrapper({
          'controlType': 'CategoryFilter',
          'containerId': 'filter_localizacion_div',
          'options': {
            'filterColumnIndex': 3,
            ui: {
                labelStacking: 'vertical',
                allowTyping: false,
                allowMultiple: false,
                height: 100
            }
            //'filterColumnLabel': 'Localización',
          }
        });

        // Create a CategoryFilter, passing some options
        var DistribucionFilter = new google.visualization.ControlWrapper({
          'controlType': 'CategoryFilter',
          'containerId': 'filter_distribucion_div',
          'options': {
            'filterColumnIndex': 2,
            ui: {
                labelStacking: 'vertical',
                allowTyping: false,
                allowMultiple: false,
                height: 100
            }
            //'filterColumnLabel': 'Distribución',
          }
        });


        // Create a pie chart, passing some options
        barChart = new google.visualization.ChartWrapper({
          'chartType': 'BarChart',
          //'chartType': 'Table',
          'containerId': 'chartRanking',
          'options': {
            'width': 300,
            'height': MAXHeight,
            'pieSliceText': 'value',
            'color': '#FCEE21',
            'legend': 'top',
            title: 'Ranking ICVU 2017 para '+ theTitle,
            'hAxis': {
              'minValue': '0',
            'showTextEvery': 1,
            //'gridlines':{'count':10}
          },

            'animation':{
              'duration': '1000',
              'easing': 'out',
            },
                        chartArea: {
                        'width': '40%', 'height': '80%',
                        left:100,
                        right:0, // !!! works !!!
                        //bottom:20,  // !!! works !!!
                      top:20
                        },
            'tooltip': {'isHtml': true}
          },
            view: {
              columns: [0, order1, {calc:AddLabel, type:'string', role: 'annotation', label:'Height in Inches'}]
            }
        });
        

//        tableChart  = new google.visualization.ChartWrapper({
//          'chartType': 'Table',
//          'containerId': 'tableRanking',
//          'options': {
//            'width': 600,
//            'height': MAXHeight,
//            'pieSliceText': 'value',
//            'legend': 'right',
//            title: 'Ranking ICVU 2017 para '+ theTitle,
//            'hAxis': {'minValue': '0'},
//            'animation':{
//              'duration': '1000',
//              'easing': 'out',
//            },
//            'tooltip': {'isHtml': true}
//          },
//            view: {
//              columns: [0, order1]
//            }
//        });
        

        var selection;
        // Instantiate and draw our chart, passing in some options.
        chartDetail = new google.visualization.BarChart(document.getElementById('spider'));

        google.visualization.events.addListener(barChart, 'select', function () {
          //console.log("Click: " + barChart.getChart().getSelection());
          selection = barChart.getChart().getSelection();

          message ='';
          for (var i = 0; i < selection.length; i++) {
            var item = selection[i];
            if (item.row != null && item.column != null) {
              message += '{row:' + item.row + ',column:' + item.column + '}';
            } else if (item.row != null) {
              message += '{row:' + item.row + '}';
            } else if (item.column != null) {
              message += '{column:' + item.column + '}';
            }
          }
          if (message == '') {
            message = 'nothing';

          }
          if (item != null && item.row != null ){
                    var id = barChart.getDataTable().getValue(item.row,0);
                    var originalRow = data.getFilteredRows([{column: 0, value: id }]);
                    originalRow = parseInt(originalRow);
                    var originalData = data.getFormattedValue(originalRow, 1);

                    //console.log("originalIndexRow: " + originalRow);
                    //console.log("originalDataRow: " + originalData);
                    //console.log("*** values: " + message);

                    selection = barChart.getChart().getSelection();

                    var selectedItem = barChart.getChart().getSelection()[0];
                    if (selectedItem) {
                      var value = data.getValue(selectedItem.row, selectedItem.column);
                      var id = barChart.getDataTable().getValue(item.row,0);
                      var originalRow = data.getFilteredRows([{column: 0, value: id }]);
                      originalRow = parseInt(originalRow);
                      var originalData = data.getFormattedValue(originalRow, 1);
                      var originalNameData = data.getFormattedValue(originalRow, 0);

                      var optionsTool = {
                        width: 260,
                        height: 400,
                        title: 'Detalle para ' + originalNameData,
                        colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'],
                        animation:{
                          duration: 1000,
                          easing: 'out',
                        },
                        hAxis: {'minValue': '0'},
                        chartArea: {
                        'width': '50%', 'height': '80%',
                        left: 0, //cambié por aquí
                        right: 0, // !!! works !!!
                        //bottom:20,  // !!! works !!!
                        //top:20
                        },
                        legend: {'position': 'bottom'},
                        //colors: ["green","blue"]
                      };
                      //dashboard.draw(data, options);
                      //chartDetail.draw(selection, optionsTool);
                      s = data.getFilteredRows([{column: 0, value: id}]) ;
                      //console.log("data.getFilteredRows([{column: 0, value: id }])=== "+ s);

                      var viewDetail = new google.visualization.DataView(data);
                      indexPopulation = 1;
                      viewDetail.setRows(data.getFilteredRows([
                        {column: 0, value: id}
                      ]));
                      Ncols = viewDetail.getNumberOfColumns();
                      Nrows = viewDetail.getNumberOfRows();

                      viewDetail.setColumns([0,7,8,9,10,11,12,13]); // AQUIIII INDICE DE LAS DIMENSIONES



                      // rawData is the base DataTable from the query
                      var newData = new google.visualization.DataTable();
                      var DATOS_EN_ARREGLO = []; // ESTO ES LO QUE TIENES QUE TOMAR
                      rawData = viewDetail;
                      newData.addColumn('string', 'domain data label'); // change this label to whatever is appropriate for you
                      for (var i = 0; i < rawData.getNumberOfRows(); i++) {
                          newData.addColumn('number', rawData.getValue(i, 0));
                      }
                      for (var i = 1; i < rawData.getNumberOfColumns(); i++) {
                          var row = [rawData.getColumnLabel(i)];
                          for (var j = 0; j < rawData.getNumberOfRows(); j++) {
                              row.push(rawData.getValue(j, i));
                          }
                          newData.addRow(row);
                      }
                      ////////////////////////////////////////////////////////////////////////////////////////////////////////////
                      ////////////////////////////////////////////////////////////////////////////////////////////////////////////
                      var DATOS_EN_ARREGLO = []; // ESTO ES LO QUE TIENES QUE TOMAR
                      for (var i = 1; i < rawData.getNumberOfColumns(); i++) {
                        DATOS_EN_ARREGLO.push(rawData.getValue(0, i));
                      }
                      console.log("*** COMUNA: "+ originalNameData);

                      actualizar(DATOS_EN_ARREGLO);

                      console.log("DATOS_EN_ARREGLO: "+ DATOS_EN_ARREGLO);
                      ////////////////////////////////////////////////////////////////////////////////////////////////////////////
                      ////////////////////////////////////////////////////////////////////////////////////////////////////////////

                      chartDetail.draw(newData, optionsTool);
                    }
                  }


        }); // FIN google.visualization.events.addListener(barChart, 'select', function () {

        //dashboard.bind([PoblacionRangeSlider, MetropolitanaFilter, LocalizacionFilter, DistribucionFilter], [barChart, tableChart]);
        dashboard.bind([PoblacionRangeSlider, MetropolitanaFilter, LocalizacionFilter, DistribucionFilter, DependenciaRangeSlider, PerCapitaRangeSlider], [barChart]);
        //dashboard.draw(data, {allowHtml: true, showRowNumber: true, width: '100%', height: '100%'});
        barChart.setOption('title', 'Ranking ICVU 2017 para '+ theTitle );
        dashboard.draw((view), options);

       }); // FIN GET
      } // FIN drawDashboard
/// Dashboard <=


      function updateChart(){
        order1 =  parseInt($("#order1 option:selected").val());
        order2 =  parseInt($("#order2 option:selected").val());
        theTitle = $("#order1 option:selected").text();
        //console.log("order1: "+order1);
        //console.log("view: "+view);
        barChart.setOption('title', 'Ranking ICVU 2017 para '+ theTitle );

        //barChart.view(columns: [0, 8]);
        //index = (order1==0)?7:order1;
        barChart.setView({columns:[0, order1, {calc:AddLabel, type:'string', role: 'annotation', label:'Height in Inches'}]}); // AQUIIII ACTUALIZO LA COLUMNA A MOSTRAR, SEGUN ORDEN

        data.sort([{column: order1, desc: order2==2}]);

        dashboard.draw(data, options);
        //view.setColumns([0,1,2,3,4,5,6]);
        //dashboard.draw(viewDetail, options);

      } // FIN updateChart

      $( document ).ready(function() {
          order1 =  parseInt($("#order1 option:selected").val());
          order2 =  parseInt($("#order2 option:selected").val());
          theTitle = $("#order1 option:selected").text();

          //console.log( "text_commune! " + order1 );

          $('#order1').change(function() {
              updateChart();
          });

          $('#order2').change(function() {
              updateChart();
          });

          var ejemplo=[6,5,3,2,4,5];

          createRadar(ejemplo);


      }); // FIN $( document ).ready(

*/
// $(function () {
//   $('[data-toggle="tooltip"]').tooltip()
// })