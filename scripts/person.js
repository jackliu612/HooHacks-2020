function Person(s) {
    var r = random();
    var pos;

    if (r < .25) {
        pos = createVector(0, random() * windowHeight);
    } else if (r < .5) {
        pos = createVector(windowWidth, random() * windowHeight);
    } else if (r < .75) {
        pos = createVector(random() * windowWidth, 0);
    } else {
        pos = createVector(random() * windowWidth, windowHeight);
    }

    var vel = createVector(random() * 2 + 1.5, 0).rotate(random() * Math.PI * 2);
    var size = 5;

    var status = s;

    this.update = function () {
        pos.add(vel);
        bounceWalls();
    }

    function bounceWalls() {
        if (pos.x < 0 || pos.x > windowWidth) {
            vel = createVector(-vel.x, vel.y);
        }

        if (pos.y < 0 || pos.y > windowHeight) {
            vel = createVector(vel.x, -1 * vel.y);
        }

    }

    this.show = function show() {
        push();
        stroke(255);
        strokeWeight(1);
        noFill();
        translate(pos.x, pos.y);
        ellipse(0, 0, 50 * size, 50 * size);
        pop();
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