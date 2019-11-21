function Population(initialPop, mutationRate) {
  this.rockets = [];
  this.popsize = initialPop;
  this.matingpool = [];

  this.mutationRate = mutationRate;

  for (var i = 0; i < this.popsize; i++) {
    this.rockets[i] = new Rocket();
  }

  this.evaluate = function () {
    var maxfit = 0;
    for (var i = 0; i < this.popsize; i++) {
      this.rockets[i].calcFitness();
      if (this.rockets[i].fitness > maxfit) {
        maxfit = this.rockets[i].fitness;
      }
    }

    // Roullette selection configuration
    var lastSum = 0;
    for (var i = 0; i < this.popsize; i++) {
      this.rockets[i].fitness /= maxfit;   // Normalises fitnesses
      this.rockets[i].sum = this.rockets[i].fitness + lastSum;
      lastSum = this.rockets[i].sum;
    }

    this.matingpool = [];
    for (var i = 0; i < this.popsize; i++) {
      var n = this.rockets[i].fitness * 100;   // A high fitness rocket will have more ocurrences
      for (var j = 0; j < n; j++) {
        this.matingpool.push(this.rockets[i]);
      }
    }
  }

  this.selection = function () {
    var newRockets = [];
    for (var i = 0; i < this.rockets.length; i++) {
      var parentA = random(this.matingpool).dna;
      var parentB = random(this.matingpool).dna;
      var child = parentA.crossover(parentB);
      child.mutation(mutationRate);
      newRockets[i] = new Rocket(child);
    }
    this.rockets = newRockets;
  }

  this.rouletteSelection = function (crossoverRate) {
    let selected = [];
    let minimum = this.rockets[0].sum;
    let maximum = this.rockets[this.popsize - 1].sum;

    for (let i = 0; i < this.popsize; i++) {
      let randomNumber = getRandomArbitrary(minimum, maximum);
      selected.push(
        this.rockets.find(element => {
          if (randomNumber <= element.sum) {
            return true;
          } else {
            return false;
          }
        })
      );
    }
    for (let i = 0; i < selected.length; i += 2) {
      let randomNumber = Math.random();
      if (randomNumber <= crossoverRate) {
        let firstNewDna = selected[i].dna.crossover(selected[i + 1].dna);
        let secondNewDna = selected[i + 1].dna.crossover(selected[i].dna);

        firstNewDna.mutation(this.mutationRate);
        secondNewDna.mutation(this.mutationRate);

        selected[i] = new Rocket(firstNewDna, this.mutationRate);
        selected[i + 1] = new Rocket(secondNewDna, this.mutationRate);
      } else {
        selected[i] = new Rocket(selected[i].dna, this.mutationRate);
        selected[i + 1] = new Rocket(selected[i + 1].dna, this.mutationRate);

        selected[i].dna.mutation(this.mutationRate);
        selected[i + 1].dna.mutation(this.mutationRate);
      }
    }

    this.rockets = selected;
  }

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  this.run = function () {
    for (var i = 0; i < this.popsize; i++) {
      this.rockets[i].update();
      this.rockets[i].show();
    }
  }
}