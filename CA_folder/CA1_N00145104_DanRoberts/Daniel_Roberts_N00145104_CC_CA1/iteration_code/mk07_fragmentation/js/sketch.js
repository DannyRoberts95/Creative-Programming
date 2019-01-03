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
let fragmentationThreshold;

let coOrds = [];

function setup() {

  tileWidth = 20;
  tileHeight = 20;
  padding = 2.5;
  canvasPadding = (tileWidth + padding) * 5;
  colNum = 25;
  rowNum = 25;
  randomInc = 0;
  //add a variable to control the threshold at which the random randomVal will fragment a tile
  fragmentationThreshold = 45;
  randomValSum = 0;
  damping = 0;

  createCanvas((colNum * (tileHeight + padding)) + (canvasPadding * 2), (rowNum * (tileWidth + padding)) + (canvasPadding * 2));
  colorMode(HSB, 360, 100, 100, 100);
  cursor(CROSS);
}

function draw() {

  // frameRate(10);
  randomInc = map(mouseX, 0, width, 0, 1);
  randomInc = constrain(randomInc, 0, 1);
  damping = map(mouseY, 0, height, 0, 1);
  damping = constrain(damping, 0, 1);

  randomSeed(1);
  background(100);
  rectMode(CENTER);
  noFill();

  displayVars();
  trackMouse();

  for (let i = 0; i < colNum; i++) {
    coOrds[i] = [];
    randomValSum += (randomInc * i);
    for (let ii = 0; ii < rowNum; ii++) {
      let randomVal = random(-randomValSum, randomValSum);
      let randomVal2 = random(-randomValSum, randomValSum);
      let x = canvasPadding + (tileWidth / 2) + (i * (tileWidth + padding) + (randomVal * damping));
      let y = canvasPadding + (tileHeight / 2) + (ii * (tileHeight + padding) + (randomVal2 * damping));
      let z = randomVal;
      coOrds[i][ii] = createVector(x, y, z);
    }
  }

  for (let i = 0; i < colNum; i++) {

    randomValSum += (randomInc * i);
    let randomVal  = random(-randomValSum, randomValSum);
    let randomVal2 = random(-randomValSum, randomValSum);
    let randomVal3 = random(-randomValSum, randomValSum);
    let randomVal4 = random(-randomValSum, randomValSum);

    for (let ii = 0; ii < rowNum; ii++) {

      let x = coOrds[i][ii].x;
      let y = coOrds[i][ii].y;

      fill(0, 20);
      stroke(0,40);
      strokeWeight(1);


      //id the stored random val breaks threshold...
      if (coOrds[i][ii].z > fragmentationThreshold) {

        // render 4 tiles each a quarter the size of the original tile and offset them independantly
        push();
        translate(x-tileWidth/4, y-tileHeight/4);
        rect((randomVal*damping/2),(randomVal4*damping/2),tileWidth/2,tileHeight/2);
        pop();

        push();
        translate(x+tileWidth/4, y+tileHeight/4);
        rect((randomVal2*damping/2),(randomVal3*damping/2),tileWidth/2,tileHeight/2);
        pop();

        push();
        translate(x+tileWidth/4, y-tileHeight/4);
        rect((randomVal3*damping/2),(randomVal2*damping/2),tileWidth/2,tileHeight/2);
        pop();

        push();
        translate(x-tileWidth/4, y+tileHeight/4);
        rect((randomVal4*damping/2),(randomVal*damping/2),tileWidth/2,tileHeight/2);
        pop();

      } else {

        push();
        translate(x, y);
        rect(0, 0, tileWidth, tileHeight);
        pop();

      }
    }
  }
  randomValSum *= 0;
}

function displayVars() {
  push();
  translate(10, 18);
  fill(0);
  textSize(8);
  text(`RANDOM INC // ${randomInc}`, 0, 0);
  text(`DAMPING // ${damping}`, 0, 10);
  text(`ROWS // ${rowNum}`, 0, 20);
  text(`COLS // ${colNum}`, 0, 30);
  text(`PAD // ${padding}`, 0, 40);
  text(`FRAGTHRESH // ${fragmentationThreshold}`, 0, 50);
  pop();
}

function trackMouse(){
  strokeWeight(0.5);
  line(0,mouseY,width,mouseY);
  line(mouseX,0,mouseX,height);
}

function mousePressed() {
  clear();
  setup();
  loop();
}

function keyReleased() {
  if (key == 'q' || key == 'Q') noLoop();

  else if (key == 's' || key == 'S') saveCanvas(`mk7_W:${width}_H:${height}`);

}
