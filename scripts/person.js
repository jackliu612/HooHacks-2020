var BUFFER_WIDTH = 1000;
var BUFFER_HEIGHT = 1000;

function Person(s) {
    var pos = generatePos();
    var SPEED = 0.44;
    var vel = createVector(SPEED, 0).rotate(random() * Math.PI * 2);
    var size = 0.1;
    

    var status = s;
    var color = ['white', 'red', 'blue'];

    this.update = function () {
        pos.add(vel);
        bounceWalls();
    }

    function bounceWalls() {
        if (pos.x < 0 || pos.x > BUFFER_WIDTH) {
            vel = createVector(-vel.x, vel.y);
        }

        if (pos.y < 0 || pos.y > BUFFER_HEIGHT) {
            vel = createVector(vel.x, -1 * vel.y);
        }

    }

    function generatePos(){
        var r = random();
        return createVector(random()*BUFFER_WIDTH, random()*BUFFER_HEIGHT);
    }

    this.show = function show(b) {
        b.push();
        b.noStroke();
        b.fill(color[status]);
        b.translate(pos.x, pos.y);
        b.ellipse(0, 0, 50 * size, 50 * size);
        b.pop();
    }

    this.getPosition = function () {
        return pos.copy();
    }

    this.getVelocity = function () {
        return vel.copy();
    }

    this.getSize = function () {
        return size;
    }

    this.setPosition = function (p) {
        pos = p.copy();
    }
    this.setVelocity = function (v) {
        vel = v.copy();
    }
}