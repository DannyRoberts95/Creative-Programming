let w;
let h;

let tileSize;
let padding;
let colNum;
let rowNum;
let canvasPadding;

let alphaValue;
let circleCount;
let endSize;
let endOffset;
//vars to store the HSB values for the background
let bgH,bgS,bgB,bgA;

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

let g;

function setup() {

  tileSize = 50;
  //padding is now a related to the tile size
  padding = -tileSize/10;
  canvasPadding = (tileSize + padding) * 2;
  colNum = 10;
  rowNum = 10;

  randomValSum = 0;
  ranSeed = 1;

  alphaValue = 75;
  strokeAlphaValue = alphaValue;
  strokeThickness = 1;

  //assign the background color vals
  bgH = 255;
  bgS = 75;
  bgB = 25;
  bgA = 100;

  createCanvas((colNum * (tileSize + padding)) + (canvasPadding * 2), (rowNum * (tileSize + padding)) + (canvasPadding * 2));
  console.log(width, height);
  colorMode(HSB, 360, 100, 100, 100);
  smooth();
  cursor(CROSS);
  ellipseMode(CENTER);
  rectMode(CENTER);
  populateColorArrays();

  g = new Grid(tileSize, padding, colNum, rowNum, canvasPadding);
  g.updateGrid();

}


function draw() {

  randomSeed(ranSeed);
  background(bgH,bgS,bgB,bgA);


  randomInc = map(mouseX, 0, width, 0, 5);
  randomInc = constrain(randomInc, 0, 5);
  damping = map(mouseY, 0, height, 0, 1);
  damping = constrain(damping, 0, 1);

  if (displayInfo) {
    displayVars(100, 8);
  }
  updateGridValues();
  renderGrids();

}//END OF DRAW

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

      let renderSize = abs(randomVal * damping) / 2 + tileSize;
      circleCount = 15;
      endSize = 0;
      //move the offset 3/4 of the way from the centerpoint
      endOffset = renderSize;

      push();
      noFill();
      strokeWeight(strokeThickness);
      translate(x + (randomVal * damping), y + (randomVal2 * damping));
      rotate(random(radians(-randomVal, randomVal)));
      for (let iii = 0; iii < circleCount; iii++) {
        let lerpAmount2 = map(iii, 0, circleCount, 0, 1);

        let col3 = interCol;
        //the hardcoded color of the center point and the color that will be lerped to from the intercol calculated earlier
        let col4 = color(49, 80, 83);
        let interCol2 = lerpColor(col3, col4, lerpAmount2);

        var diameter = map(iii, 0, circleCount, renderSize, endSize);
        var offset = map(iii, 0, circleCount, 0, endOffset);
        stroke(interCol2, alphaValue);

        // use the background color values to alphafill the first circle of each module
        if (iii === 0) fill(color(bgH,bgS,bgB,50));
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

    //colors are now hard coded
    let hVal = 195;
    let sVal = 55;
    let bVal = 64;
    colorsLeft[i] = color(hVal, sVal, bVal, alphaValue);

    let hVal2 = 18;
    let sVal2 = 75;
    let bVal2 = 85;
    colorsRight[i] = color(hVal2, sVal2, bVal2, alphaValue);

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
  else if (key == 's' || key == 'S') saveCanvas(`mk16_W:${width}_H:${height}`)

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
