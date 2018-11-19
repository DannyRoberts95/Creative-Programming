let w;
let h;

let tileSize;
let padding;
let colNum;
let rowNum;
let canvasPadding;

let randomInc;
let randomValSum;
let damping;
let fragmentationThreshold;

let coOrds = [];
let colorsLeft = [];
let colorsRight = [];
let alphaValue;
let strokeCol;

let ranSeed;

let rotation = false;
let baseGrid = false;
let stroked = false;
let displayInfo = true;


function setup() {

  tileSize = 40;
  padding = 2;
  canvasPadding = (tileSize + padding) * 5;
  colNum = 22;
  rowNum = 12;
  randomInc = 0;
  fragmentationThreshold = 55;
  randomValSum = 0;
  damping = 0;

  alphaValue = 80;

  strokeAlphaValue = alphaValue;
  strokeCol = 100;
  strokeThickness = 1.5;
  ranSeed = 1;

  createCanvas((colNum * (tileSize + padding)) + (canvasPadding * 2), (rowNum * (tileSize + padding)) + (canvasPadding * 2));
  colorMode(HSB, 360, 100, 100, 100);
  cursor(CROSS);
  ellipseMode(CENTER);
  rectMode(CENTER);
  populateColorArrays();

}


function draw() {
  noStroke();

  frameRate(10);
  //random inc range is decreased
  randomInc = map(mouseX, 0, width, 0, 2.5);
  randomInc = constrain(randomInc, 0, 2.5);
  damping = map(mouseY, 0, height, 0, 1);
  damping = constrain(damping, 0, 1);

  randomSeed(ranSeed);
  background(100);

  if (displayInfo) {
    displayVars(0, 8);
  }

  updateGridValues();
  renderGrids();
} //END OF DRAW

//----------------------------------------------------------------------------------------------------------------------------------------
//GENERATE VALUES FOR THE GRID
//----------------------------------------------------------------------------------------------------------------------------------------
function updateGridValues() {
  for (let i = 0; i < colNum; i++) {
    randomValSum += (randomInc * i);
    //the distortion is now added in the render and only one grid is stored
    coOrds[i] = [];
    for (let ii = 0; ii < rowNum; ii++) {
      let randomVal = random(-randomValSum, randomValSum);
      let randomVal2 = random(-randomValSum, randomValSum);

      //STORE VALUES
      let x = canvasPadding + (tileSize / 2) + (i * (tileSize + padding));
      let y = canvasPadding + (tileSize / 2) + (ii * (tileSize + padding));
      let z = randomValSum;

      coOrds[i][ii] = createVector(x, y, z);
    }
  }
  randomValSum *= 0;
}

//----------------------------------------------------------------------------------------------------------------------------------------
//RENDER THE GRID
//----------------------------------------------------------------------------------------------------------------------------------------
function renderGrids() {
  for (let i = 0; i < colNum; i++) {
    for (let ii = 0; ii < rowNum; ii++) {

      //RENDER THE DISTORTED GRID
      let lerpAmount = map(i, 0, colNum, 0, 1);
      let col1 = colorsLeft[ii];
      let col2 = colorsRight[ii];
      let interCol = lerpColor(col1, col2, lerpAmount);

      let x = coOrds[i][ii].x;
      let y = coOrds[i][ii].y;
      let z = coOrds[i][ii].z;

      //reduced the number of random values to 2 instead of four
      let randomVal = random(-z, z);
      let randomVal2 = random(-z, z);

      let renderSize = (randomVal * damping) / 4 + tileSize;
      renderSize = constrain(renderSize, tileSize, tileSize * 4);

      push();
      fill(interCol);
      if (stroked) {
        stroke(strokeCol, strokeAlphaValue);
        strokeWeight(strokeThickness);
      } else noStroke();
      translate(x + (randomVal * damping), y + (randomVal2 * damping));
      if (rotation) rotate(random(radians(-randomVal, randomVal)));
      ellipse(0, 0, renderSize, renderSize);
      pop();
    }
  }

  if (baseGrid) {
    for (let i = 0; i < colNum; i++) {
      for (let ii = 0; ii < rowNum; ii++) {
        let lerpAmount = map(i, 0, colNum, 0, 1);
        let col1 = colorsLeft[ii];
        let col2 = colorsRight[ii];
        let interCol = lerpColor(col2, col1, lerpAmount);
        let baseX = coOrds[i][ii].x;
        let baseY = coOrds[i][ii].y;
        push();
        fill(interCol);
        fill(100);

        if (stroked) {
          stroke(strokeCol, strokeAlphaValue);
          strokeWeight(strokeThickness);
        }
        translate(baseX, baseY);
        ellipse(0, 0, tileSize / 2, tileSize / 2);
        pop();

      }
    }
  }
}




//----------------------------------------------------------------------------------------------------------------------------------------
//FUNCTIONS
//----------------------------------------------------------------------------------------------------------------------------------------
function populateColorArrays() {
  for (let i = 0; i < colNum; i++) {
    if (i % 2 == 0) {
      let hVal = int(random(195, 285));
      let sVal = 100;
      let bVal = 5;
      colorsRight[i] = color(hVal, sVal, bVal, alphaValue);
    } else {
      let hVal = int(random(225, 255));
      let sVal = 35;
      let bVal = int(random(50, 80));
      colorsRight[i] = color(hVal, sVal, bVal, alphaValue);
    }

    if (i % 2 == 0) {
      let hVal = int(random(195, 285));
      let sVal = 35;
      let bVal = int(random(50, 80));
      colorsLeft[i] = color(hVal, sVal, bVal, alphaValue);
    } else {
      let hVal = int(random(225, 255));
      let sVal = 100;
      let bVal = int(random(5, 25));
      colorsLeft[i] = color(hVal, sVal, bVal, alphaValue);
    }
  }
}

function displayVars(col, fontSize) {
  push();
  translate(10, 18);
  fill(col);
  noStroke();
  textSize(fontSize);
  let lineHeight = fontSize * 1.5;
  text(`HIDE INFO " I " `, lineHeight, 0);
  text(`RANDOM INC // ${randomInc}`, lineHeight, lineHeight);
  text(`OFFSET DAMPING // ${damping}`, lineHeight, lineHeight * 2);
  text(`ROWS // ${rowNum}`, lineHeight, lineHeight * 3);
  text(`COLS // ${colNum}`, lineHeight, lineHeight * 4);
  text(`PAD // ${padding}`, lineHeight, lineHeight * 5);
  text(`FRAGTHRESH // ${fragmentationThreshold}`, lineHeight, lineHeight * 6);
  text(`R-SEED // ${ranSeed}`, lineHeight, lineHeight * 7);
  text(`ALPHA // ${alphaValue}`, lineHeight, lineHeight * 8);
  text(`ROT // ${rotation}`, lineHeight, lineHeight * 9);
  text(`BASE // ${baseGrid}`, lineHeight, lineHeight * 10);
  text(`STROKED // ${stroked}`, lineHeight, lineHeight * 11);
  pop();
}

function mousePressed() {
  ranSeed++;
  populateColorArrays();
}

function keyReleased() {
  if (key == 'q' || key == 'Q') noLoop()
  else if (key == 's' || key == 'S') saveCanvas(`mk12_W:${width}_H:${height}`)

  else if (key == 'r' || key == 'R') {
    if (rotation) {
      rotation = false;
    } else {
      rotation = true
    }
  } else if (key == 'b' || key == 'B') {
    if (baseGrid) {
      baseGrid = false;
    } else {
      baseGrid = true
    }
  } else if (key == 'l' || key == 'L') {
    if (stroked) {
      stroked = false;
    } else {
      stroked = true
    }
  } else if (key == 'i' || key == 'I') {
    if (displayInfo) {
      displayInfo = false;
    } else {
      displayInfo = true
    }
  }

}
