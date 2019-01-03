let w;
let h;

let tileSize;
let padding;
let colNum;
let rowNum;
let canvasPadding;
let alphaValue;
let strokeCol;
let circleCount;
let endSize;
let endOffset;

let randomInc;
let randomValSum;
let damping;
let fragmentationThreshold;
let ranSeed;

let coOrds = [];
let colorsLeft = [];
let colorsRight = [];

let rotation = true;
let baseGrid = false;
let stroked = true;
let displayInfo = true;


function setup() {

  tileSize = 30;
  padding = 5;
  canvasPadding = (tileSize + padding) * 5;
  colNum = 10;
  rowNum = 10;
  damping = 0;

  randomInc = 0;
  randomValSum = 0;
  ranSeed = 1;

  alphaValue =  75;
  strokeAlphaValue = alphaValue;
  strokeCol = 100;
  strokeThickness = 0.25;


  createCanvas((colNum * (tileSize + padding)) + (canvasPadding * 2), (rowNum * (tileSize + padding)) + (canvasPadding * 2));
  console.log(width, height);
  colorMode(HSB, 360, 100, 100, 100);
  smooth();
  cursor(CROSS);
  ellipseMode(CENTER);
  rectMode(CENTER);
  // Blend colour with SCREEN when greater than 50% gray, MULTIPLY when lower.
  blendMode(HARD_LIGHT);
  populateColorArrays();

}


function draw() {

  randomSeed(ranSeed);
  background(0);
  // frameRate(5);

  randomInc = map(mouseX, 0, width, 0, 5);
  randomInc = constrain(randomInc, 0, 5);
  damping = map(mouseY, 0, height, 0, 1);
  damping = constrain(damping, 0, 1);

  if (displayInfo) {
    displayVars(100, 8);
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
    coOrds[i] = [];
    for (let ii = 0; ii < rowNum; ii++) {
      let randomVal = random(-randomValSum, randomValSum);
      let randomVal2 = random(-randomValSum, randomValSum);
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
        stroke(strokeCol, strokeAlphaValue / 2);
        strokeWeight(strokeThickness);
        translate(baseX, baseY);
        noFill();
        ellipse(0, 0, tileSize, tileSize);
        pop();
      }
    }
  }

  for (let i = 0; i < colNum; i++) {
    for (let ii = 0; ii < rowNum; ii++) {

      let lerpAmount = map(i, 0, colNum, 0, 1);
      let col1 = colorsLeft[ii];
      let col2 = colorsRight[ii];
      let interCol = lerpColor(col1, col2, lerpAmount);

      let x = coOrds[i][ii].x;
      let y = coOrds[i][ii].y;
      let z = coOrds[i][ii].z;

      let randomVal = random(-z, z);
      let randomVal2 = random(-z, z);

      //render is set as the absolute value (magnitude of a number, which is always positive) of the offset and tileSize
      let renderSize = abs(randomVal * damping) / 2 + tileSize;
      circleCount = int(map(i, 0, colNum, 5, 15));
      endSize = 5;
      endOffset = (renderSize / 2);

      push();
      noFill();
      strokeWeight(strokeThickness);
      translate(x + (randomVal * damping), y + (randomVal2 * damping));
      rotate(random(radians(-randomVal, randomVal)));
      for (let iii = 0; iii < circleCount; iii++) {
        var diameter = map(iii, 0, circleCount, renderSize, endSize);
        var offset = map(iii, 0, circleCount, 0, endOffset);
        stroke(interCol, alphaValue);
        if (iii === 0) fill(0, 30);
        ellipse(offset, 0, diameter, diameter);
      }
      pop();
    }
  }
}


//----------------------------------------------------------------------------------------------------------------------------------------
//POPULATE COLOR ARRAYS
//----------------------------------------------------------------------------------------------------------------------------------------

function populateColorArrays() {
  for (let i = 0; i < colNum; i++) {

    let hVal = 0;
    let sVal = 0;
    let bVal = 100;
    colorsLeft[i] = color(hVal, sVal, bVal, alphaValue);

    if (i % 2 == 0) {
      let hVal = int(random(-15, 45));
      let sVal = 100;
      let bVal = 70;
      colorsRight[i] = color(hVal, sVal, bVal, alphaValue);
    } else {
      let hVal = int(random(45, 75));
      let sVal = 100;
      let bVal = 90;
      colorsRight[i] = color(hVal, sVal, bVal, alphaValue);
    }
  }
}

//----------------------------------------------------------------------------------------------------------------------------------------
//DISPLAY VARIABLES
//----------------------------------------------------------------------------------------------------------------------------------------

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
  text(`R-SEED // ${ranSeed}`, lineHeight, lineHeight * 7);
  text(`ALPHA // ${alphaValue}`, lineHeight, lineHeight * 8);
  pop();
}


//----------------------------------------------------------------------------------------------------------------------------------------
//KEY / MOUSE PRESSED FUNCTIONS
//----------------------------------------------------------------------------------------------------------------------------------------
function mousePressed() {
  ranSeed++;
  populateColorArrays();
}

function keyReleased() {
  if (key == 'q' || key == 'Q') noLoop()
  else if (key == 's' || key == 'S') saveCanvas(`mk15_W:${width}_H:${height}`)

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
