let w;
let h;

let tileSize;
let padding;
let colNum;
let rowNum;
let canvasPadding;

let randomInc;
let randomValSum;
let damping;
let fragmentationThreshold;

let coOrds = [];
let colorsLeft = [];
let colorsRight = [];
let alphaValue;
let strokeCol;

//variables for rendering the modlues
let circleCount;
let endSize;
let endOffset;

let ranSeed;

let rotation = true;
let baseGrid = false;
let stroked = true;
let displayInfo = true;


function setup() {

  tileSize = 30;
  padding = 10;
  canvasPadding = (tileSize + padding) * 4;
  colNum = 18;
  rowNum = 8;
  randomInc = 0;
  randomValSum = 0;
  damping = 0;

  alphaValue = 100;

  strokeAlphaValue = alphaValue*0.75;
  strokeCol = 0;
  strokeThickness = 1;
  ranSeed = 1;

  createCanvas((colNum * (tileSize + padding)) + (canvasPadding * 2), (rowNum * (tileSize + padding)) + (canvasPadding * 2));
  colorMode(HSB, 360, 100, 100, 100);
  smooth();
  cursor(CROSS);
  ellipseMode(CENTER);
  rectMode(CENTER);
  populateColorArrays();

}


function draw() {
  noStroke();

  frameRate(5);
  //random inc range is decreased
  randomInc = map(mouseX, 0, width, 0, 2.5);
  randomInc = constrain(randomInc, 0, 2.5);
  damping = map(mouseY, 0, height, 0, 1);
  damping = constrain(damping, 0, 1);

  randomSeed(ranSeed);
  background(0);

  if (displayInfo) {
    displayVars(0, 8);
  }

  updateGridValues();
  renderGrids();
} //END OF DRAW

//----------------------------------------------------------------------------------------------------------------------------------------
//GENERATE VALUES FOR THE GRID
//----------------------------------------------------------------------------------------------------------------------------------------
function updateGridValues() {
  for (let i = 0; i < colNum; i++) {
    randomValSum += (randomInc * i);
    coOrds[i] = [];
    for (let ii = 0; ii < rowNum; ii++) {
      let randomVal = random(-randomValSum, randomValSum);
      let randomVal2 = random(-randomValSum, randomValSum);
      let x = canvasPadding + (tileSize / 2) + (i * (tileSize + padding));
      let y = canvasPadding + (tileSize / 2) + (ii * (tileSize + padding));
      let z = randomValSum;
      coOrds[i][ii] = createVector(x, y, z);
    }
  }
  randomValSum *= 0;
}

//----------------------------------------------------------------------------------------------------------------------------------------
//RENDER THE GRID
//----------------------------------------------------------------------------------------------------------------------------------------
function renderGrids() {



  for (let i = 0; i < colNum; i++) {
    for (let ii = 0; ii < rowNum; ii++) {
      let lerpAmount = map(i, 0, colNum, 0, 1);
      let col1 = colorsLeft[ii];
      let col2 = colorsRight[ii];
      let interCol = lerpColor(col1, col2, lerpAmount);
      let x = coOrds[i][ii].x;
      let y = coOrds[i][ii].y;
      let z = coOrds[i][ii].z;
      let randomVal = random(-z, z);
      let randomVal2 = random(-z, z);

      //render size is re-introduced and the module variables are now calculated each draw frame
      let renderSize = (randomVal * damping) / 2 + tileSize;
      renderSize = constrain(renderSize, tileSize, tileSize * 4);
      //the amount of circles in the module is mapped to it's column number
      // circleCount = int(map(i,0,colNum,10,50));
      circleCount = 25;
      //modules now scale to renderSize introduced in mk_11
      endSize = renderSize / 5;
      endOffset = (renderSize - endSize) / 2;


      push();
      noFill();
      if (stroked) {
        stroke(strokeCol, strokeAlphaValue);
        strokeWeight(strokeThickness);
      } else noStroke();
      translate(x + (randomVal * damping), y + (randomVal2 * damping));
      if (rotation) rotate(random(radians(-randomVal, randomVal)));

      for (let iii = 0; iii < circleCount; iii++) {
        var diameter = map(iii, 0, circleCount, renderSize, endSize);
        var offset = map(iii, 0, circleCount, 0, endOffset);

        //adding a lerpColor to color each cirlce of the modlues
        let lerpAmount2 = map(iii, 0, circleCount, 0, 1);
        //lerp between white and the interCol calculated earlier
        let col3 = color(0,0,100,alphaValue);
        let col4 = interCol;
        let interCol2 = lerpColor(col4, col3, lerpAmount2);

        noStroke();
        fill(interCol2);
        ellipse(offset, 0, diameter, diameter);
      }
      pop();
    }
  }

  if (baseGrid) {
    for (let i = 0; i < colNum; i++) {
      for (let ii = 0; ii < rowNum; ii++) {
        let lerpAmount = map(i, 0, colNum, 0, 1);
        let col1 = colorsLeft[ii];
        let col2 = colorsRight[ii];
        let interCol = lerpColor(col2, col1, lerpAmount);
        let baseX = coOrds[i][ii].x;
        let baseY = coOrds[i][ii].y;
        push();
        fill(interCol);
        if (stroked) {
          stroke(strokeCol, strokeAlphaValue);
          strokeWeight(strokeThickness);
        }
        translate(baseX, baseY);
        ellipse(0, 0, tileSize / 2, tileSize / 2);
        pop();
      }
    }
  }

} //END OF DRAW


//----------------------------------------------------------------------------------------------------------------------------------------
//FUNCTIONS
//----------------------------------------------------------------------------------------------------------------------------------------

function populateColorArrays() {
  for (let i = 0; i < colNum; i++) {

    let hVal = 0;
    let sVal = 0;
    let bVal = 15;
    //alpha is hard coded to 100 to produce gradient effect across the grid
    colorsLeft[i] = color(hVal, sVal, bVal,100);

    if (i % 2 == 0) {
      let hVal = int(random(165, 225));
      let sVal = 100;
      let bVal = 90;
      //alphavaue is lowered so as to produce a gradiant effect while lerping between colors
      colorsRight[i] = color(hVal, sVal, bVal,alphaValue/5);
    } else {
      let hVal = int(random(225, 285));
      let sVal = 80;
      let bVal = 25;
      //
      colorsRight[i] = color(hVal, sVal, bVal,alphaValue/5);
    }
  }
}

function displayVars(col, fontSize) {
  push();
  translate(10, 18);
  fill(col);
  noStroke();
  textSize(fontSize);
  let lineHeight = fontSize * 1.5;
  text(`HIDE INFO " I " `, lineHeight, 0);
  text(`RANDOM INC // ${randomInc}`, lineHeight, lineHeight);
  text(`OFFSET DAMPING // ${damping}`, lineHeight, lineHeight * 2);
  text(`ROWS // ${rowNum}`, lineHeight, lineHeight * 3);
  text(`COLS // ${colNum}`, lineHeight, lineHeight * 4);
  text(`PAD // ${padding}`, lineHeight, lineHeight * 5);
  text(`R-SEED // ${ranSeed}`, lineHeight, lineHeight * 7);
  text(`ALPHA // ${alphaValue}`, lineHeight, lineHeight * 8);
  text(`CIRCLE NUM // ${circleCount}`, lineHeight, lineHeight * 9);
  text(`ENDSIZE // ${endSize}`, lineHeight, lineHeight * 10);
  text(`ENDOFF // ${endOffset}`, lineHeight, lineHeight * 11);
  pop();
}

function mousePressed() {
  ranSeed++;
  populateColorArrays();
}

function keyReleased() {
  if (key == 'q' || key == 'Q') noLoop()
  else if (key == 's' || key == 'S') saveCanvas(`mk14_W:${width}_H:${height}`)

  else if (key == 'r' || key == 'R') {
    if (rotation) {
      rotation = false;
    } else {
      rotation = true
    }
  } else if (key == 'b' || key == 'B') {
    if (baseGrid) {
      baseGrid = false;
    } else {
      baseGrid = true
    }
  } else if (key == 'l' || key == 'L') {
    if (stroked) {
      stroked = false;
    } else {
      stroked = true
    }
  } else if (key == 'i' || key == 'I') {
    if (displayInfo) {
      displayInfo = false;
    } else {
      displayInfo = true
    }
  }

}
