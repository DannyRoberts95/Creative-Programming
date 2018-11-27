
//initailise the variables
let tileWidth;
let tileHeight;
let padding;
let colNum;
let rowNum;
let canvasPadding;
let w;
let h;

function setup() {
  //assign variable values
  w = 1100;
  h = 600;
  tileWidth = 25;
  tileHeight = 25;
  padding = 5;
  //padding from the edge
  canvasPadding = 100;
  //assigning number of column and rows as a product of tilesize and the canvas width & height
  colNum = floor(h / (tileHeight + padding));
  rowNum = floor(w / (tileWidth + padding));
  createCanvas(w + canvasPadding * 2, h + canvasPadding * 2);
  //Changing to HSB colorMode and setting the value ranges
  colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
  //only loop once
  noLoop();
  //draw rects from the center
  rectMode(CENTER);
  background(0);

  // for every row...
  for (let i = 0; i < rowNum; i++) {
    //and for every column
    for (let ii = 0; ii < colNum; ii++) {

      //define the x and y values for the tile position
      let x = canvasPadding + (tileWidth/2) + (i * (tileWidth+padding));
      let y = canvasPadding + (tileHeight/2) + (ii * (tileHeight+padding));


      //push matrix
      push();
      noFill();
      strokeWeight(1);
      stroke(360,0,100,50);
      //translate to position
      translate(x, y);
      //draw the tile
      rect(0, 0, tileWidth, tileHeight);
      //pop matrix
      pop();
    }
  }
}

function mousePressed() {
  clear();
  loop();
}

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
}
