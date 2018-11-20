var rocket;
var population;
var target;
var count = 0;
var lifespan = 300;
var popMaxFit;

function setup() {
    createCanvas(450, 500);
    rocket = new Rocket();
    target = new Target(width / 2, 20);
    population = new Population();
    population.initialize(20);
    popMaxFit = 0;
}

function draw() {
    background(0);
    target.draw();
    textAlign(CENTER, TOP);

    text(popMaxFit, width - 20, 10);
    count++;
    if (count == lifespan) {
        count = 0;
        population.evaluate();
        population.naturalSelection();
        popMaxFit = population.maxFit;
        population.initialize(population.size);
    }
    

    rocket.update();
    rocket.show();
    population.run();
}

function normalize(array, maxValue) {
    for (var i = 0; i < array.length; i++) {
        console.log("old: " + array[i].fitness);
        array[i].fitness = array[i].fitness * 100 / maxValue;
        console.log("\nnew: " + array[i].fitness + "\n\n");
    }
}