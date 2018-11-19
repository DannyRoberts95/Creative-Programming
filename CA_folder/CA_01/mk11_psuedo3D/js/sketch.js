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

let ranSeed;

//added user controlled booleans to control rotation and base grid display
let rotation = false;
let baseGrid = false;

function setup() {

  tileSize = 30;
  padding = 2.5;
  canvasPadding = (tileSize + padding) * 10;
  colNum = 22;
  rowNum = 12;
  randomInc = 0;
  fragmentationThreshold = 55;
  randomValSum = 0;
  damping = 0;
  alphaValue = 50;
  //variable added to control stroke alpha
  strokeAlphaValue = alphaValue / 2;

  ranSeed = 1;

  createCanvas((colNum * (tileSize + padding)) + (canvasPadding * 2), (rowNum * (tileSize + padding)) + (canvasPadding * 2));
  colorMode(HSB, 360, 100, 100, 100);
  cursor(CROSS);
  populateColorArrays();

}


function draw() {

  frameRate(10);
  //random inc range is increased from 2 to 5
  randomInc = map(mouseX, 0, width, 0, 5);
  randomInc = constrain(randomInc, 0, 5);
  damping = map(mouseY, 0, height, 0, 1);
  damping = constrain(damping, 0, 1);

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
    randomValSum += (randomInc * i);
    //the distortion is now added when the tile is rendered and only one grid is stored
    coOrds[i] = [];
    for (let ii = 0; ii < rowNum; ii++) {
      let randomVal = random(-randomValSum, randomValSum);
      let randomVal2 = random(-randomValSum, randomValSum);
      let z = randomValSum;
      let x = canvasPadding + (tileSize / 2) + (i * (tileSize + padding));
      let y = canvasPadding + (tileSize / 2) + (ii * (tileSize + padding));
      coOrds[i][ii] = createVector(x, y, z);
    }
  }
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
      if (baseGrid) {
        let baseX = coOrds[i][ii].x;
        let baseY = coOrds[i][ii].y;
        push();
        noFill();
        stroke(100, strokeAlphaValue);
        strokeWeight(1);
        translate(baseX, baseY);
        rect(0, 0, tileSize, tileSize);
        pop();
      }

      //RENDER THE DISTORTED GRID
      let lerpAmount = map(i, 0, colNum, 0, 1);
      let col1 = colorsLeft[ii];
      let col2 = colorsRight[ii];
      let interCol = lerpColor(col1, col2, lerpAmount);

      let x = coOrds[i][ii].x;
      let y = coOrds[i][ii].y;
      let z = coOrds[i][ii].z;

      let randomVal = random(-z, z);
      let randomVal2 = random(-z, z);
      let randomVal3 = random(-z, z);
      let randomVal4 = random(-z, z);

      //the render size of a tile is a product of its offset/4 and the tileSize
      let renderSize = (randomVal * damping) / 2 + tileSize;
      // constrains the output between tilesize and tileSize*4
      renderSize = constrain(renderSize, tileSize, tileSize * 4);

      if ((randomVal + randomVal2 + randomVal3 + randomVal4) / 4 > fragmentationThreshold) {
        let fragDamping = damping * .75;
        fill(interCol, alphaValue);
        stroke(100, strokeAlphaValue);
        strokeWeight(1);

        push();
        //distortion (randomVal*fragDamping) is added in the translate, and rect is rendered at 0,0
        translate((x - renderSize / 4) + (randomVal * fragDamping), (y - renderSize / 4) + (randomVal4 * fragDamping));
        //based on the rotation boolean rotate, or don't (for each fragment)...
        if (rotation) {
          rotate(random(radians(randomVal, randomVal4)));
        }
        rect(0, 0, renderSize / 2, renderSize / 2);
        pop();

        push();
        translate((x - renderSize / 4) + (randomVal2 * fragDamping), (y + renderSize / 4) + (randomVal3 * fragDamping));
        if (rotation) {
          rotate(random(radians(randomVal2, randomVal3)));
        }
        rect(0, 0, renderSize / 2, renderSize / 2);
        pop();

        push();
        translate((x + renderSize / 4) + (randomVal3 * fragDamping), (y - renderSize / 4) + (randomVal2 * fragDamping));
        if (rotation) {
          rotate(random(radians(randomVal3, randomVal2)));
        }
        rect(0, 0, renderSize / 2, renderSize / 2);
        pop();

        push();
        translate((x + renderSize / 4) + (randomVal4 * fragDamping), (y + renderSize / 4) + (randomVal * fragDamping));
        if (rotation) {
          rotate(random(radians(randomVal4, randomVal)));
        }
        rect(0, 0, renderSize / 2, renderSize / 2);
        pop();

      } else {
        push();
        fill(interCol);
        stroke(100, strokeAlphaValue);
        strokeWeight(1);
        translate(x + (randomVal * damping), y + (randomVal2 * damping));
        if (rotation) {
          rotate(random(radians(-z, z)));
        }
        rect(0, 0, renderSize, renderSize);
        pop();
      }
    }
  }
}

//----------------------------------------------------------------------------------------------------------------------------------------
//FUNCTIONS
//----------------------------------------------------------------------------------------------------------------------------------------
function populateColorArrays() {
  //populate the righthand colors
  for (let i = 0; i < colNum; i++) {
    //modulus tick tock for generating righthand colors
    if (i % 2 == 0) {
      let hVal = int(random(15, 45));
      let sVal = int(random(75, 100));
      let bVal = 100;
      colorsRight[i] = color(hVal, sVal, bVal,alphaValue);
    } else {
      let hVal = int(random(195, 225));
      let sVal = 50;
      let bVal = int(random(45, 75));
      colorsRight[i] = color(hVal, sVal, bVal,alphaValue);
    }
    //populate the lefthand colors with black
    if (i % 2 == 0) {
      let hVal = 0;
      let sVal = 0;
      let bVal = 95;
      colorsLeft[i] = color(hVal, sVal, bVal, alphaValue);
    } else {
      let hVal = 0;
      let sVal = 0;
      let bVal = 5;
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
  pop();
}

function mousePressed() {
  ranSeed++;
  populateColorArrays();
}

function keyReleased() {
  if (key == 'q' || key == 'Q') noLoop()
  else if (key == 's' || key == 'S') saveCanvas(`mk11_W:${width}_H:${height}`)
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
  }

}
