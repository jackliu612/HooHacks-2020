var com;
var canvas;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    com = new Community(10);
    background(51);
}

function draw() {
    com.update();
    com.show();
}