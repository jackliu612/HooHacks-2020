var ctx = document.getElementById('myChart');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: [],
        datasets: [{
            label: 'Infected',
            backgroundColor: 'rgb(255, 104, 104)',
            borderColor: 'rgb(255, 104, 104)',
            data: []
        }, {            
            label: 'Susceptible',
            backgroundColor: 'rgb(232, 230, 230)',
            borderColor: 'rgb(232, 230, 230)',
            data: []
        }, {
            label: 'Recovered',
            backgroundColor: 'rgb(7, 146, 165)',
            borderColor: 'rgb(7, 146, 165)',
            data: []
        }, {            
            label: 'Dead',
            backgroundColor: 'rgb(18, 3, 43)',
            borderColor: 'rgb(18, 3, 43)',
            data: []
        }]
        
    },

    // Configuration options go here
    options: {
        scales: {
            xAxes:[{
                display:false
            }],
            yAxes: [{
                stacked: true
            }]
        },
        animation: {
            duration: 0 // general animation time
        },
        hover: {
            animationDuration: 0 // duration of animations when hovering an item
        },
        responsiveAnimationDuration: 0 // animation duration after a resize
        ,        
        elements: {
            line: {
                tension: 0 // disables bezier curves
            },
            point: {
                radius: 0
            }
            
        }
    }        

});