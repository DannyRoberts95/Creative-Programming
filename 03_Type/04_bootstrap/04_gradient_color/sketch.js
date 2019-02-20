let canvasDiv, canvasW;
let canvasH = 500;

let font;

let textImg;
let colorImg;

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

  fontSizeSlider = createSlider(5, 750, fontSize);
  fontSizeSlider.parent(`fontSize-holder`);
  fontSizeSlider.mouseReleased(function() {
    fontSize = fontSizeSlider.value();
    setUpText();
  });

  var canvasDiv = document.getElementById("canvas-holder");
  canvasW = canvasDiv.offsetWidth;
  canvasH = canvasDiv.offsetHeight;
  canvas = createCanvas(canvasW - 25, canvasH);
  canvas.parent("canvas-holder");

  tileNumberX = width / pixelSkip;
  tileNumberY = height / pixelSkip;

  setUpText();

  colorImg.loadPixels();

}

function draw() {
  background(255);
  for (let i = 0; i < tileNumberX; i++) {
    for (let ii = 0; ii < tileNumberY; ii++) {

      let x = i * pixelSkip;
      let y = ii * pixelSkip;

      //map and floor the current X to an X2 var that works for the gradient color image,
      //important, as the canvas/ graphic size will be changing
      let x2 = floor(map(x,0,width,0,colorImg.width));
      let y2 = floor(map(y,0,height,0,colorImg.height));

      let index = floor((x + y * textImg.width) * 4);
      //define and index2 for the color gradient image
      let index2 = floor((x2 + y2 * colorImg.width) * 4);

      if (textImg.pixels[index] < 128) {

        let r = colorImg.pixels[index2];
        let g = colorImg.pixels[index2+1];
        let b = colorImg.pixels[index2+2];
        let a = colorImg.pixels[index2+3];

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
  textImg.textAlign(CENTER,CENTER);
  textImg.textFont(font);
  textImg.textSize(fontSize);
  textImg.text(textInput.value(), width/2, height/2, 50, 50);
  textImg.loadPixels();
}

function windowResized() {
  var canvasDiv = document.getElementById("canvas-holder");
  canvasW = canvasDiv.width;
  resizeCanvas(width - 25, canvasH);
}
