function DNA(genes) {
    if (genes != null) {
        this.genes = genes;
    } else {
        this.genes = [];
        for (var i = 0; i < lifespan; i++) {
            this.genes[i] = p5.Vector.random2D();
            this.genes[i].setMag(0.08);
        }
    }

    this.crossover = function (secondDna) {
        var genes = [];

        //get the first half of the current DNA gene and the other half from the other
        for (var i = 0; i < this.genes.length; i++) {
            if (i < this.genes.length / 2) {
                genes[i] = this.genes[i];
            } else {
                genes[i] = secondDna.genes[i];
            }
        }
        return new DNA(genes);
    }

    this.mutation = function() {
        for (var i = 0; i < this.genes.length; i++) {
          if (random(1) < 0.03) {
            this.genes[i] = p5.Vector.random2D();
            this.genes[i].setMag(maxForce);
          }
        }
      }
}