
//vars to store canvas sizes
let canvasDiv;
let canvasW;
let canvasH = 750;

let font;
let textImg;
let pixelSkipSlider, fillCheck, textInput;

let pixelSkip = 3;
let tileNumberX;
let tileNumberY;
let tileWidth;
let textToBeRendered = "Dan";

function preload() {
  font = loadFont("data/FreeSansBold.ttf");
}

function setup() {
  pixelSkipSlider = createSlider(1, 20, pixelSkip);
  pixelSkipSlider.parent(`input-holder`);
  //replace the named function with an anonymous callback upon input change
  pixelSkipSlider.mouseReleased(function() {
    pixelSkip = pixelSkipSlider.value();
    setUpText();
  });

  fillCheck = createCheckbox(`Fill`, true);
  fillCheck.parent(`input-holder`);

  textInput = createInput(textToBeRendered);
  textInput.parent(`input-holder`);
  textInput.input(function() {
    textToBeRendered = textInput.value();
    setUpText();
  });

  //find canvas holder
  var canvasDiv = document.getElementById("canvas-holder");
  //find the width of the canvas holder
  canvasW = canvasDiv.offsetWidth;
  //create a canvas the same width as its parent - the margin
  canvas = createCanvas(canvasW - 25, canvasH);
  // set parent
  canvas.parent("canvas-holder");

  tileNumberX = width / pixelSkip;
  tileNumberY = height / pixelSkip;

  setUpText();
  tileWidth = Math.floor(width / tileNumberX);
  // image(textImg, 0, 0);
}

function draw() {
  background(0);
  for (let i = 0; i < tileNumberX; i++) {
    for (let ii = 0; ii < tileNumberY; ii++) {
      let x = i * pixelSkip;
      let y = ii * pixelSkip;

      let index = (x + y * textImg.width) * 4;
      if (textImg.pixels[index] < 128) {
        if (fillCheck.checked()) {
          fill(250, 180, 0);
        } else {
          noFill();
          stroke(250, 180, 55);
          strokeWeight(1);
        }
        ellipse(x, y, pixelSkip, pixelSkip);
      }
    }
  }
}

function setUpText() {
  textImg = createGraphics(canvasW, canvasH);
  textImg.pixelDensity(1);
  textImg.background(225);
  textImg.textFont(font);
  textImg.textSize(200);
  textImg.text(textInput.value(), 50, 100, 50, 50);
  textImg.loadPixels();
}

//When the window is resized...
function windowResized() {
  //redefine the canvasW var
  var canvasDiv = document.getElementById("canvas-holder");
  canvasW = canvasDiv.offsetWidth;
  //resize the canvas
  resizeCanvas(width - 25, canvasH);
}
