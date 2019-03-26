'use strict';

let tileNumber = 50;
let tileSize;
let aor;

let backgroundCol, col1, col2;

let slider;

function setup() {
  createCanvas(windowHeight, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  rectMode(CENTER);
  ellipseMode(CENTER);
  strokeCap(ROUND);
  angleMode(DEGREES);

  slider = createSlider(1,5,50);
  slider.position(width+50,10);
  console.log(slider);

  backgroundCol = color(360);
  col1 = color(15,75,100,100);
  col2 = color(85,100,90,100);
}

function draw() {
  background(backgroundCol);
  randomSeed(1);

  tileSize = width/tileNumber;
  let sWidth = 5;

  for (let x = 0; x <= width; x += tileSize) {
    for (let y = 0; y <= height; y += tileSize) {


      let posX = x ;
      let posY = y ;

      let angle = atan2(mouseY-posY,mouseX-posX);
      let d = dist(mouseX,mouseY,posX, posY);
      let size = map(d,0,width/2,tileSize*2,2);
      size = constrain(size,2,tileSize);
      angle = atan2(mouseY-posY,mouseX-posX);

      push();
      translate(posX, posY);
      rotate(angle);
      stroke(360);
      fill(col1);
      rect(0,0,size,size);
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

function mousePressed(){

}
