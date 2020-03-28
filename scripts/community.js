function Community(pop) {
    var population = [];
    var buffer = createGraphics(1000,1000);
    population.push(new Person(1));

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
        population.forEach(function (p) {
            p.update();
        });
    };
}
