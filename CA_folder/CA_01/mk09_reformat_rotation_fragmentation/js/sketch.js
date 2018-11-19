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

function setup() {

  tileSize = 30;
  padding = 5;
  canvasPadding = (tileSize + padding) * 7;
  colNum = 28;
  rowNum = 14;
  randomInc = 0;
  fragmentationThreshold = 25;
  randomValSum = 0;
  damping = 0;
  alphaValue = 50;

  createCanvas((colNum * (tileSize + padding)) + (canvasPadding * 2), (rowNum * (tileSize + padding)) + (canvasPadding * 2));
  colorMode(HSB, 360, 100, 100, 100);
  noCursor();

  populateColorArrays();
}


function draw() {

  frameRate(10);
  randomInc = map(mouseX, 0, width, 0, 1);
  randomInc = constrain(randomInc, 0, 1);
  damping = map(mouseY, 0, height, 0, 1);
  damping = constrain(damping, 0, 1);

  randomSeed(10);
  background(0);
  rectMode(CENTER);

  displayVars(100, 10);
  trackMouse(100);

  for (let i = 0; i < colNum; i++) {
    randomValSum += (randomInc * i);
    coOrds[i] = [];
    coOrds2[i] = [];
    for (let ii = 0; ii < rowNum; ii++) {
      let randomVal = random(-randomValSum, randomValSum);
      let randomVal2 = random(-randomValSum, randomValSum);
      let z = randomVal;

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

  //RENDER THE GRID
  stroke(100, alphaValue / 2);
  strokeWeight(1);

  for (let i = 0; i < colNum; i++) {
    for (let ii = 0; ii < rowNum; ii++) {
      //RENDER THE BASE GRID
      let x1 = coOrds2[i][ii].x;
      let y1 = coOrds2[i][ii].y;
      push();
      noFill();
      stroke(100, alphaValue / 4);
      strokeWeight(1);
      translate(x1, y1);
      rect(0, 0, tileSize, tileSize);
      pop();

      //RENDER THE SECOND GRID
      let x = coOrds[i][ii].x;
      let y = coOrds[i][ii].y;
      let z = coOrds[i][ii].z;

      //GENERTE THE OFFSET VALUES FOR EACH OF THE FRAGMENTS
      let randomVal = random(-z, z);
      let randomVal2 = random(-z, z);
      let randomVal3 = random(-z, z);
      let randomVal4 = random(-z, z);

      let lerpAmount = map(i, 0, colNum, 0, 1);
      let col1 = colorsLeft[ii];
      let col2 = colorsRight[ii];
      let interCol = lerpColor(col1, col2, lerpAmount);
      fill(interCol);

      //WILL THE TILE BE FRAGMENTED?
      if (z > fragmentationThreshold) {

        //GENERTE THE OFFSET VALUES FOR EACH OF THE FRAGMENTS
        let randomVal = random(-z, z);
        let randomVal2 = random(-z, z);
        let randomVal3 = random(-z, z);
        let randomVal4 = random(-z, z);

        //augment the damping var to be applied to the frgments
        let fragDamping = damping*1.5;

        push();
        translate(x - tileSize / 4, y - tileSize / 4);
        rotate(random(radians(-z, z)));
        rect((randomVal * fragDamping), (randomVal4 * fragDamping), tileSize / 2, tileSize / 2);
        pop();
        push();
        translate(x + tileSize / 4, y + tileSize / 4);
        rotate(random(radians(-z, z)));
        rect((randomVal2 * fragDamping), (randomVal3 * fragDamping), tileSize / 2, tileSize / 2);
        pop();
        push();
        translate(x + tileSize / 4, y - tileSize / 4);
        rotate(random(radians(-z, z)));
        rect((randomVal3 *fragDamping), (randomVal2 * fragDamping), tileSize / 2, tileSize / 2);
        pop();
        push();
        translate(x - tileSize / 4, y + tileSize / 4);
        rotate(random(radians(-z, z)));
        rect((randomVal4 * fragDamping), (randomVal * fragDamping), tileSize / 2, tileSize / 2);
        pop();
      } else {
        push();
        translate(x, y);
        rotate(random(radians(-z, z)));
        rect(0, 0, tileSize, tileSize);
        pop();
      }
    }
  }
} //END OF DRAW


//GENERATE THE COLORS
function populateColorArrays() {
  //populate the righthand colors
  for (let i = 0; i < colNum; i++) {
    //modulus tick tock for generating righthand colors
    if (i % 2 == 0) {
      let hVal = int(random(360));
      let sVal = 100;
      let bVal = 100;
      colorsRight[i] = color(hVal, sVal, bVal, alphaValue);
    } else if (i % 3 == 0) {
      let hVal = int(random(360));
      let sVal = 75;
      let bVal = int(random(75, 100));
      colorsRight[i] = color(hVal, sVal, bVal, alphaValue);
    } else {
      let hVal = int(random(360));
      let sVal = 50;
      let bVal = int(random(50, 100));
      colorsRight[i] = color(hVal, sVal, bVal, alphaValue);
    }
  }
  //populate the lefthand colors with black & white
  for (let i = 0; i < colNum; i++) {
    if (i % 2 == 0) {
      let hVal = 0;
      let sVal = 0;
      let bVal = 20;
      colorsLeft[i] = color(hVal, sVal, bVal, alphaValue);
    } else {
      let hVal = 0;
      let sVal = 0;
      let bVal = 80;
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
  pop();
}

function trackMouse(col) {
  stroke(col);
  strokeWeight(1);
  line(0, mouseY, width, mouseY);
  line(mouseX, 0, mouseX, height);
}

function mousePressed() {
  populateColorArrays();
  clear();
  loop();
}

function keyReleased() {
  if (key == 'q' || key == 'Q') noLoop();
  else if (key == 's' || key == 'S') saveCanvas(`mk9_W:${width}_H:${height}`);

}
