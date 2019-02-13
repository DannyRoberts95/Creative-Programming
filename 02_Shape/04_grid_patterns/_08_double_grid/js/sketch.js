'use strict';

//how many tiles will be displayed
let tileNumber = 30;
let tileSize;
let img;

let radSmall = 5;
let radBig = 10;

let col1, col2, backgroundColor;

let rSeed = 1;

function setup() {
  createCanvas(windowHeight , windowHeight);
  colorMode(HSB,360,100,100,100);
  angleMode(DEGREES);
  rectMode(CENTER);
  imageMode(CENTER);
  randomSeed(rSeed);
  col1 = color(230,100,75,100);
  col2 = color(35,100,95,100);
  backgroundColor = col2;
  tileSize = width/tileNumber;
  radSmall= tileSize*0.25;
  radBig = tileSize*0.5;
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
      push();
      translate(x+(tileSize/2),y+(tileSize/2));
      fill(col1);
      noStroke();
      ellipse(0,0,radBig*2,radBig*2);
      pop();
    }
  }

  for(let i = 0; i<tileNumber; i++){
    for(let ii = 0; ii < tileNumber; ii++){
      let x = tileSize*ii;
      let y = tileSize*i;
      push();
      translate(x+(tileSize/2),y+(tileSize/2));
      fill(col2);
      noStroke();
      ellipse(0,0,radSmall*2,radSmall*2);
      pop();
    }
  }
}
