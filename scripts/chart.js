var ctx = document.getElementById('myChart');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: [],
        datasets: [{
            label: 'yeet',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: []
        }, {            
            label: 'yote',
            backgroundColor: 'rgb(132, 99, 255)',
            borderColor: 'rgb(132, 99, 255)',
            data: []
        }, {
            label: 'yote',
            backgroundColor: 'rgb(132, 255, 255)',
            borderColor: 'rgb(132, 255, 255)',
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