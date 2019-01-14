'use strict';

let tileNumber = 10;
let tileSize;

function setup() {
  createCanvas(500, 500);
  noLoop();

  tileSize = width / tileNumber;

  for(let i = 0; i<tileNumber; i++){
    for(let ii = 0; ii < tileNumber; ii++){
      let x = tileSize*ii-(tileSize/2);
      let y = tileSize*i-(tileSize/2);
      fill(0);
      ellipse(x,y,tileSize,tileSize);
    }
  }
}

function draw() {

}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
}
