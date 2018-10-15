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
  boxWidth = width/tileCountX;
  boxHeight = height/tileCountY;
  
  for (let y = 0; y<=tileCountY; y++){
    let startCol = colorsLeft[y];
    let endCol = colorsRight[y];
    for(let x = 0; x<=tileCountX; x++){
      let lerpAmount = map(x,0,tileCountX-1,0,1);
      let interColor = lerpColor(startCol,endCol,lerpAmount);
      fill(interColor);
      let posX = x*boxWidth;
      let posY = y*boxHeight;
      rect(posX, posY, boxWidth, boxWidth);
    }
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
