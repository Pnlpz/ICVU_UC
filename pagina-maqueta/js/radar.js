var config;

function actualizar(datos, titulo){
/*
      config.data.datasets.forEach(function(dataset) {
        // dataset.data = dataset.data.map(function() {
        //      return randomScalingFactor();
        //});
          
          dataset.data = datos;
          dataset.label = titulo;
      });

*/
      function addData(chart, label, data) {
          chart.data.labels.push(label);
          chart.data.datasets.forEach((dataset) => {
              dataset.data.push(data);
          });
          chart.update();
      }

      function removeData(chart) {
          chart.data.labels.pop();
          chart.data.datasets.forEach((dataset) => {
              dataset.data.pop();
          });
          chart.update();
      }

      function updateConfigByMutating(chart) {
        //removeData(chart);
        x = chart.data.datasets.length;
        console.log("X> "+x);
        console.log(":> "+chart.data.datasets[0]);
        chart.data.datasets[0].data = datos;
        chart.data.datasets[0].label = titulo;

          chart.options.title.text = "Detalle ICVU para "+titulo;
          chart.update();
      }

      updateConfigByMutating(window.myRadar);
      canvasId = "spider";
      var canvas = document.getElementById(canvasId);
      var ctx = canvas.getContext("2d");
      /*
      ctx.beginPath();
      ctx.rect(0, 0, c.width, c.height);
      ctx.fillStyle = "white";
      ctx.fill();
      */
      // change non-opaque pixels to white
      var imgData=ctx.getImageData(0,0,canvas.width,canvas.height);
      var data=imgData.data;
      for(var i=0;i<data.length;i+=4){
          if(data[i+3]<255){
              data[i] = 255 - data[i];
              data[i+1] = 255 - data[i+1];
              data[i+2] = 255 - data[i+2];
              data[i+3] = 255 - data[i+3];
          }
      }


      window.myRadar.update();
}

function createRadar(datos, titulo){

var randomScalingFactor = function() {
    return Math.round(Math.random() * 100);
};

/////////////////////////////////
/*var datos = [
[1,2,3,4,5],
[2,3,4,5,6],
[2,3,8,5,6],
[2,13,4,5,6]
];*/


/////////////////////////////////
var beginAtZero=[0,0,0,0,0,0,0];

var colorsRanges = [
"#BEBEFF",
"#5C5CFF",
"#1B1464"
];

var color = Chart.helpers.color;
var datasets_min = {
            label: 'mínimo del Rango Promedio',
            backgroundColor: color(window.chartColors.grey).alpha(0.2).rgbString(),
            borderColor: window.chartColors.grey,
            //pointBackgroundColor: window.chartColors.grey,
            pointBackgroundColor: colorsRanges[0],
            data: [40,40,40,40,40,40,40]
        };
var datasets_max = {
            label: 'máximo del Rango Promedio',
            backgroundColor: color(window.chartColors.grey).alpha(0.2).rgbString(),
            borderColor: window.chartColors.grey,
            //pointBackgroundColor: window.chartColors.grey,
            pointBackgroundColor: colorsRanges[1],
            data: [70,70,70,70,70,70,70]
        };
config = {
    type: 'radar',
    data: {
      //'ICVU2017','CL','AN','CS','CM','SM','VE'
      // labels: ['ICVU','CL','AN','CS','CM','SM','VE'], /*, 'CM1', 'CM3', 'CM5'*/
            
        labels: ['ICVU','Condiciones Laborales','Ambiente de Negocios','Condiciones Socio Culturales',
        'Conectividad y Movilidad','Salud y Medio Ambiente','Vivienda y Entorno'], /*, 'CM1', 'CM3', 'CM5'*/
        datasets: [{
            label: titulo,
            backgroundColor: color(window.chartColors.purple).alpha(0.9).rgbString(),
            borderColor: window.chartColors.purple,
            pointBackgroundColor: window.chartColors.purple,
            data:datos
        },
        datasets_min,
        datasets_max
      ]
    },
    options: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: ' '
        },
        scale: {
            ticks: {
                beginAtZero: true,
                max: 100,
                fontSize: 12,
                display: true/*Cotas numéricas del radar*/
              }
        }
    }
};

window.onload = function() {
    window.myRadar = new Chart(document.getElementById('spider'), config);
};


var colorNames = Object.keys(window.chartColors);


}//cierre función createRadar
