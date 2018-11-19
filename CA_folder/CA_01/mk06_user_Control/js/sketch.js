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

let coOrds = [];

let circle = false;
let lines = false;

function setup() {

  tileWidth = 30;
  tileHeight = 30;
  padding = 0;
  canvasPadding = (tileWidth + padding) * 5;
  colNum = 22;
  rowNum = 12;
  randomInc = 0;
  randomValSum = 0;
  damping = 0;

  createCanvas((colNum * (tileHeight + padding)) + (canvasPadding * 2), (rowNum * (tileWidth + padding)) + (canvasPadding * 2));
  colorMode(HSB, 360, 100, 100, 100);
}


function draw() {

  frameRate(10);

  //mapping the damping and the random value increment to the mouse X & Y.
  randomInc = map(mouseX, 0, width, 0, 1);
  randomInc = constrain(randomInc, 0, 1);
  damping = map(mouseY, 0, height, 0, 1);
  damping = constrain(damping, 0, 1);

  // randomSeed makes sure the random values generated each frame are the same
  randomSeed(1);
  background(0);
  rectMode(CENTER);
  noFill();

  //This function displays the var values for later reference
  displayVars();

  //the loop for generating grid coOrdinates has been moved to draw so that it updates continuously
  for (let i = 0; i < colNum; i++) {
    coOrds[i] = [];
    randomValSum += (randomInc * i);
    for (let ii = 0; ii < rowNum; ii++) {
      let randomVal = random(-randomValSum, randomValSum);
      let randomVal2 = random(-randomValSum, randomValSum);
      let x = canvasPadding + (tileWidth / 2) + (i * (tileWidth + padding) + (randomVal * damping));
      let y = canvasPadding + (tileHeight / 2) + (ii * (tileHeight + padding) + (randomVal2 * damping));
      coOrds[i][ii] = createVector(x, y);
    }
  }

  for (let i = 0; i < colNum; i++) {
    for (let ii = 0; ii < rowNum; ii++) {
      let x = coOrds[i][ii].x;
      let y = coOrds[i][ii].y;

      push();
      translate(x, y);
      fill(100, 5);
      stroke(100, 50);
      strokeWeight(0);

      //based on the circle boolean draw a rect or an ellipse
      if (circle) {
        ellipse(0, 0, tileWidth, tileHeight);
      } else {
        rect(0, 0, tileWidth, tileHeight);
      }
      pop();

      //render the lines if boolean is true
      if (lines) {
        stroke(100, 1);
        strokeWeight(0.5);
        for (let i = 0; i < rowNum; i++) {
          beginShape();
          for (let ii = 0; ii < colNum; ii++) {
            let x = coOrds[ii][i].x - tileWidth / 2;
            let y = coOrds[ii][i].y;
            let x2 = coOrds[ii][i].x + tileWidth / 2;
            let y2 = coOrds[ii][i].y;
            vertex(x, y);
            vertex(x2, y2);
          }
          endShape();
        }
      }

    }
  }
  //random sum is reset each frame to avoid accumulating
  randomValSum *= 0;

}

function displayVars() {
  push();
  translate(10, 18);
  fill(100);
  textSize(8);
  text(`RANDOM INC // ${randomInc}`, 0, 0);
  text(`DAMPING // ${damping}`, 0, 10);
  text(`ROWS // ${rowNum}`, 0, 20);
  text(`COLS // ${colNum}`, 0, 30);
  text(`PAD // ${padding}`, 0, 40);
  text(`CIRCLE // ${circle}`, 0, 50);
  pop();
}


function mousePressed() {
  clear();
  setup();
  loop();
}

function keyReleased() {
  if (key == 'q' || key == 'Q') noLoop();

  else if (key == 's' || key == 'S') saveCanvas(`mk6_W:${width}_H:${height}`);

  else if (key == 'c' || key == 'C') {
    if (circle) {
      circle = false;
    } else {
      circle = true;
    }
  } else if (key == 'l' || key == 'L') {
    if (lines) {
      lines = false;
    } else {
      lines = true;
    }
  }

}
