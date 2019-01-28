'use strict';

let tileNumber = 15;
let tileSize;
let aor;
let shapes;

function preload(){
  shapes = [];
  shapes.push(loadImage(`data/data.svg`));
}

function setup() {
  createCanvas(900, 900);
  colorMode(HSB, 360, 100, 100, 100);
  rectMode(CENTER);
  ellipseMode(CENTER);
  strokeCap(ROUND);
  angleMode(DEGREES);
  noCursor();
}

function draw() {
  background(0,0,100,100);
  randomSeed(1);

  tileSize = width/tileNumber;
  let sWidth = 5;

  for (let x = 0; x <= width; x += tileSize) {
    for (let y = 0; y <= height; y += tileSize) {
      let size = tileSize/2;
      let posX = x ;
      let posY = y ;
      let angle = atan2(mouseY-posY,mouseX-posX)-90;
      let d = dist(posX,posY,mouseX,mouseY);
      let renderSize = map(d,0,width,tileSize,tileSize*4);

      push();
      translate(posX, posY);
      rotate(angle);
      // stroke(random(270,360),100,50,random(25,100));
      // strokeWeight(sWidth);
      // line(-0,-0, size,size);
      // tint(0,0,0,25);
      imageMode(CENTER);

      image(shapes[0],0,0,renderSize,renderSize);
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
