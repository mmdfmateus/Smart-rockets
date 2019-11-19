var rocket;
var population;
var target;
var count = 0;
var lifespan = 300;
var popMaxFit = 0;

function setup() {
    createCanvas(450, 500);
    target = new Target(width / 2, 30);
    population = new Population();
    population.initialize(10);
}

function draw() {
    background(0);
    target.draw();
    textAlign(CENTER, TOP);

    text(`max fitness: ${popMaxFit}`, width - 50, 10);
    count++;
    if (count == lifespan) {
        count = 0;
        population.evaluate();
        population.naturalSelection();
        popMaxFit = population.maxFit;
        population.initialize(population.size);
    }
    
    population.run();
}

function normalize(array, maxValue) {
    for (var i = 0; i < array.length; i++) {
        console.log("old: " + array[i].fitness);
        array[i].fitness = array[i].fitness * 100 / maxValue;
        console.log("\nnew: " + array[i].fitness + "\n\n");
    }
}

function keyPressed(){
    if(keyCode == LEFT_ARROW){
        noLoop();
        return;
    }if(keyCode == RIGHT_ARROW){
        loop();
        return;
    }
}