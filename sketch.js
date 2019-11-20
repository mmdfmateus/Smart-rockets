var rocket;
var population;
var target;
var count = 0;
var lifespan = 300;
var popMaxFit = 0;
var mutationRate = 0.1;
var crossoverRate = 0.4;
var maxForce = 0.2;

function setup() {
    createCanvas(450, 500);
    target = new Target(width / 2, 20);
    population = new Population();
    population.initialize(50);
}

function draw() {
    background(0);
    target.draw();
    textAlign(CENTER, TOP);
    population.run();

    text(`max fitness: ${popMaxFit}`, width - 50, 10);
    count++;
    if (count == lifespan) {
        count = 0;
        population.evaluate();
        population.naturalSelection();
        popMaxFit = population.maxFit;
    }

}

function normalize(array, maxValue) {
    console.log(maxValue);
    for (var i = 0; i < array.length; i++) {
        console.log("old: " + array[i].fitness);
        array[i].fitness = array[i].fitness * 100 / maxValue;
        console.log("new: " + array[i].fitness + "\n");
    }
    return array;
}

function keyPressed() {
    if (keyCode == LEFT_ARROW) {
        noLoop();
        return;
    }
    if (keyCode == RIGHT_ARROW) {
        loop();
        return;
    }
}