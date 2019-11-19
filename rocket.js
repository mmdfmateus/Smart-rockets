function Rocket() {
    this.pos = new createVector(width / 2, height - 20);
    this.vel = p5.Vector.random2D();
    this.acc = new createVector();
    this.dna = new DNA();
    this.width = 30;
    this.height = 3;
    this.hasHitBorder = false;
    this.hasHitTarget = false;
    this.fitness = 0;
    this.count = 0;


    this.applyForce = function (force) {
        this.acc.add(force);
    }

    this.update = function () {
        this.IsOnBorder();
        if (!this.hasHitBorder) {
            this.applyForce(this.dna.genes[this.count]);
            this.count++;

            this.vel.add(this.acc);
            this.pos.add(this.vel);
            this.acc.mult(0.5);
        }
    }

    this.show = function () {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading());
        noStroke();
        rectMode(CENTER);
        rect(0, 0, this.width, this.height);
        pop();
    }

    this.IsOnBorder = function () {
        if (this.pos.x > width || this.pos.x < this.width / 2) {
            this.hasHitBorder = true;
        }
        if (this.pos.y > height - this.height || this.pos.y < this.width / 2) {
            this.hasHitBorder = true;
        }
    }

    this.calculateFitness = function () {
        var d = dist(this.pos.x, this.pos.y, target.pos.x, target.pos.y);

        this.fitness = 1 / d;
        console.log("distance: " + d + "\nfitness: " + this.fitness + "\n\n");
        return this.fitness;
    }
}