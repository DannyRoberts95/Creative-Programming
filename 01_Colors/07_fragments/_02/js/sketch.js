'use strict'

let colorCount = 60;

let hueVals = [];
let satVals = [];
let brightVals = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100);
  noStroke();
  randomSeed(0);
}


function draw() {
  noLoop();

  for (let i = 0; i < colorCount; i++) {
    if (i % 2 === 0) {
      hueVals[i] = int(random(180, 360));
      satVals[i] = 100;
      brightVals[i] = int(random(25, 75));
    } else {
      hueVals[i] = int(random(0, 180));
      satVals[i] = 100;
      brightVals[i] = int(random(50, 100));
    }
  }

  let counter = 0;
  let rowCount = 1;
  let rowHeight = width/rowCount;

  //for every row...
  for(let i = 0; i<rowCount; i++){
    let fragmentNumber = 5;
    let fragmentWidths = []
    for(let ii = 0; ii<fragmentNumber; ii++){
      fragmentWidths[i] = random(50,200);
    }


  }


}
