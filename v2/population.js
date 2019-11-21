// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/bGz7mv2vD6g

function Population(initialPop) {
  // Array of rockets
  this.rockets = [];
  // Amount of rockets
  this.popsize = initialPop;
  // Amount parent rocket partners
  this.matingpool = [];

  // Associates a rocket to an array index
  for (var i = 0; i < this.popsize; i++) {
    this.rockets[i] = new Rocket();
  }

  this.evaluate = function () {

    var maxfit = 0;
    // Iterate through all rockets and calcultes their fitness
    for (var i = 0; i < this.popsize; i++) {
      // Calculates fitness
      this.rockets[i].calcFitness();
      // If current fitness is greater than max, then make max equal to current
      if (this.rockets[i].fitness > maxfit) {
        maxfit = this.rockets[i].fitness;
      }
    }
    
    var lastSum = 0;
    // Normalises fitnesses
    for (var i = 0; i < this.popsize; i++) {
      this.rockets[i].fitness /= maxfit;
      this.rockets[i].sum = this.rockets[i].fitness + lastSum;
      lastSum = this.rockets[i].sum;
      // console.log(`${i}-sum = ${this.rockets[i].sum}`);
    }

    this.matingpool = [];
    // Take rockets fitness make in to scale of 1 to 100
    // A rocket with high fitness will highly likely will be in the mating pool
    for (var i = 0; i < this.popsize; i++) {
      var n = this.rockets[i].fitness * 100;
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
      child.mutation();
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
    for (let i = 0; i < this.popsize; i++) {
      let ramdomNumber = getRandomArbitrary(minimum, maximum);
      selected.push(
        this.rockets.find (element => {
          if (ramdomNumber < element.sum) {
            return true;
          } else {
            return false;
          }
        })
      );
    
    }

    for(let i = 0; i < selected.length; i += 2) {
      let randomNumber = Math.random();
      if(randomNumber <= crossoverRate){
        let firstNewDna = selected[i].dna.crossover(selected[i + 1].dna);
        let secondNewDna = selected[i + 1].dna.crossover(selected[i].dna);

        firstNewDna.mutation();
        secondNewDna.mutation();

        selected[i] = new Rocket(firstNewDna);
        selected[i + 1] = new Rocket(secondNewDna);
      }
    }

    console.log(selected);
    this.rockets = selected;
    return selected;
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