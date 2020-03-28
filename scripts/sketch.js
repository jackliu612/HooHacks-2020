var coms = [[], [], []];
var totNumSusceptible = [];
var totNumInfected = [];
var totNumRemoved = [];
var totNumDead = [];

var travelRate = 0.003;

var popSize = 200;
var canvas;
var HEIGHT;
var WIDTH;

var comSize = 225;
var boarderWidth = 3;
var hPad;
var vPad;

var count = 0;

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
            coms[r][c] = (new Community(popSize));
            fill(0);
            rect(hPad + c * (comSize + hPad) - boarderWidth, vPad + r * (comSize + vPad) - boarderWidth, comSize + 2 * boarderWidth, comSize + 2 * boarderWidth);
        }
    }
}

function draw() {
    var sus = 0, inf = 0, rem = 0, ded = 0;

    for (var r = 0; r < 3; r++) {
        for (var c = 0; c < 2; c++) {
            var pop = coms[r][c].getPopulation();
            var travels = pop.length*travelRate;
            for (var i = 0; i < travels; i++){
                coms[Math.floor(random()*3)][Math.floor(random()*2)].getPopulation().push(pop.shift());
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
    if (frameCount % 5 === 0)
        addData(sus, inf, rem);
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

function addData(sus, inf, rem) {
    chart.data.labels.push('');
    chart.data.datasets[0].data.push(sus / 1200);
    chart.data.datasets[1].data.push(inf / 1200);
    chart.data.datasets[2].data.push(rem / 1200);

    chart.update(0);

    console.log("added")
}
