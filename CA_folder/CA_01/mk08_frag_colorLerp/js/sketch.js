let w;
let h;

let tileWidth;
let tileHeight;
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

function setup() {

  tileWidth = 25;
  tileHeight = 25;
  padding = 2.5;
  canvasPadding = (tileWidth + padding) * 5;
  colNum = 25;
  rowNum = 25;
  randomInc = 0;
  fragmentationThreshold = 45;
  randomValSum = 0;
  damping = 0;

  //controls the alpha
  alphaValue = 75;

  createCanvas((colNum * (tileHeight + padding)) + (canvasPadding * 2), (rowNum * (tileWidth + padding)) + (canvasPadding * 2));
  colorMode(HSB, 360, 100, 100, 100);
  cursor(CROSS);

  //populates the color arrays with colors
  populateColorArrays();
}


function draw() {

  frameRate(10);
  randomInc = map(mouseX, 0, width, 0, 1);
  randomInc = constrain(randomInc, 0, 1);
  damping = map(mouseY, 0, height, 0, 1);
  damping = constrain(damping, 0, 1);

  randomSeed(10);
  background(0,alphaValue/2);
  rectMode(CENTER);
  noFill();

  displayVars(100);
  // trackMouse(100);

  //stroke values for the tiles
  stroke(100,alphaValue/2);
  strokeWeight(1.5);

  for (let i = 0; i < colNum; i++) {
    coOrds[i] = [];
    randomValSum += (randomInc * i);
    for (let ii = 0; ii < rowNum; ii++) {
      let randomVal = random(-randomValSum, randomValSum);
      let randomVal2 = random(-randomValSum, randomValSum);
      let x = canvasPadding + (tileWidth / 2) + (i * (tileWidth + padding) + (randomVal * damping));
      let y = canvasPadding + (tileHeight / 2) + (ii * (tileHeight + padding) + (randomVal2 * damping));
      let z = randomVal;
      coOrds[i][ii] = createVector(x, y, z);
    }
  }

  for (let i = 0; i < colNum; i++) {
    randomValSum += (randomInc * i);
    let randomVal = random(-randomValSum, randomValSum);
    let randomVal2 = random(-randomValSum, randomValSum);
    let randomVal3 = random(-randomValSum, randomValSum);
    let randomVal4 = random(-randomValSum, randomValSum);
    for (let ii = 0; ii < rowNum; ii++) {

      let x = coOrds[i][ii].x;
      let y = coOrds[i][ii].y;

      //lerp amount defined by the tiles place in the row
      let lerpAmount = map(i, 0, colNum, 0, 1);
      //the the two colors from the arrays to lerp between
      let col1 = colorsLeft[ii];
      let col2 = colorsRight[ii];
      //lerp them by the lerp amount
      let interCol = lerpColor(col1, col2, lerpAmount);
      //set the intercol as the fill
      fill(interCol);

      if (coOrds[i][ii].z > fragmentationThreshold) {
        push();
        translate(x - tileWidth / 4, y - tileHeight / 4);
        rect((randomVal * damping / 2), (randomVal4 * damping / 2), tileWidth / 2, tileHeight / 2);
        pop();
        push();
        translate(x + tileWidth / 4, y + tileHeight / 4);
        rect((randomVal2 * damping / 2), (randomVal3 * damping / 2), tileWidth / 2, tileHeight / 2);
        pop();
        push();
        translate(x + tileWidth / 4, y - tileHeight / 4);
        rect((randomVal3 * damping / 2), (randomVal2 * damping / 2), tileWidth / 2, tileHeight / 2);
        pop();
        push();
        translate(x - tileWidth / 4, y + tileHeight / 4);
        rect((randomVal4 * damping / 2), (randomVal * damping / 2), tileWidth / 2, tileHeight / 2);
        pop();
      } else {
        push();
        translate(x, y);
        rect(0, 0, tileWidth, tileHeight);
        pop();
      }
    }
  }
  randomValSum *= 0;
} //END OF DRAW

function populateColorArrays() {
  //populate the righthand colors
  for (let i = 0; i < colNum; i++) {
    //modulus tick tock for generating righthand colors
    if (i % 2 == 0) {
      let hVal = int(random(15, 45));
      let sVal = int(random(75, 100));
      let bVal = 100;
      colorsRight[i] = color(hVal, sVal, bVal, alphaValue);
    }else{
      let hVal = int(random(195, 225));
      let sVal = 50;
      let bVal = int(random(45, 75));
      colorsRight[i] = color(hVal, sVal, bVal, alphaValue);
    }
  }
  //populate the lefthand colors with black
  for (let i = 0; i < colNum; i++) {
    let hVal = 0;
    let sVal = 0;
    let bVal = 0;
    colorsLeft[i] = color(hVal, sVal, bVal, alphaValue);
  }
}

function displayVars(col) {
  push();
  translate(10, 18);
  fill(col);
  noStroke();
  textSize(8);
  text(`RANDOM INC // ${randomInc}`, 0, 0);
  text(`DAMPING // ${damping}`, 0, 10);
  text(`ROWS // ${rowNum}`, 0, 20);
  text(`COLS // ${colNum}`, 0, 30);
  text(`PAD // ${padding}`, 0, 40);
  text(`FRAGTHRESH // ${fragmentationThreshold}`, 0, 50);
  pop();
}

function trackMouse(col) {
  stroke(col);
  strokeWeight(0.5);
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
  else if (key == 's' || key == 'S') saveCanvas(`mk8_W:${width}_H:${height}`);

}
