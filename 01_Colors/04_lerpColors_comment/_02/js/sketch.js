let width = 750;
let height = 750;

let colorsRight = [];
let colorsLeft = [];
let tileCountX = 10;
let tileCountY = 10;
let boxWidth = width/tileCountX;
let boxHeight = height/tileCountY;

function setup(){
  createCanvas(width,height);
  colorMode(HSB);
  noStroke();
  shakeColors();
}

function draw(){
  //defines the
  boxWidth = width/tileCountX;
  boxHeight = height/tileCountY;

  for (let y = 0; y<=tileCountY; y++){
    let startCol = colorsLeft[y];
    let endCol = colorsRight[y];
  }
}

function shakeColors() {
  for(let i = 0; i<tileCountY; i++){
    colorsLeft.push(genRandomCol());
  }
  for(let i = 0; i<tileCountY; i++){
    colorsRight.push(genRandomCol());
  }
}

function genRandomCol(){
  let col1 = floor(random(0,255));
  let col2 = floor(random(0,255));
  let col3 = floor(random(0,255));
  let randomColor = color(col1,col2,col3);
  return randomColor;
}
