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
let coOrds2 = [];
let colorsLeft = [];
let colorsRight = [];
let alphaValue;

let ranSeed;

function setup() {

  tileSize = 25;
  padding = 2.5;
  canvasPadding = (tileSize + padding) * 5;
  colNum = 25;
  rowNum = 15;
  randomInc = 0;
  fragmentationThreshold = 25;
  randomValSum = 0;
  damping = 0;
  alphaValue = 90;

  ranSeed = 1;

  createCanvas((colNum * (tileSize + padding)) + (canvasPadding * 2), (rowNum * (tileSize + padding)) + (canvasPadding * 2));
  colorMode(HSB, 360, 100, 100, 100);
  cursor(CROSS);

  populateColorArrays();
}


function draw() {

  frameRate(10);
  randomInc = map(mouseX, 0, width, 0, 2);
  randomInc = constrain(randomInc, 0, 2);
  damping = map(mouseY, 0, height, 0, 2);
  damping = constrain(damping, 0, 2);

  randomSeed(ranSeed);
  background(0);
  rectMode(CENTER);

  displayVars(100, 10);
  updateGridValues();
  renderGrids();


} //END OF DRAW

//----------------------------------------------------------------------------------------------------------------------------------------
//GENERATE VALUES FOR THE GRID
//----------------------------------------------------------------------------------------------------------------------------------------
function updateGridValues() {
  for (let i = 0; i < colNum; i++) {
    //inc the random value based on how far across thr grid the tile is
    randomValSum += (randomInc * i);
    //two arrays to store the distorted and un distorted values
    coOrds[i] = [];
    coOrds2[i] = [];
    for (let ii = 0; ii < rowNum; ii++) {
      let randomVal = random(-randomValSum, randomValSum);
      let randomVal2 = random(-randomValSum, randomValSum);
      let z = randomValSum;
      //STORE VALUES DISTORTED BY THE RANDOMVAL & DAMPING
      let x = canvasPadding + (tileSize / 2) + (i * (tileSize + padding) + (randomVal * damping));
      let y = canvasPadding + (tileSize / 2) + (ii * (tileSize + padding) + (randomVal2 * damping));
      coOrds[i][ii] = createVector(x, y, z);
      //STORE AN UN-DISTORED
      let x2 = canvasPadding + (tileSize / 2) + (i * (tileSize + padding));
      let y2 = canvasPadding + (tileSize / 2) + (ii * (tileSize + padding));
      coOrds2[i][ii] = createVector(x2, y2);
    }
  }
  //RESET THE SUM VALUE EACH DRAW
  randomValSum *= 0;
}

//----------------------------------------------------------------------------------------------------------------------------------------
//RENDER THE GRID
//----------------------------------------------------------------------------------------------------------------------------------------
function renderGrids() {
  noStroke();
  for (let i = 0; i < colNum; i++) {
    for (let ii = 0; ii < rowNum; ii++) {

      //RENDER THE BASE GRID
      let baseX = coOrds2[i][ii].x;
      let baseY = coOrds2[i][ii].y;
      push();
      noFill();
      stroke(100, alphaValue/2);
      strokeWeight(1);
      translate(baseX, baseY);
      rect(0, 0, tileSize, tileSize);
      pop();

      //RENDER THE SECOND GRID
      let lerpAmount = map(i, 0, colNum, 0, 1);
      let col1 = colorsLeft[ii];
      let col2 = colorsRight[ii];
      let interCol = lerpColor(col1, col2, lerpAmount);
      fill(interCol);

      let x = coOrds[i][ii].x;
      let y = coOrds[i][ii].y;
      //get the stored randomValSum for the tile
      let z = coOrds[i][ii].z;

      //GENERTE THE OFFSET VALUES FOR EACH OF THE FRAGMENTS
      let randomVal = random(-z, z);
      let randomVal2 = random(-z, z);
      let randomVal3 = random(-z, z);
      let randomVal4 = random(-z, z);
      //average all the randomVals to check against the fragmentationThreshold
      let avgRandom = (randomVal + randomVal2 + randomVal3 + randomVal4) / 4;

      //fragment the tile?
      if (avgRandom > fragmentationThreshold) {
        let fragDamping = damping * .75;
        push();
        translate((x - tileSize / 4) + (randomVal * fragDamping), (y - tileSize / 4) + (randomVal4 * fragDamping));
        rect(0, 0, tileSize / 2, tileSize / 2);
        pop();
        push();
        translate((x - tileSize / 4) + (randomVal2 * fragDamping), (y + tileSize / 4) + (randomVal3 * fragDamping));
        rect(0, 0, tileSize / 2, tileSize / 2);
        pop();
        push();
        translate((x + tileSize / 4) + (randomVal3 * fragDamping), (y - tileSize / 4) + (randomVal2 * fragDamping));
        rect(0, 0, tileSize / 2, tileSize / 2);
        pop();
        push();
        translate((x + tileSize / 4) + (randomVal4 * fragDamping), (y + tileSize / 4) + (randomVal * fragDamping));
        rect(0, 0, tileSize / 2, tileSize / 2);
        pop();
      } else {

        push();
        stroke(0, alphaValue);
        strokeWeight(1);
        translate(x, y);
        rect(0, 0, tileSize, tileSize);
        pop();
      }
    }
  }
}

function populateColorArrays() {
  //populate the righthand colors
  for (let i = 0; i < colNum; i++) {
    //modulus tick tock for generating righthand colors
    if (i % 2 == 0) {
      let hVal = int(random(15, 45));
      let sVal = int(random(75, 100));
      let bVal = 100;
      colorsRight[i] = color(hVal, sVal, bVal, alphaValue);
    } else {
      let hVal = int(random(195, 225));
      let sVal = 50;
      let bVal = int(random(45, 75));
      colorsRight[i] = color(hVal, sVal, bVal, alphaValue);
    }
    //populate the lefthand colors with black
    if (i % 2 == 0) {
      let hVal = 0;
      let sVal = 0;
      let bVal = 80;
      colorsLeft[i] = color(hVal, sVal, bVal, alphaValue);
    } else {
      let hVal = 0;
      let sVal = 0;
      let bVal = 0;
      colorsLeft[i] = color(hVal, sVal, bVal, 100);
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
  text(`RANDOM INC // ${randomInc}`, lineHeight, lineHeight);
  text(`OFFSET DAMPING // ${damping}`, lineHeight, lineHeight * 2);
  text(`ROWS // ${rowNum}`, lineHeight, lineHeight * 3);
  text(`COLS // ${colNum}`, lineHeight, lineHeight * 4);
  text(`PAD // ${padding}`, lineHeight, lineHeight * 5);
  text(`FRAGTHRESH // ${fragmentationThreshold}`, lineHeight, lineHeight * 6);
  text(`R-SEED // ${ranSeed}`, lineHeight, lineHeight * 7);
  pop();
}

function mousePressed() {
  ranSeed ++;
  populateColorArrays();
}

function keyReleased() {
  if (key == 'q' || key == 'Q') noLoop();
  else if (key == 's' || key == 'S') saveCanvas(`mk10_W:${width}_H:${height}`);

}
