'use strict';

let img;
//how many tiles will be displayed
let tileNumber = 15;
let tileSize;

let minModuleRadius = 5;
let maxModuleRadius = 50;
let minStrokeWeight = 1;
let maxStrokeWeight = 5;
let strokeCol, fillColor, backgroundColor;

let rSeed = 1;

function setup() {
  createCanvas(windowHeight , windowHeight);
  colorMode(HSB,360,100,100,100);
  angleMode(DEGREES);
  rectMode(CENTER);
  randomSeed(rSeed);
  strokeCol = color(55,82,91);
  fillColor = color(35,100,95,10);
  backgroundColor = color(15,100,65,100)
  tileSize = width/tileNumber;
  // noLoop();
}

function draw() {
  background(backgroundColor);
  randomSeed(rSeed);

  for(let i = 0; i<tileNumber; i++){
    for(let ii = 0; ii < tileNumber; ii++){
      let x = tileSize*ii;
      let y = tileSize*i;

      let maxOffset = constrain(map(mouseX,0,width,0,100),0,100);
      let xOffset = random(-maxOffset,maxOffset);
      let yOffset = random(-maxOffset,maxOffset);
      x+=xOffset;
      y+=yOffset;
      let r = constrain(map(mouseY,0,width,minModuleRadius,maxModuleRadius),minModuleRadius,maxModuleRadius);

      push();
      translate(x+(tileSize/2),y+(tileSize/2));
      rotate(random(-maxOffset,maxOffset));
      fill(fillColor);
      noFill();
      stroke(strokeCol);
      strokeWeight(minStrokeWeight);
      rect(0,0,r*2,r*2);
      pop();
    }
  }
}
