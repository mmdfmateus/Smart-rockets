function Rocket(dna) {
    if (dna) {
        this.dna = dna;
    } else {
        this.dna = new DNA();
    }
    this.pos = new createVector(width / 2, height - 20);
    this.vel = p5.Vector.random2D();
    this.acc = new createVector();
    this.width = 30;
    this.height = 3;
    this.hasHitBorder = false;
    this.hasHitTarget = false;
    this.normalizedFitness = 0;
    this.fitness = 0;


    this.applyForce = function (force) {
        this.acc.add(force);
    }

    this.update = function () {
        this.IsOnBorder();
        this.IsOnTarget();
        this.applyForce(this.dna.genes[count]);
        if (!this.hasHitBorder && !this.hasHitTarget) {

            this.vel.add(this.acc);
            this.pos.add(this.vel);
            this.acc.mult(0.5);
            // this.vel.limit(3);
        }
    }

    this.show = function () {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading());
        if(this.hasHitTarget){
            fill(0, 255, 0);
        }
        if(this.hasHitBorder){
            fill(255, 0, 0);
        }
        noStroke();
        rectMode(CENTER);
        rect(0, 0, this.width, this.height);
        pop();
    }

    this.IsOnBorder = function () {
        if (this.pos.x > width || this.pos.x < this.width / 2) {
            this.hasHitBorder = true;
        } else if (this.pos.y > height - this.height || this.pos.y < this.width / 2) {
            this.hasHitBorder = true;
        } else {
            this.hasHitBorder = false;
        }
    }

    this.IsOnTarget = function(){
        var d = dist(this.pos.x, this.pos.y, target.pos.x, target.pos.y);
        if(d < 10){
            this.hasHitTarget = true;
        } else {   
            this.hasHitTarget = false;
        }
    }

    this.calculateFitness = function () {
        var d = dist(this.pos.x, this.pos.y, target.pos.x, target.pos.y);

        this.fitness = map(d, 0, width, width, 0);
        if(this.fitness < 0){
            this.fitness = 0;
        }
        if(this.fitness > width){
            this.fitness = width;
        }
        if(this.hasHitTarget){
            this.fitness *= 10;
        } else{
            this.fitness /= 10;
        }
        console.log("distance: " + d + "\tfitness: " + this.fitness + "\n\n");

        return this.fitness;
    }
}