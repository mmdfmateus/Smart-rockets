var rocket;
var population;
var target;
var count = 0;
var lifespan = 300;

function setup(){
    createCanvas(450, 600);
    rocket = new Rocket();
    target = new Target(width/2, 20);
    population = new Population();
    population.initialize(20);
}

function draw(){
    background(0);
    target.draw();

    count++;
    if(count == lifespan){
        count = 0;
        population.evaluate();
        population.initialize(20);
    }
    
    rocket.update();
    rocket.show();
    population.run();
}
