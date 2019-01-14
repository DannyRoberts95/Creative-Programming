'use strict';

let tileNumber = 50;
let tileSize;

function setup() {
  createCanvas(750, 750);
  angleMode(DEGREES);
  colorMode(HSB,360,100,100,100);
  frameRate(5);

  rectMode(CENTER);
  ellipseMode(CENTER);

  noLoop();

  tileSize = width / tileNumber;
}

function draw() {
  background(45,100,75,100);

  for(let x = 0; x<=width; x+=tileSize){
    for(let y = 0; y<=height; y+=tileSize){

      let size = tileSize;

      push();
      translate(x-size/2,y-size/2);
      rotate(random(-45,45));
      stroke(45,100,75,100);
      strokeWeight(1);
      fill(random(270,360),100,50,random(25,100));
      ellipse(0,0,size,size);
      pop();

    }
  }
}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
}
