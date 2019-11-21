function Target(posx, posy) {
    this.pos = createVector(posx, posy);
    this.radius = 40

    this.draw = function(){
        fill(0,0,144);
        ellipse(this.pos.x, this.pos.y, this.radius);
        noStroke();
        fill(255, 0, 0);
        ellipse(this.pos.x, this.pos.y, this.radius/2);
        
        fill(255);
    }
}