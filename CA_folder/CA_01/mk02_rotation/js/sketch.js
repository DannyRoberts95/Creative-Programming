let tileWidth;
let tileHeight;
let padding;
let colNum;
let rowNum;
let canvasPadding;
let w = 1350;
let h = 450;

//addition of a variable to store the random value
let rotAngelStep;
//addition of a variable to increment the random value
let rotAngleSum;

function setup() {
  tileWidth = 45;
  tileHeight = 45;
  padding = 5;
  canvasPadding = 100;
  colNum = floor(h / (tileHeight + padding));
  rowNum = floor(w / (tileWidth + padding));

  rotAngelStep = .22;
  rotAngleSum = 0;

  createCanvas(w + canvasPadding * 2, h + canvasPadding * 2);
  colorMode(HSB, 360, 100, 100, 100);

  //random seed ensures identical randomly generated values each run
  randomSeed(1);
}

function draw() {
  noLoop();
  rectMode(CENTER);
  background(100);

  for (let i = 0; i < rowNum; i++) {

    //the rotation increment is multiplied by the column index and added to the sum
    //As the grid moves left to right the distortion increases exponentially 
    rotAngleSum += (i * rotAngelStep);

    for (let ii = 0; ii < colNum; ii++) {

      let x = canvasPadding + (tileWidth / 2) + (i * (tileWidth + padding));
      let y = canvasPadding + (tileHeight / 2) + (ii * (tileHeight + padding));

      push();
      noFill();
      strokeWeight(1);
      stroke(0, 0, 0, 50);

      translate(x, y);
      //the tile is rotated between -rotAngleSum and rotAngleSum
      rotate(random(radians(-rotAngleSum, rotAngleSum)));

      //DRAW THE RECT
      rect(0, 0, tileWidth, tileHeight);
      fill(0, 0, 0, 50);
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
