var BUFFER_WIDTH = 500;
var BUFFER_HEIGHT = 500;
var FATALITY_FACTOR = 0.001;
var RECOVERY_FACTOR = 0.002;
var timeInfected = 0;

function Person(s) {
    var pos = generatePos();
    var SPEED = 0.44;
    var vel = createVector(SPEED, 0).rotate(random() * Math.PI * 2);
    var size = 0.15;


    var status = s;
    var color = ['white', 'red', 'blue', 'black'];

    this.update = function () {
        switch (status) {
            case 1:
                timeInfected++;
                die();
                recover();
                move();
                break;
            case 0:
            case 2:
                move();
                break;
        }
    };

    function recover() {
        rRate = Math.pow((RECOVERY_FACTOR * timeInfected / 10000), 3);
        if (random() < rRate) {
            status = 2;
        }
    }

    function die() {
        fRate = Math.pow((FATALITY_FACTOR * timeInfected / 10000), 3);
        if (random() < fRate) {
            status = 3;
        }
    }

    function move() {
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

    function generatePos() {
        return createVector(random() * BUFFER_WIDTH, random() * BUFFER_HEIGHT);
    }

    this.show = function show(b) {
        b.push();
        b.noStroke();
        b.fill(color[status]);
        b.translate(pos.x, pos.y);
        b.ellipse(0, 0, 50 * size, 50 * size);
        b.pop();
    };

    this.getPosition = function () {
        return pos.copy();
    };

    this.getVelocity = function () {
        return vel.copy();
    };

    this.getSize = function () {
        return size;
    };

    this.getStatus = function () {
        return status;
    };

    this.setPosition = function (p) {
        pos = p.copy();
    };
    this.setVelocity = function (v) {
        vel = v.copy();
    };

    this.setStatus = function (s) {
        status = s;
    }

}