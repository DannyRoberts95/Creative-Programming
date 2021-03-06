let canvasDiv, canvasW;
let canvasH = 750;

let font;

let textImg;
let colorImg;

let pixelSkipSlider, fillCheck, textInput;

let pixelSkip = 10;
let unitSize = 5;
let fontSize = 100;

let tileNumberX;
let tileNumberY;
let tileWidth;
let textToBeRendered = "Dan";

function preload() {
  font = loadFont("data/FreeSansBold.ttf");
  colorImg = loadImage("data/gradient.png");
}

function setup() {
  colorImg.loadPixels();

  textInput = createInput(textToBeRendered);
  textInput.parent(`input-holder`);
  textInput.input(function() {
    textToBeRendered = textInput.value();
    setUpText();
  });

  unitSizelider = createSlider(1, 50, unitSize);
  unitSizelider.parent(`size-holder`);
  unitSizelider.mouseReleased(function() {
    unitSize = unitSizelider.value();
    setUpText();
  });

  pixelSkipSlider = createSlider(5, 50, pixelSkip);
  pixelSkipSlider.parent(`pixelSkip-holder`);
  pixelSkipSlider.mouseReleased(function() {
    pixelSkip = pixelSkipSlider.value();
    setUpText();
  });

  fillCheck = createCheckbox(``, true);
  fillCheck.parent(`fill-holder`);

  fontSizeSlider = createSlider(5, 500, fontSize);
  fontSizeSlider.parent(`fontSize-holder`);
  fontSizeSlider.mouseReleased(function() {
    fontSize = fontSizeSlider.value();
    setUpText();
  });

  var canvasDiv = document.getElementById("canvas-holder");
  canvasW = canvasDiv.offsetWidth;
  canvas = createCanvas(canvasW - 25, canvasH);
  canvas.parent("canvas-holder");

  tileNumberX = width / pixelSkip;
  tileNumberY = height / pixelSkip;

  setUpText();
}

function draw() {
  // noLoop();
  background(255);

  //alternate version of the nexted for loop drawing the image
  for (let y = 0; y < height; y += pixelSkip) {
    for (let x = 0; x < height; x += pixelSkip) {
      let index = (x + y * textImg.width) * 4;

      //if the pixel value of the graphic is darker than 128
      if (textImg.pixels[index] < 128) {
        //pull the RGB values from the gradian picture array
        let r = colorImg.pixels[index];
        let g = colorImg.pixels[index + 1];
        let b = colorImg.pixels[index + 2];

        //create a color object
        let col = color(r, g, b);

        if (fillCheck.checked()) {
          noStroke();
          fill(col);
        } else {
          noFill();
          stroke(col);
          strokeWeight(1);
        }
        ellipse(x, y, unitSize * 2, unitSize * 2);
      }
    }
  }
}

function setUpText() {
  textImg = createGraphics(canvasW, canvasH);
  textImg.pixelDensity(1);
  textImg.background(225);
  textImg.textAlign(CENTER, CENTER);
  textImg.textFont(font);
  textImg.textSize(fontSize);
  textImg.text(textInput.value(), width / 2, height / 2);
  textImg.loadPixels();
}

function windowResized() {
  var canvasDiv = document.getElementById("canvas-holder");
  canvasW = canvasDiv.offsetWidth;
  resizeCanvas(width - 25, canvasH);
}
