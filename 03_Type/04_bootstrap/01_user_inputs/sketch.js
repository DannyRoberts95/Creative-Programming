let font;
let textImg;

let pixelSkipSlider, fillCheck, textInput;

// define how many pixels will be skipped in the nested loop thorugh the pixels
let pixelSkip = 3;
let tileNumberX;
let tileNumberY;
let tileWidth;
let textToBeRendered = "";

function preload() {
  font = loadFont("data/FreeSansBold.ttf");
}

function setup() {

  //create a canvas and store in a variable
  let canvas = createCanvas(650, 500);
  //define the HTML parent of the canvas object
  canvas.parent(`canvas-holder`);

  //create the input
  pixelSkipSlider = createSlider(1, 20, pixelSkip);
  //define its parent
  pixelSkipSlider.parent(`input-holder`);
  //define a callback function when its changed
  pixelSkipSlider.mouseReleased(updateVars);

  fillCheck = createCheckbox(`Fill`, true);
  fillCheck.parent(`input-holder`);
  fillCheck.mouseReleased(updateVars);

  textInput = createInput(textToBeRendered);
  textInput.parent(`input-holder`);
  textInput.input(updateVars);

  tileNumberX = width / pixelSkip;
  tileNumberY = height / pixelSkip;

  tileWidth = Math.floor(width / tileNumberX);

  //function to create the PGraphic wih the text
  setUpText();

}

function draw() {
  background(0);
  //for every pixel in the text img...
  for (let i = 0; i < tileNumberX; i++) {
    for (let ii = 0; ii < tileNumberY; ii++) {

      //define the x and y location
      let x = i * pixelSkip;
      let y = ii * pixelSkip;

      //find the index in the pixel array
      let index = (x + y * textImg.width) * 4;

      //if the pixels R value is less than 128 draw an ellipse
      if (textImg.pixels[index] < 128) {
        if (fillCheck.checked()) {
          fill(250, 180, 0);
        }else{
          noFill();
          stroke(250,180,55);
          strokeWeight(1);
        }
        ellipse(x, y, pixelSkip, pixelSkip);
      }
    }
  }
}

function setUpText() {

  //create a PGraphic
  textImg = createGraphics(750, 500);
  //set PD to 1
  textImg.pixelDensity(1);
  //set background
  textImg.background(225);
  //Draw text onto the graphic
  textImg.textFont(font);
  textImg.textSize(200);
  textImg.text(textInput.value(), 50, 100, 50, 50);
  //load the graphics pixels
  textImg.loadPixels();
}

//call back for the pixel skip input
function updateVars() {
  pixelSkip = pixelSkipSlider.value();
  setUpText();
}
