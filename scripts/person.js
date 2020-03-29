var BUFFER_WIDTH = 500;
var BUFFER_HEIGHT = 500;
var FATALITY_FACTOR = 0.01;
var RECOVERY_FACTOR = 0.05;
var CARRIER_CHANCE = 0.2;

var SOCIAL_DISTANCING_FACTOR = .5;

function Person(s) {
    var pos = generatePos();
    var SPEED = 0.44;
    var vel = createVector(SPEED, 0).rotate(random() * Math.PI * 2);
    var acc = vel.copy();
    var size = 0.15;
    var timeInfected = 0;
    var carrier = random() < CARRIER_CHANCE;

    var socialDistancingParticipation = (random() < SOCIAL_DISTANCING_FACTOR);


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
        rRate = Math.pow((RECOVERY_FACTOR * timeInfected / 200), 3);
        if (random() < rRate) {
            status = 2;
        }
    }

    function die() {
        fRate = Math.pow((FATALITY_FACTOR * timeInfected / 200), 3);
        if (random() < fRate) {
            status = 3;
        }
    }

    function move() {
        vel.add(acc);
        vel.limit(SPEED);
        pos.add(vel);
        bounceWalls();
    }

    function bounceWalls() {
        if (pos.x < 0 || pos.x > BUFFER_WIDTH) {
            vel = createVector(-vel.x, vel.y);
            acc = createVector(-acc.x, acc.y);
        }

        if (pos.y < 0 || pos.y > BUFFER_HEIGHT) {
            vel = createVector(vel.x, -1 * vel.y);
            acc = createVector(acc.x, -1 * acc.y);
        }
    }

    function generatePos() {
        return createVector(random() * BUFFER_WIDTH, random() * BUFFER_HEIGHT);
    }

    this.show = function show(b) {
        b.push();
        b.noStroke();
        if(status === 1 && carrier){
            b.fill(217, 255, 3);
        } else {
            b.fill(color[status]);
        }
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

    this.getAcceleration = function () {
        return acc.copy();
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

    this.setAcceleration = function(a) {
        acc = a.copy();
    };

    this.setStatus = function (s) {
        status = s;
    };

    this.doesSocialDistancing = function () {
        return socialDistancingParticipation;
    };

    this.isCarrier = function() {
        return carrier;
    };

}