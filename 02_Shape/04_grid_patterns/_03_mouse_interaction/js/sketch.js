'use strict';

let tileNumber = 25;
let tileSize;
let aor;

function setup() {
  createCanvas(750, 750);
  angleMode(DEGREES);
  colorMode(HSB,360,100,100,100);
  rectMode(CENTER);
  ellipseMode(CENTER);
  strokeCap(ROUND);
  // noLoop();
}

function draw() {
  background(0,0,95,100);
  randomSeed(1);

  tileSize = width / tileNumber;
  let sw1 = map(mouseX,0,width,0,20);
  let sw2 = map(mouseY,0,width,0,20);

  for(let x = 0; x<=width; x+=tileSize){
    for(let y = 0; y<=height; y+=tileSize){

      let size = tileSize;

      push();
      translate(x+size/2,y+size/2);
      let r = floor(random(0,2));
      if(r === 0){
        rotate(90);
        stroke(0);
        strokeWeight(sw1);
        line(-size/2,0,size/2,0);
      }else {
        stroke(15,100,75,100);
        strokeWeight(sw2);
        line(-size/2,0,size/2,0);
      }
      pop();
    }
  }
}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  if (key == '1') strokeCap(ROUND);
  if (key == '2') strokeCap(PROJECT);
  if (key == '3') strokeCap(SQUARE);
}
