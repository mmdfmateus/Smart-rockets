// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/bGz7mv2vD6g

var population;
// Each rocket is alive till 400 frames
var lifespan = 100;
// Made to display count on screen
var lifeP;
// Keeps track of frames
var count = 0;
// Where rockets are trying to go
var target;
// Max force applied to rocket
var maxforce = 0.2;

// Dimensions of barrier
var rx = 100;
var ry = 150;
var rw = 200;
var rh = 10;

var initialPop = 50;
var velMul = 0.5;

function myFunction() {
  initialPop = document.getElementById("populationId").value;
  population = new Population(initialPop);

  lifespan = document.getElementById("lifespanId").value;
}


function setup() {
  createCanvas(400, 300);
  population = new Population(initialPop);
  lifeP = createP();
  target = createVector(width / 2, 50);
  document.getElementById("populationId").value = initialPop;
  document.getElementById("lifespanId").value = lifespan;
}

function draw() {
  background(0);
  population.run();
  // Displays count to window
  lifeP.html(count);

  count++;
  if (count == lifespan) {
    population.evaluate();
    population.selection();
    // population.rouletteSelection();
    // Population = new Population();
    count = 0;
  }
  // Renders barrier for rockets
  fill(255);
  rect(rx, ry, rw, rh);
  // Renders target
  ellipse(target.x, target.y, 16, 16);
}