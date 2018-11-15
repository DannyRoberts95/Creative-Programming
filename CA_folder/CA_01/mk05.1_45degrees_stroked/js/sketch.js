let w;
let h;

let tileWidth;
let tileHeight;
let padding;
let colNum;
let rowNum;
let canvasPadding;

let randomInc;
let randomValSum;
let damping;

let coOrds = [];
let coOrds2 = [];

function setup() {

  tileWidth = 30;
  tileHeight = 30;
  padding = 0;
  canvasPadding = (tileWidth + padding) * 2;
  colNum = 22;
  rowNum = 12;
  randomInc = 0.42;
  randomValSum = 0;
  damping = 0.22;

  createCanvas((colNum * (tileHeight + padding)) + (canvasPadding * 2), (rowNum * (tileWidth + padding)) + (canvasPadding * 2));
  colorMode(HSB, 360, 100, 100, 100);
  randomSeed(1);

  for (let i = 0; i < colNum; i++) {
    coOrds[i] = [];
    randomValSum += (randomInc * i);
    for (let ii = 0; ii < rowNum; ii++) {
      let randomVal = random(-randomValSum, randomValSum);
      let x = canvasPadding + (tileWidth / 2) + (i * (tileWidth + padding) + (randomVal * damping));
      let y = canvasPadding + (tileHeight / 2) + (ii * (tileHeight + padding) + (randomVal * damping));
      coOrds[i][ii] = createVector(x, y);
    }
  }
}


function draw() {
  background(0);
  noLoop();
  rectMode(CENTER);
  noFill();

  for (let i = 0; i < colNum; i++) {
    for (let ii = 0; ii < rowNum; ii++) {
      let x = coOrds[i][ii].x;
      let y = coOrds[i][ii].y;
      push();
      translate(x, y);
      rotate(radians(45));
      fill(100, 25);
      stroke(100, 60);
      strokeWeight(1);
      rect(0, 0, tileWidth, tileHeight);
      pop();
    }
  }
}

function mousePressed() {
  randomValSum *= 0;
  clear();
  setup();
  loop();
}

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(`mk5.1_width:${width}_height:${height}_tileCountX${rowNum}_tileCountY${colNum}_ranInc:${randomInc}_damping:${damping}`, 'png');
}
