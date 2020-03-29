var INFECTION_RATE = 0.3;

var SOCIAL_DISTANCING = false;
var SOCIAL_DISTANCING_FORCE = 0.5;

var TRANSMISSION_RADIUS = 10;

function Community(pop) {
    var population = [];
    var numSusceptible = [];
    var numInfected = [];
    var numRemoved = [];
    var numDead = [];
    var latestSusceptible;
    var latestInfected;
    var latestRemoved;
    var latestDead;
    var knownDisease;


    var socialRadius = 30;

    var buffer = createGraphics(BUFFER_WIDTH, BUFFER_HEIGHT);

    for (var i = 0; i < pop; i++) {
        population.push(new Person(0));
    }

    this.show = function () {
        buffer.background(51);
        population.forEach(function (p) {
            p.show(buffer);
        });
        return buffer;
    };

    this.update = function () {
        latestSusceptible = 0;
        latestInfected = 0;
        latestRemoved = 0;
        latestDead = 0;
        knownDisease = 0;

        population.forEach(function (p) {
            p.update();
            if (p.getStatus() === 0) {
                latestSusceptible++;
                if (SOCIAL_DISTANCING && p.doesSocialDistancing())
                    socialDistance(p);
            } else if (p.getStatus() === 1) {                                       //Infected, transmit to nearby
                latestInfected++;
                if (!p.isCarrier()) {
                    knownDisease++;
                }
                transmit(p);
                if (SOCIAL_DISTANCING && p.doesSocialDistancing())
                    socialDistance(p);
            } else if (p.getStatus() === 2) {
                latestRemoved++;
                if (SOCIAL_DISTANCING && p.doesSocialDistancing())
                    socialDistance(p);
            } else {
                latestDead++;
            }
        });

        numSusceptible.push(latestSusceptible);
        numInfected.push(latestInfected);
        numRemoved.push(latestRemoved);
        numDead.push(latestDead);
    };

    function transmit(p) {
        population.forEach(function (p2) {                                  //Transmission Code
            if (p2.getStatus() === 0) {                                       //Check if not removed
                var distance = p.getPosition().dist(p2.getPosition());      //Could optimize if we wanted
                if (distance <= TRANSMISSION_RADIUS && random() < INFECTION_RATE) {
                    p2.setStatus(1);
                }
            }
        });
    }

    function socialDistance(p) {
        var vel = createVector();

        population.forEach(function (p2) {
            if (p2.getStatus() !== 3) {
                var distance = p.getPosition().dist(p2.getPosition());
                if (distance <= socialRadius && distance !== 0) {
                    var push = p5.Vector.sub(p.getPosition(), p2.getPosition());
                    push.div(distance);
                    vel.add(push);
                }
            }
        });
        vel.mag(SOCIAL_DISTANCING_FORCE);
        p.setAcceleration(vel);
    }

    this.getNumSusceptible = function () {
        return numSusceptible;
    };

    this.getNumInfected = function () {
        return numInfected;
    };

    this.getNumRemoved = function () {
        return numRemoved;
    };

    this.getNumDead = function () {
        return numDead
    };

    this.getNumLatestSusceptible = function () {
        return latestSusceptible;
    };

    this.getNumLatestInfected = function () {
        return latestInfected;
    };

    this.getNumLatestRemoved = function () {
        return latestRemoved;
    };


    this.getNumLatestDead = function () {
        return latestDead;
    };

    this.getNumKnownDisease = function () {
        return knownDisease;
    };

    this.getPopulation = function () {
        return population;
    };

    this.setSocial = function (b) {
        SOCIAL_DISTANCING = b;
    }
}
