function Population(initialPop, mutationRate) {
  // Array of rockets
  this.rockets = [];
  // Amount of rockets
  this.popsize = initialPop;
  // Amount parent rocket partners
  this.matingpool = [];

  this.mutationRate = mutationRate;

  // Associates a rocket to an array index
  for (var i = 0; i < this.popsize; i++) {
    this.rockets[i] = new Rocket();
  }

  this.evaluate = function () {
    var maxfit = 0;
    // Iterate through all rockets and calcultes their fitness
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

    // Mating Pool selection configuration
    this.matingpool = [];
    for (var i = 0; i < this.popsize; i++) {
      var n = this.rockets[i].fitness * 100;   // A high fitness rocket will have more ocurrences
      for (var j = 0; j < n; j++) {
        this.matingpool.push(this.rockets[i]);
      }
    }

  }

  // Selects appropriate genes for child
  this.selection = function () {
    var newRockets = [];
    for (var i = 0; i < this.rockets.length; i++) {
      // Picks random dna
      var parentA = random(this.matingpool).dna;
      var parentB = random(this.matingpool).dna;
      // Creates child by using crossover function
      var child = parentA.crossover(parentB);
      child.mutation(mutationRate);
      // Creates new rocket with child dna
      newRockets[i] = new Rocket(child);
    }
    // This instance of rockets are the new rockets
    this.rockets = newRockets;
  }



  // Roulette selection
  this.rouletteSelection = function (crossoverRate) {
    let selected = [];
    let minimum = this.rockets[0].sum;
    let maximum = this.rockets[this.popsize - 1].sum;

    // Get selected fathers
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

    // Make crossover and mutation for each rocket
    for (let i = 0; i < selected.length; i += 2) {
      let randomNumber = Math.random();
      if (randomNumber <= crossoverRate) {
        let firstNewDna = selected[i].dna.crossover(selected[i + 1].dna);
        let secondNewDna = selected[i + 1].dna.crossover(selected[i].dna);

        firstNewDna.mutation(this.mutationRate);
        secondNewDna.mutation(this.mutationRate);

        selected[i] = new Rocket(firstNewDna);
        selected[i + 1] = new Rocket(secondNewDna);
      } else {
        selected[i] = new Rocket(selected[i].dna, this.mutationRate);
        selected[i + 1] = new Rocket(selected[i + 1].dna, this.mutationRate);

        selected[i].dna.mutation(this.mutationRate);
        selected[i + 1].dna.mutation(this.mutationRate);
      }
    }

    this.rockets = selected;
  }

  // function to get Random numbers between two numbers
  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  // Calls for update and show functions
  this.run = function () {
    for (var i = 0; i < this.popsize; i++) {
      this.rockets[i].update();
      // Displays rockets to screen
      this.rockets[i].show();
    }
  }
}