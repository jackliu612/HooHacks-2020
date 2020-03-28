var com;
var canvas;

var comSize = 200;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    com = new Community(100);
    background(51);

//    Setting up layouts
    rect(20, 20, (windowWidth / 2) - 40, windowHeight - 40);
    rect(windowWidth / 2 + 20, 20, (windowWidth / 2) - 40, windowHeight - 40);
    push();
    fill(100);
    rect(windowWidth / 2 + 20, 20,comSize,comSize);
    pop();
}

function draw() {
    com.update();
    var buf = com.show();
    push();
    strokeWeight(4);
    image(buf, windowWidth / 2 + 20, 20,comSize,comSize);
    pop();
}