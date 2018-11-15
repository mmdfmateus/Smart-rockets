

function Population() {
    this.rockets = [];
    this.size;

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

    this.evaluate = function(){
        for (var i = 0; i < this.size; i++) {
            this.rockets[i].calculateFitness();
            
        }
    }
}