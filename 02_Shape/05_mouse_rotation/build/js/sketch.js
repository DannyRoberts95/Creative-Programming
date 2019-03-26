"use strict";

let tileNumber = 50;
let tileSize;
let aor;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  rectMode(CENTER);
  ellipseMode(CENTER);
  strokeCap(ROUND);
  angleMode(DEGREES);
}

function draw() {
  background(100);
  randomSeed(1);

  tileSize = width / tileNumber;
  let sWidth = 5;

  for (let x = tileSize; x <= width; x += tileSize) {
    for (let y = tileSize; y <= height; y += tileSize) {
      let size = tileSize / 2;
      let posX = x;
      let posY = y;
      let angle = atan2(mouseY - posY, mouseX - posX);

      push();
      translate(posX, posY);
      rotate(angle);
      let h = map(dist(x, y, mouseX, mouseY), 0, width, 250, 320);
      stroke(h, 100, 100, 100);
      strokeWeight(sWidth);
      line(-0, -0, size, size);
      pop();
    }
  }
}

function keyPressed() {
  if (key == "s" || key == "S") saveCanvas(gd.timestamp(), "png");
  if (key == "1") strokeCap(ROUND);
  if (key == "2") strokeCap(PROJECT);
  if (key == "3") strokeCap(SQUARE);
}
