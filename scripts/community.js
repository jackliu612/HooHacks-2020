var INFECTION_RATE = 0.3;

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

    var transmissionRadius = 10;

    var buffer = createGraphics(500, 500);

    population.push(new Person(1));

    for (var i = 1; i < pop; i++) {
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

        population.forEach(function (p) {
            p.update();
            if (p.getStatus() === 0) {
                latestSusceptible++;
            } else if (p.getStatus() === 1) {                                       //Infected, transmit to nearby
                latestInfected++;
                population.forEach(function (p2) {                                  //Transmission Code
                    if(p2.getStatus() === 0) {                                       //Check if not removed
                        var distance = p.getPosition().dist(p2.getPosition());      //Could optimize if we wanted
                        if (distance <= transmissionRadius && random() < INFECTION_RATE) {
                            p2.setStatus(1);
                        }
                    }
                });
            } else if (p.getStatus() === 2) {
                latestRemoved++;
            } else {
                latestDead++;
            }
        });

        numSusceptible.push(latestSusceptible);
        numInfected.push(latestInfected);
        numRemoved.push(latestRemoved);
        numDead.push(latestDead);
    };

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


    this.getNumLatestDead = function() {
        return latestDead;
    };
}
