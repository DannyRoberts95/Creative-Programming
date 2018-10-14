'use strict';

let w = 750;
let h = 750;

function setup(){
    createCanvas(w,h);
    smooth();
    colorMode(HSB,360,w,h);
    noStroke();
}

function draw(){
    let stepNumber = 360;
    let angInc = 360/stepNumber;
    let radius = 250;

    push();
    translate(width/2,height/2);
    beginShape(TRIANGLE_FAN);
    vertex(0,0);

    for(let angle = 0; angle<=360; angle += angInc){
      let vx = radius * cos(radians(angle));
      let vy = radius * sin(radians(angle));
      fill(angle,mouseX,mouseY);
      vertex(vx,vy);

    }
    endShape();
    pop();
}
