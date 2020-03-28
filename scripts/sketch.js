var coms = [[], [], []];
var popSize = 200;
var canvas;
var HEIGHT;
var WIDTH;

var comSize = 225;

function setup() {
    //frameRate(10);
    HEIGHT = windowHeight;
    WIDTH = windowWidth;
    canvas = createCanvas(WIDTH, HEIGHT);
    for (var r = 0; r < 3; r++) {
        for (var c = 0; c < 2; c++) {
            coms[r][c] = (new Community(popSize));
        }
    }
    background(51);

//    Setting up layouts
    rect(20, 20, (WIDTH / 2) - 40, HEIGHT - 40);
    rect(WIDTH / 2 + 20, 20, (WIDTH / 2) - 40, HEIGHT - 40);
}

function draw() {
    for (var r = 0; r < 3; r++) {
        for (var c = 0; c < 2; c++) {
            coms[r][c].update();
            var buff = coms[r][c].show();
            image(buff, 20 + c*(comSize+10), 20+r*(comSize+10), comSize, comSize)
        }
    }

    // coms[0][0].update();
    // var buf = coms[0][0].show();
    // push();
    // strokeWeight(4);
    // image(buf, 20, 20, comSize, comSize);
    // pop();
}