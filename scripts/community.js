function Community(pop) {
    var population = [];
    population.push(new Person(1));

    for (var i = 0; i < pop; i++) {
        population.push(new Person(0));
    }

    this.show = function () {
        population.forEach(function (p) {
            p.show();
        });
    }

    this.update = function () {
        population.forEach(function (p) {
            p.update();
        });
    }
}
