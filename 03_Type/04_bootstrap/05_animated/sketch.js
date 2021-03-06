let canvasDiv;
let canvasW = 500;
let canvasH = 605;

let font;
let textImg;
let colorImg;

let textInput,unitSizelider,pixelSkipSlider,fillCheck,fontSizeSlider;

let pixelSkip = 10;
let unitSize = 2;
let fontSize = 400;

let positionArray = [];

let tileNumberX;
let tileNumberY;
let textToBeRendered = "Dan";

let lerpAmount = 0;
let animateSpeed = 0.01;
let reverse = false;

function preload() {
  font = loadFont("data/FreeSansBold.ttf");
  colorImg = loadImage("data/gradient.png");
}

function setup() {


  var canvasDiv = document.getElementById("canvas-holder");
  canvasW = floor(canvasDiv.offsetWidth-25);
  canvas = createCanvas(canvasW, canvasH);
  canvas.parent("canvas-holder");

  createInputs();
  setUpText();
  createArrays();

}

function draw() {

  background(200);

  // lerpAmount = map(mouseX,0,width,0,1);
  // lerpAmount = constrain(lerpAmount,0,1);


  if(!reverse){
    lerpAmount += animateSpeed;
    if(lerpAmount > 1){
      reverse = true;
    }
  } else if(reverse){
    lerpAmount -= animateSpeed;
    if(lerpAmount < 0){
      reverse = false;
    }
  }

  for (let i = 0; i < positionArray.length; i++) {
    let dot = positionArray[i];

    let x = lerp(dot.startPos.x, dot.endPos.x, lerpAmount);
    let y = lerp(dot.startPos.y, dot.endPos.y, lerpAmount);

    if(fillCheck.checked()){
      noStroke();
      fill(dot.color);
      ellipse(x,y,unitSize*2, unitSize*2);
    } else {
      noFill();
      strokeWeight(1);
      stroke(dot.color);
      ellipse(x,y,unitSize*2, unitSize*2);
    }


  }
}//END OF DRAW

function createArrays() {
  colorImg.loadPixels();
  positionArray = [];

  for (let x = 0; x < width; x+= pixelSkip) {
    for (let y = 0; y < height; y+= pixelSkip) {

      x = floor(map(x, 0, width, 0, textImg.width));
      y = floor(map(y, 0, height, 0, textImg.height));
      let index = floor((x + y * textImg.width) * 4);


      let x2 = floor(map(x, 0, width, 0, colorImg.width));
      let y2 = floor(map(y, 0, height, 0, colorImg.height));
      let indexColor = floor((x + y * colorImg.width) * 4);

      if (textImg.pixels[index] < 100) {

        let r = colorImg.pixels[indexColor];
        let g = colorImg.pixels[indexColor + 1];
        let b = colorImg.pixels[indexColor + 2];
        let a = colorImg.pixels[indexColor + 3];

        let col = color(r, g, b, a);


        let rangeX = random(-100,100);
        let rangeY = random(-100,100);
        let startPos = createVector(x+rangeX,y+rangeY);
        let endPos = createVector(x,y);

        let positionObject = {
          startPos : startPos,
          endPos : endPos,
          color : col

        }
        positionArray.push(positionObject);
      }
    }
  }
  console.log(positionArray);
}

function setUpText() {
  textImg = createGraphics(canvasW, canvasH);
  textImg.pixelDensity(1);
  textImg.background(100);
  textImg.textAlign(CENTER, CENTER);
  textImg.textFont(font);
  textImg.textSize(fontSize);
  textImg.text(textInput.value(), canvasW / 2, canvasH/2);
  textImg.loadPixels();
}

function createInputs() {
  textInput = createInput(textToBeRendered);
  textInput.parent(`input-holder`);
  textInput.input(function() {
    textToBeRendered = textInput.value();
    setUpText();
    createArrays();
  });

  unitSizelider = createSlider(1, 50, unitSize);
  unitSizelider.parent(`size-holder`);
  unitSizelider.mouseReleased(function() {
    unitSize = unitSizelider.value();
    setUpText();
    createArrays();
  });

  pixelSkipSlider = createSlider(5, 50, pixelSkip);
  pixelSkipSlider.parent(`pixelSkip-holder`);
  pixelSkipSlider.mouseReleased(function() {
    pixelSkip = pixelSkipSlider.value();
    setUpText();
    createArrays();
  });

  fillCheck = createCheckbox(``, true);
  fillCheck.parent(`fill-holder`);

  fontSizeSlider = createSlider(5, 750, fontSize);
  fontSizeSlider.parent(`fontSize-holder`);
  fontSizeSlider.mouseReleased(function() {
    fontSize = fontSizeSlider.value();
    setUpText();
    createArrays();
  });
}

// function windowResized() {
//   var canvasDiv = document.getElementById("canvas-holder");
//   canvasW = canvasDiv.width-25;
//   canvasH = canvasDiv.offsetHeight-25;
//   resizeCanvas(canvasW, canvasH);
// }
