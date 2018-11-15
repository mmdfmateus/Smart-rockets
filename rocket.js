function Rocket() {
    this.pos = new createVector(width / 2, height - 20);
    this.vel = p5.Vector.random2D();
    this.acc = new createVector();
    this.dna = new DNA();
    this.count = 0;


    this.applyForce = function (force) {
        this.acc.add(force);
    }

    this.update = function () {
        this.applyForce(this.dna.genes[this.count]);
        this.count++;

        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    this.show = function () {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading());
        noStroke();
        rectMode(CENTER);
        rect(0, 0, 30, 5);
        pop();
    }

    this.calculateFitness = function () {
        var d = dist(this.pos.x, this.pos.y, target.pos.x, target.pos.y);

        return d;
    }
}