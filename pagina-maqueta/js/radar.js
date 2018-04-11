var config;

function actualizar(datos){
      config.data.datasets.forEach(function(dataset) {
        /*  dataset.data = dataset.data.map(function() {
              return randomScalingFactor();
          });
          */
          dataset.data = datos;
      });

      window.myRadar.update();
}

function createRadar(datos){

console.log("radar chart por aqui");

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

var color = Chart.helpers.color;
config = {
    type: 'radar',
    data: {
        labels: ['SM1', 'SM4', 'SM5', 'SM6', 'SM',"6!"], /*, 'CM1', 'CM3', 'CM5'*/
        datasets: [{
            label: 'Alto Hospicio',
            backgroundColor: color(window.chartColors.purple).alpha(0.9).rgbString(),
            borderColor: window.chartColors.purple,
            pointBackgroundColor: window.chartColors.purple,
            data:datos
        },
        {
            label: 'Promedio',
            backgroundColor: color(window.chartColors.grey).alpha(0.2).rgbString(),
            borderColor: window.chartColors.grey,
            pointBackgroundColor: window.chartColors.grey,
            data: [4,2,4,3,3,4]
        }

      ]
    },
  /*  options: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Revisar por Comuna'
        },
        scale: {
            ticks: {
                beginAtZero: true,
                fontSize: 10,
                display: true/*Cotas numéricas del radar*/
    /*        }
        }
    }*/
};

window.onload = function() {
    window.myRadar = new Chart(document.getElementById('spider'), config);
};


var colorNames = Object.keys(window.chartColors);


}//cierre función createRadar
