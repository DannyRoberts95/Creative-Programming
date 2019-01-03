//vars to store the HSB values for the background so they can be used individually later
let bgH, bgS, bgB, bgA;
//set the random seed so random generations are consistant across frames
let ranSeed = 1;
// boolean controlling if vars are shown or not
let displayInfo = false;
//grid object declared
let grid;

//----------------------------------------------------------------------------------------------------------------------------------------
//SETUP
//----------------------------------------------------------------------------------------------------------------------------------------
function setup() {
  //set the default size of each grid module
  let moduleSize = 50;
  //set the distance between each grid module
  let padding = -moduleSize / 5;
  //set the empty space around the grid, between it and the canvas edges
  let canvasPadding = (moduleSize + padding) * 5;
  //set the number of cols and rows in the grid
  let colNum = 15;
  let rowNum = 10;

  //based on the padding, canvas padding, cols and rows generate a canvas that fits the grid
  createCanvas((colNum * (moduleSize + padding)) + (canvasPadding * 2), (rowNum * (moduleSize + padding)) + (canvasPadding * 2));
  //set the color mode to HSB and define the HSBA ranges
  colorMode(HSB, 360, 100, 100, 100);
  //set the mouse cursor to a cross
  cursor(CROSS);

  //pass the variables into the grid constructor and generate a new grid object
  //constructor(moduleSize, padding, cols, rows, canvasPadding, moduleStrokeThickness, circleCount) {
  grid = new Grid(moduleSize, padding, colNum, rowNum, canvasPadding, 1, 15);
  // grid must be rendered after colorMode is set or else its generateColor function generates in RBG instead of HSB

  //assign the background color HSBA vals
  bgH = 255
  bgS = 75;
  bgB = 0;
  bgA = 100;
}

//----------------------------------------------------------------------------------------------------------------------------------------
//DRAW
//----------------------------------------------------------------------------------------------------------------------------------------
function draw() {
  //define program FPS
  frameRate(1);
  //set the random seed with the random seed variables
  randomSeed(ranSeed);
  //draw background
  background(bgH, bgS, bgB, bgA);

  //if the boolean is true display the variables
  if (displayInfo) {
    // pass the font color and size into the function
    displayVars(100, 8);
  }
  //run the code for the grid object
  grid.run();

} //END OF DRAW


//----------------------------------------------------------------------------------------------------------------------------------------
//DISPLAY VARIABLES
//----------------------------------------------------------------------------------------------------------------------------------------
function displayVars(col, fontSize) {

  fill(col);
  noStroke();
  //set font size
  textSize(fontSize);
  //set lineHeight
  let lineHeight = fontSize * 1.5;
  //display text for each variable
  text(`HIDE INFO " I " `, lineHeight, lineHeight);
  text(`RANDOM INC // ${grid.randomInc}`, lineHeight, lineHeight*2);
  text(`OFFSET DAMPING // ${grid.damping}`, lineHeight, lineHeight * 3);
  text(`ROWS // ${grid.rowNum}`, lineHeight, lineHeight * 4);
  text(`COLS // ${grid.colNum}`, lineHeight, lineHeight * 5);
  text(`PAD // ${grid.padding}`, lineHeight, lineHeight * 6);
  text(`R-SEED // ${ranSeed}`, lineHeight, lineHeight * 7);

}

//----------------------------------------------------------------------------------------------------------------------------------------
//KEY / MOUSE PRESSED FUNCTIONS
//----------------------------------------------------------------------------------------------------------------------------------------
function mousePressed() {
  //when mouse is pressed increment the ranSeed to change the random generation
  ranSeed++;
}

function keyReleased() {
  //Stop looping with Q
  if (key == 'q' || key == 'Q') noLoop()
  //Save Canvas with S
  else if (key == 's' || key == 'S') saveCanvas(`mk18_W:${width}_H:${height}`)
  //Toggle info with I
  else if (key == 'i' || key == 'I') {
    if (displayInfo) {
      displayInfo = false;
    } else {
      displayInfo = true
    }
  }

}
