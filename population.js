function Population() {
    this.rockets = [];
    this.size;
    this.maxFit = 0;
    this.matingPool = [];

    this.initialize = function (size) {
        this.size = size;
        for (var i = 0; i < this.size; i++) {
            this.rockets[i] = new Rocket();
        }
    }

    this.run = function () {
        for (var i = 0; i < this.size; i++) {
            this.rockets[i].update();
            this.rockets[i].show();
        }
    }

    this.evaluate = function () {
        this.maxFit = 0;
        this.evaluateRockets();
        this.setMatingPool();
    }

    this.evaluateRockets = function () {
        for (var i = 0; i < this.size; i++) {
            var fitness = this.rockets[i].calculateFitness();
            if (fitness > this.maxFit) {
                this.maxFit = this.rockets[i].fitness;
            }
        }

        normalize(this.rockets, this.maxFit);
        this.maxFit *= 100;
    }

    this.setMatingPool = function () {
        this.matingPool = [];

        for (var i = 0; i < this.size; i++) {
            var count = this.rockets[i].fitness;
            for (var j = 0; j < count; j++) {
                this.matingPool.push(this.rockets[i]);
            }
        }
    }

    this.naturalSelection = function () {
        var parentA = random(this.matingPool);
        var parentB = random(this.matingPool);
        console.log(this.matingPool);
        console.log(parentA);

        var newDna = parentA.dna.crossover(parentB.dna);
        console.log(newDna.genes);
    }
}