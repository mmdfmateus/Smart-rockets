function Target(posx, posy) {
    this.pos = createVector(posx, posy);

    this.draw = function(){
        fill(0,0,144);
        ellipse(this.pos.x, this.pos.y, 20);
        noStroke();
        fill(255, 0, 0);
        ellipse(this.pos.x, this.pos.y, 10);
        fill(255);
    }
}