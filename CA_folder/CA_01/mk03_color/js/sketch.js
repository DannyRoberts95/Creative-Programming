let tileWidth;
let tileHeight;
let padding;
let colNum;
let rowNum;
let canvasPadding;
let randomInc;
let randomValSum;
let damping;
let w = 1200;
let h = 450;

function setup() {
  tileWidth = 50;
  tileHeight = 50;
  padding = 0;
  canvasPadding = tileWidth*2;

  colNum = 22;
  rowNum = 12;

  randomInc = 0.22;
  randomValSum = 0;
  damping = 0.45;

  //canvas size is now determined by the paddings, tile count, and tile size
  createCanvas((colNum * (tileHeight+padding)) + (canvasPadding * 2),(rowNum * (tileWidth + padding)) + (canvasPadding * 2));
  colorMode(HSB, 360, 100, 100, 100);

  randomSeed(1);
}

function draw() {
  noLoop();
  rectMode(CENTER);
  background(50);

  for (let i = 0; i < colNum; i++) {

    randomValSum += (randomInc*i);

    for (let ii = 0; ii < rowNum; ii++) {

      let randomVal = random(-randomValSum,randomValSum);

      let x = canvasPadding + (tileWidth / 2) + (i * (tileWidth + padding) + (randomVal*damping));
      let y = canvasPadding + (tileHeight / 2) + (ii * (tileHeight + padding) + (randomVal*damping));

      push();
      translate(x, y);
      rotate(random(radians(randomVal)));

      //COLORS

      // MODULUS
      //50.82 is the max value for randomValSum
      let bVal = int(map(randomValSum, 0, 50.82, 0, 100));
      let aVal = int(map(randomValSum, 0, 50.82, 100, 50));

      if (i % 2 != 0 && ii % 2 == 0) {
        let hVal = int(random(180,270));
        let sVal = 75;
        fill(hVal, sVal, bVal, aVal);
      } else {
        let hVal = int(random(90, 180));
        let sVal = 100;
        fill(hVal, sVal, bVal, aVal);
      }

      //DRAW THE RECT
      // strokeWeight(1.5);
      // stroke(50);
      noStroke();
      rect(0, 0, tileWidth, tileHeight);
      pop();
    }
  }
}

function mousePressed() {
  randomValSum*=0;
  clear();
  loop();
}

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
}
