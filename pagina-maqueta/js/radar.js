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
var config = {
    type: 'radar',
    data: {
        labels: ['SM1', 'SM4', 'SM5', 'SM6', 'SM',"6!"], /*, 'CM1', 'CM3', 'CM5'*/
        datasets: [{
            label: 'Alto Hospicio',
            backgroundColor: color(window.chartColors.purple).alpha(0.6).rgbString(),
            borderColor: window.chartColors.purple,
            pointBackgroundColor: window.chartColors.purple,
            data:datos
        }
        /*, {
            label: 'Antofagasta',
            backgroundColor: color(window.chartColors.blue).alpha(0.2).rgbString(),
            borderColor: window.chartColors.blue,
            pointBackgroundColor: window.chartColors.blue,
            data: [
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor()
            ]
        }*/
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

function actualizar(){
      config.data.datasets.forEach(function(dataset) {
        /*  dataset.data = dataset.data.map(function() {
              return randomScalingFactor();
          });
          */
          dataset.data = datos;
      });

      window.myRadar.update();
}
$(document).ready(
  function(){
    document.getElementById('randomizeData').addEventListener('click', function() {
        config.data.datasets.forEach(function(dataset) {
          /*  dataset.data = dataset.data.map(function() {
                return randomScalingFactor();
            });
            */
            dataset.data = datos;
        });

        window.myRadar.update();
    });

}
)

var colorNames = Object.keys(window.chartColors);

$(document).ready(
  function(){
document.getElementById('addDataset').addEventListener('click', function() {
    var colorName = colorNames[config.data.datasets.length % colorNames.length];
    var newColor = window.chartColors[colorName];

    var newDataset = {
        label: 'Dataset ' + config.data.datasets.length,
        borderColor: newColor,
        backgroundColor: color(newColor).alpha(0.2).rgbString(),
        pointBorderColor: newColor,
        data: [],
    };

    for (var index = 0; index < config.data.labels.length; ++index) {
        newDataset.data.push(randomScalingFactor());
    }

    config.data.datasets.push(newDataset);
    window.myRadar.update();
});
}
)

$(document).ready(
  function(){
  document.getElementById('addData').addEventListener('click', function() {
      if (config.data.datasets.length > 0) {
          config.data.labels.push('dataset #' + config.data.labels.length);

          config.data.datasets.forEach(function(dataset) {
              dataset.data.push(randomScalingFactor());
          });

          window.myRadar.update();
      }
  });


document.getElementById('removeDataset').addEventListener('click', function() {
    config.data.datasets.splice(0, 1);
    window.myRadar.update();
});

document.getElementById('removeData').addEventListener('click', function() {
    config.data.labels.pop(); // remove the label first

    config.data.datasets.forEach(function(dataset) {
        dataset.data.pop();
    });

    window.myRadar.update();
});

}
)

}//cierre función createRadar
