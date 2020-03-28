function Community(pop) {
    var population = [];
    var buffer = createGraphics(500,500);
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
        population.forEach(function (p) {
            p.update();
        });
        transmit();
    };

    function transmit(){
        population.forEach(function (p1) {
            if(p1.getStatus() === 1){    //infected, tranmit to nearby
                population.forEach(function (p2) {
                    var distance = p1.getPosition().dist(p2.getPosition());
                    if(distance <= 10){
                        p2.setStatus(1);
                    }
                });
            }
        });
    }
}
