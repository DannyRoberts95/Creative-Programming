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

  fontSizeSlider = createSlider(5, 200, fontSize);
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
  tileWidth = Math.floor(width / tileNumberX);
  setUpText();



}

function draw() {
  background(255);
  for (let i = 0; i < tileNumberX; i++) {
    for (let ii = 0; ii < tileNumberY; ii++) {

      let x = i * pixelSkip;
      let y = ii * pixelSkip;

      let x2 = map(x,0,width,0,colorImg.width);
      let y2 = map(y,0,height,0,colorImg.height);

      let index = (x + y * textImg.width) * 4;

      if (textImg.pixels[index] < 128) {

        let r = colorImg.pixels[index];
        let g = colorImg.pixels[index+1];
        let b = colorImg.pixels[index+2];
        let a = colorImg.pixels[index+3];

        let col = color(r,g,b,a);

        if (fillCheck.checked()) {
          noStroke();
          fill(col);
        } else {
          noFill();
          stroke(col);
          strokeWeight(1);
        }
        ellipse(x, y, unitSize*2, unitSize*2);
      }
    }
  }
}

function setUpText() {
  textImg = createGraphics(canvasW, canvasH);
  textImg.pixelDensity(1);
  textImg.background(225);
  textImg.textFont(font);
  textImg.textSize(fontSize);
  textImg.text(textInput.value(), 50, 100, 50, 50);
  textImg.loadPixels();
  colorImg.loadPixels();
}

function windowResized() {
  var canvasDiv = document.getElementById("canvas-holder");
  canvasW = canvasDiv.offsetWidth;
  resizeCanvas(width - 25, canvasH);
}
