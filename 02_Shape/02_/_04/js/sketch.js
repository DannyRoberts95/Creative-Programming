'use strict';

let tileNumber = 30;
let tileSize;
let aor;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  rectMode(CENTER);
  ellipseMode(CENTER);
  strokeCap(ROUND);
  // noLoop();
}

function draw() {
  background(45, 100, 75, 100);
  randomSeed(1);

  tileSize = width / tileNumber;
  let sWidth = 5;

  for (let x = 0; x <= width; x += tileSize) {

    for (let y = 0; y <= height; y += tileSize) {

      let size = tileSize/2;
      let posX = x ;
      let posY = y ;

      let angle = atan2(mouseX-posX, mouseY-posY);

      push();
      translate(posX, posY);
      rotate(angle);
      stroke(0);
      strokeWeight(sWidth);
      line(0, 0, size,size);
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
