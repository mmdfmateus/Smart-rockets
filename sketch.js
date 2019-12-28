var population;
var lifespan = 150;
var lifeP;
var count = 0;
var target;
var maxforce = 0.2;

var rx = 100;
var ry = 150;
var rw = 200;
var rh = 10;

// Target dragging
var targetDragging = false;
var offsetX, offsetY;

var initialPop = 250;
var velMul = 0.5;
var mutationRate = 0.01;
var crossoverRate = 0.7;
var selection = 'matingPool';

function myFunction() {
  initialPop = document.getElementById("populationId").value;

  mutationRate = document.getElementById("mutationRateId").value;

  lifespan = document.getElementById("lifespanId").value;

  selection = document.getElementById("selectionId").value;

  crossoverRate = document.getElementById("crossoverRateId").value;

  population = new Population(initialPop, mutationRate);
  count = 0;
}


function setup() {
  createCanvas(400, 300);
  population = new Population(initialPop, mutationRate);
  lifeP = createP();
  target = createVector(width / 2, 50);
  document.getElementById("populationId").value = initialPop;
  document.getElementById("lifespanId").value = lifespan;
  document.getElementById("mutationRateId").value = mutationRate;
  document.getElementById("crossoverRateId").value = crossoverRate;
  document.getElementById("selectionId").value = selection;
}

function draw() {
  background(0);
  population.run();
  lifeP.html(count);

  count++;
  if (count == lifespan) {
    population.evaluate();
    if (selection === 'matingPool') {
      population.selection();
    } else if (selection === 'roleta') {
      population.rouletteSelection(crossoverRate);
    }
    count = 0;
  }
  fill(255);
  rect(rx, ry, rw, rh);
  ellipse(target.x, target.y, 16, 16);

  // Adjust location if being dragged
  if (targetDragging) {
    target.x = mouseX + offsetX;
    target.y = mouseY + offsetY;
  }
}

function mousePressed() {
  if (mouseX > target.x - 16 && mouseX < target.x + 16 && mouseY > target.y - 16 && mouseY < target.y + 16) {
    targetDragging = true;
    // If so, keep track of relative location of click to corner of rectangle
    offsetX = target.x - mouseX;
    offsetY = target.y - mouseY;
  }
}

function mouseReleased() {
  // Quit dragging
  targetDragging = false;
}