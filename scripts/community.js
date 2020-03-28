function Community(pop) {
    var population = [];
    var numSusceptible = [];
    var numInfected = [];
    var numRemoved = [];
    var latestSusceptible;
    var latestInfected;
    var latestRemoved;

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

        population.forEach(function (p) {
            p.update();
            if (p.getStatus() === 0) {
                latestSusceptible++;
            } else if (p.getStatus() === 1) {                                       //Infected, transmit to nearby
                latestInfected++;
                population.forEach(function (p2) {                                  //Transmission Code
                    if(p2.getStatus() !== 2) {                                      //Check if not removed
                        var distance = p.getPosition().dist(p2.getPosition());      //Could optimize if we wanted
                        if (distance <= transmissionRadius) {
                            p2.setStatus(1);
                        }
                    }
                });
            } else {
                latestRemoved++;
            }
        });

        numSusceptible.push(latestSusceptible);
        numInfected.push(latestInfected);
        numRemoved.push(latestRemoved);
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

    this.getNumLatestSusceptible = function () {
        return latestSusceptible;
    };

    this.getNumLatestInfected = function () {
        return latestInfected;
    };

    this.getNumLatestRemoved = function () {
        return latestRemoved;
    };
}
