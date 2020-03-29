var coms = [[], [], []];
var totNumSusceptible = [];
var totNumInfected = [];
var totNumRemoved = [];
var totNumDead = [];

var TRAVEL_RATE = 0.05;

var POP_SIZE = 200;
var canvas;
var HEIGHT;
var WIDTH;

var comSize = 225;
var boarderWidth = 3;
var hPad;
var vPad;

var count = 0;

var pause = false;

var storedData = [];

function setup() {
    //frameRate(10);
    HEIGHT = windowHeight;
    WIDTH = windowWidth / 2;
    hPad = (WIDTH - 2 * comSize) / 3;
    vPad = (HEIGHT - 3 * comSize) / 4;

    canvas = createCanvas(WIDTH, HEIGHT);
    canvas.parent('sketch-holder');

    background(255);

    for (var r = 0; r < 3; r++) {
        for (var c = 0; c < 2; c++) {
            coms[r][c] = (new Community(POP_SIZE));
            fill(0);
            rect(hPad + c * (comSize + hPad) - boarderWidth, vPad + r * (comSize + vPad) - boarderWidth, comSize + 2 * boarderWidth, comSize + 2 * boarderWidth);
        }
    }

    //Add infected person
    coms[0][0].getPopulation()[0].setStatus(1);
}

function draw() {
    if (!pause) {
        var sus = 0, inf = 0, rem = 0, ded = 0;

        for (var r = 0; r < 3; r++) {
            for (var c = 0; c < 2; c++) {
                var pop = coms[r][c].getPopulation();
                if (random() < TRAVEL_RATE) {
                    var individual = pop.shift();
                    individual.setPosition(createVector(BUFFER_WIDTH / 2, BUFFER_HEIGHT / 2));
                    coms[Math.floor(random() * 3)][Math.floor(random() * 2)].getPopulation().push(individual);
                }
            }
        }

        for (r = 0; r < 3; r++) {
            for (c = 0; c < 2; c++) {
                coms[r][c].update();
                var buff = coms[r][c].show();
                image(buff, hPad + c * (comSize + hPad), vPad + r * (comSize + vPad), comSize, comSize);
                sus += coms[r][c].getNumLatestSusceptible();
                inf += coms[r][c].getNumLatestInfected();
                rem += coms[r][c].getNumLatestRemoved();
                ded += coms[r][c].getNumLatestDead();
            }
        }
        /*
            totNumSusceptible.push(sus);
            totNumInfected.push(inf);
            totNumRemoved.push(rem);
            totNumDead.push(ded);
        */

        // coms[0][0].update();
        // var buf = coms[0][0].show();
        // push();
        // strokeWeight(4);
        // image(buf, 20, 20, comSize, comSize);
        // pop();
        if (count % 5 === 0)
            addData(sus, inf, rem);
        if (inf === 0) {
            pause = true;
        }
        if (inf >= POP_SIZE / 2 && !SOCIAL_DISTANCING) {
            console.log('Hi');
            SOCIAL_DISTANCING = true;
        }
        count++;
    }
}

function getTotNumSusceptible() {
    return totNumSusceptible;
}

function getTotNumInfected() {
    return totNumInfected;
}

function getTotNumRemoved() {
    return totNumRemoved;
}

function getTotNumDead() {
    return totNumDead;
}

function addData(sus, inf, rem, ded) {
    chart.data.labels.push('');
    chart.data.datasets[1].data.push(sus);
    chart.data.datasets[0].data.push(inf);
    chart.data.datasets[2].data.push(rem);
    chart.data.datasets[3].data.push(ded);


    chart.update(0);

    console.log("added")
}

function keyPressed() {
    if (keyCode === 32) {    //Spacebar
        pause = !pause;
    }
    if (keyCode === 82) {    //R key
        reset();
    }
}

function reset() {
    setup();
    storeData();
    //reset graph
    chart.update(0);
    chart.data.labels = [];
    chart.data.datasets[0].data = [];
    chart.data.datasets[1].data = [];
    chart.data.datasets[2].data = [];
    chart.data.datasets[3].data = [];

    chart.update(0);
    pause = false;
}

function storeData() {
    storedData.push([chart.data.labels, chart.data.datasets[0].data, chart.data.datasets[1].data, chart.data.datasets[2].data, chart.data.datasets[3].data]);
}

function getStoredData(index) {
    chart.data.labels = storedData[0][0];
    chart.data.datasets[0].data = storedData[0][1];
    chart.data.datasets[1].data = storedData[0][2];
    chart.data.datasets[2].data = storedData[0][3];
    chart.data.datasets[3].data = storedData[0][4];

    chart.update(0);

}
