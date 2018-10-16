'use strict'

let colorCount = 100;

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
  let rowCount = int(random(5,50));
  let rowHeight = width / rowCount;

  //for every row...
  for (let i = 0; i < rowCount; i++) {
    let fragmentNumber = i+1;
    let fragmentWidths = []
    let widthSum = 0;

    //generate the random values which correspond to width
    for (let ii = 0; ii < fragmentNumber; ii++) {
      fragmentWidths[ii] = random(50, 200);
      widthSum += fragmentWidths[ii];
    }
    //scale the random values to fill the width of the window
    for (let ii = 0; ii < fragmentNumber; ii++) {
      let scaledWidth = (fragmentWidths[ii] / widthSum) * width;
      fragmentWidths[ii] = scaledWidth;
    }
    //draw the fragments..

    //store the X pos for each fragment
    let fragXpos = 0;
    for (let ii = 0; ii < fragmentNumber; ii++) {
      let index = counter % colorCount;
      let col = color(hueVals[index], satVals[index], brightVals[index]);

      let x = fragXpos;
      let y = i * rowHeight;
      //use the fragment width stored in the array
      let w = fragmentWidths[ii];
      let h = rowHeight;

      fill(col);
      rect(x, y, w, h);
      //increment the fragXpos var for the next fragment
      fragXpos += fragmentWidths[ii];
      //increment the counter
      counter ++;
    }
  }
}
