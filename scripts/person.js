function Person(s) {
    var pos;
    generatePos();

    const SPEED = 0.44;
    var vel = createVector(SPEED, 0).rotate(random() * Math.PI * 2);
    var size = 0.1;
    

    var status = s;
    var color = ['white', 'red', 'blue'];

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

    function generatePos(){
        var r = random();

        if (r < .25) {
            return createVector(0, random() * windowHeight);
        } else if (r < .5) {
            return createVector(windowWidth, random() * windowHeight);
        } else if (r < .75) {
            return createVector(random() * windowWidth, 0);
        } else {
            return createVector(random() * windowWidth, windowHeight);
        }
    }

    this.show = function show() {
        push();
        noStroke();
        fill(color[status]);
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