let tileWidth;
let tileHeight;
let padding;
let colNum;
let rowNum;
let canvasPadding;
let w;
let h;
let randomInc;
let randomValSum;
let damping;

function setup() {
  tileWidth = 50;
  tileHeight = 50;
  padding = 5;
  canvasPadding = tileWidth*2;

  colNum = 22;
  rowNum = 12;

  randomInc = 0.22;
  randomValSum = 0;
  damping = 0.45;

  createCanvas((colNum * (tileHeight+padding)) + (canvasPadding * 2),(rowNum * (tileWidth + padding)) + (canvasPadding * 2));
  colorMode(HSB, 360, 100, 100, 100);
  randomSeed(1);
}

function draw() {
  noLoop();
  rectMode(CENTER);
  background(0);

  for (let i = 0; i < colNum; i++) {
    randomValSum += (randomInc * i);
    for (let ii = 0; ii < rowNum; ii++) {


      let randomVal = random(-randomValSum, randomValSum);
      //using the randomVal and the damping variables, the tiles are offset from their grid position
      let x = canvasPadding + (tileWidth / 2) + (i * (tileWidth + padding) + (randomVal * damping));
      let y = canvasPadding + (tileHeight / 2) + (ii * (tileHeight + padding) + (randomVal * damping));

      push();
      translate(x, y);
      rotate(random(radians(randomVal)));
      noFill();
      strokeWeight(1);
      stroke(100);
      rect(0, 0, tileWidth, tileHeight);
      pop();

    }
  }
}

function mousePressed() {
  randomValSum *= 0;
  clear();
  loop();
}

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(`mk4_saved_${gd.timestamp()}_width:${width}_height:${height}_ranInc:${randomInc}_damping:${damping}`, 'png');
}
