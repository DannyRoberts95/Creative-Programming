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

  tileWidth = 45;
  tileHeight = 45;
  padding = 0;
  canvasPadding = (tileWidth + padding) * 2;
  colNum = 22;
  rowNum = 12;
  randomInc = 0.44;
  randomValSum = 0;
  damping = 0.45;

  createCanvas((colNum * (tileHeight + padding)) + (canvasPadding * 2), (rowNum * (tileWidth + padding)) + (canvasPadding * 2));
  colorMode(HSB, 360, 100, 100, 100);

  for (let i = 0; i < colNum; i++) {
    coOrds[i] = [];
    coOrds2[i] = [];
    //increase the random value for each column
    randomValSum += (randomInc * i);
    for (let ii = 0; ii < rowNum; ii++) {

      //generate and store values for the first grid co ordinates array
      let x = canvasPadding + (tileWidth / 2) + (i * (tileWidth + padding));
      let y = canvasPadding + (tileHeight / 2) + (ii * (tileHeight + padding));
      coOrds[i][ii] = createVector(x, y);

      //generate and store values for the second grid co ordinates array which are offset by the random value
      let randomVal = random(-randomValSum, randomValSum);
      //add in a second random value so the squares are not offset evenly of the X and Y axis
      let randomVal2 = random(-randomValSum, randomValSum);
      let x2 = canvasPadding + (tileWidth / 2) + (i * (tileWidth + padding) + (randomVal * damping));
      let y2 = canvasPadding + (tileHeight / 2) + (ii * (tileHeight + padding) + (randomVal2 * damping));
      coOrds2[i][ii] = createVector(x2, y2);
    }
  }
}


function draw() {

  noLoop();
  background(0);
  rectMode(CENTER);

  //render the grids based on the values created and stored in setup
  for (let i = 0; i < colNum; i++) {
    for (let ii = 0; ii < rowNum; ii++) {

      // draw the first grid
      let cx1 = coOrds[i][ii].x;
      let cy1 = coOrds[i][ii].y;
      push();
      translate(cx1, cy1);
      stroke(100, 50);
      strokeWeight(1);
      noFill();
      rect(0, 0, tileWidth, tileHeight);
      pop();

      //draw the second grid
      let cx2 = coOrds2[i][ii].x;
      let cy2 = coOrds2[i][ii].y;
      push();
      translate(cx2, cy2);
      fill(100, 25);
      stroke(100, 60);
      strokeWeight(1);
      noStroke();
      rect(0, 0, tileWidth, tileHeight);
      pop();

      //DRAW THE LINES
      stroke(100, 50);
      strokeWeight(1);
      //connect top left corners
      line(cx1 - tileWidth / 2, cy1 - tileWidth / 2, cx2 - tileWidth / 2, cy2 - tileWidth / 2);
      //connect top right corners
      line(cx1 + tileWidth / 2, cy1 - tileWidth / 2, cx2 + tileWidth / 2, cy2 - tileWidth / 2);
      //connect bottom right corners
      line(cx1 + tileWidth / 2, cy1 + tileWidth / 2, cx2 + tileWidth / 2, cy2 + tileWidth / 2);
      //connect bottom right corners
      line(cx1 - tileWidth / 2, cy1 + tileWidth / 2, cx2 - tileWidth / 2, cy2 + tileWidth / 2);

    }
  }
}

function mousePressed() {
  //reset random sum so values do not accumulate on re draw
  randomValSum *= 0;
  clear();
  setup();
  loop();
}

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(`mk5_saved_${gd.timestamp()}_width:${width}_height:${height}_ranInc:${randomInc}_damping:${damping}`, 'png');
}
