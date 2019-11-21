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

        // this.rockets = this.normalizeFitness(this.rockets, this.maxFit);
        for (var i = 0; i < this.size; i++) {
            this.rockets[i].fitness /= this.maxFit;
        }
        console.log(`maxfit: ${this.maxFit}`);
        // this.maxFit *= 100;
    }

    this.setMatingPool = function () {
        this.matingPool = [];

        for (var i = 0; i < this.size; i++) {
            var count = this.rockets[i].fitness * 100;
            for (var j = 0; j < count; j++) {
                this.matingPool.push(this.rockets[i]);
            }
        }

        console.log(this.matingPool);
    }

    this.naturalSelection = function (crossoverRate) {
        var newRockets = [];
        for(var i = 0; i < this.rockets.length; i++){

            var parentA = random(this.matingPool);
            var parentB = random(this.matingPool);
            // console.log(this.matingPool);
            // console.log(parentA);
            
            var newDna = parentA.dna.crossover(parentB.dna);
            newDna.mutation();

            newRockets[i] = new Rocket(newDna);
        }

        this.rockets = newRockets
    }

    this.normalizeFitness = function(array, maxValue) {
        console.log(maxValue);
        for (var i = 0; i < array.length; i++) {
            console.log("old: " + array[i].fitness);
            array[i].normalizedFitness = array[i].fitness * 100 / maxValue;
            console.log("\tnew: " + array[i].normalizedFitness + "\n\n");
        }
        return array;
    }
}