var ctx = document.getElementById('myChart');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: [],
        datasets: [{
            label: 'Infected',
            backgroundColor: 'rgb(184, 4, 4)',
            borderColor: 'rgb(184, 4, 4)',
            data: []
        }, {            
            label: 'Susceptible',
            backgroundColor: 'rgb(232, 230, 230)',
            borderColor: 'rgb(232, 230, 230)',
            data: []
        }, {
            label: 'Recovered',
            backgroundColor: 'rgb(188, 227, 166)',
            borderColor: 'rgb(188, 227, 166)',
            data: []
        }, {            
            label: 'Dead',
            backgroundColor: 'rgb(10, 10, 10)',
            borderColor: 'rgb(10, 10, 10)',
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