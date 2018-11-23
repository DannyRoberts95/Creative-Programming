//----------------------------------------------------------------------------------------------------------------------------------------
// THIS MARK WAS SCRAPPED AS MAKING THE MODULES OBJECTS SERVED LITTLE PURPOSE
//----------------------------------------------------------------------------------------------------------------------------------------



let tileSize;
let padding;
let colNum;
let rowNum;
let canvasPadding;

let randomInc;
let damping;

let ranSeed;

//vars to store the HSB values for the background
let bgH,bgS,bgB,bgA;

let displayInfo = true;

//grid object declared
let grid;

function setup() {

  tileSize = 50;
  padding = -tileSize/10;
  canvasPadding = (tileSize + padding) * 2;
  colNum = 18;
  rowNum = 10;

  ranSeed = 1;

  alphaValue = 75;
  strokeAlphaValue = alphaValue;
  strokeThickness = 1;

  //assign the background color vals
  bgH = 255
  bgS = 75;
  bgB = 25;
  bgA = 100;

  createCanvas((colNum * (tileSize + padding)) + (canvasPadding * 2), (rowNum * (tileSize + padding)) + (canvasPadding * 2));
  console.log(width, height);
  colorMode(HSB, 360, 100, 100, 100);

  cursor(CROSS);
  ellipseMode(CENTER);
  rectMode(CENTER);

  // constructor(tileSize, padding, cols, rows, canvasPadding, randomInc){
  grid = new Grid(tileSize, padding, colNum, rowNum, canvasPadding, 0.5);

}


function draw() {

  frameRate(1);
  randomSeed(ranSeed);
  background(bgH,bgS,bgB,bgA);

  if (displayInfo) {
    displayVars(100, 8);
  }

  grid.run();

}//END OF DRAW


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
  text(`RANDOM INC // ${grid.randomInc}`, lineHeight, lineHeight);
  text(`OFFSET DAMPING // ${grid.damping}`, lineHeight, lineHeight * 2);
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
