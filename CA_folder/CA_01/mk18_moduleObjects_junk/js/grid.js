//----------------------------------------------------------------------------------------------------------------------------------------
//GRID OBJECT
//----------------------------------------------------------------------------------------------------------------------------------------
class Grid {
  constructor(tileSize, padding, cols, rows, canvasPadding) {
    this.tileSize = tileSize;
    this.padding = padding;
    this.colNum = cols;
    this.rowNum = rows;
    this.canvasPadding = canvasPadding;
      this.randomValSum = 0;

    this.coOrdinates = [];
    this.modules = [];

    this.colorsLeft = [];
    this.colorsRight = [];

    this.circleCount = 15;
    this.endSize = 0;
    this.damping = 0;
    this.randomInc = 0;

    this.populateGridColorArrays();
  }

  //RUNS ALL THE FUNCTIONALITY FOR THE GRID OBJECT
  run(){
    this.updateMouseValues();
    this.updateGridValues();
    this.updateModuleValues();
  }
  // UPDATES VALUES CONTROLED BY THE MOUSE
  updateMouseValues(){
    this.randomInc = map(mouseX, 0, width, 0, 5);
    this.randomInc = constrain(this.randomInc, 0, 5);
    this.damping = map(mouseY, 0, height, 0, 1);
    this.damping = constrain(this.damping, 0, 1);
  }

  //UPDATES THE VALUES STORED FOR EACH MODULE IN THE GRID
  updateGridValues() {
    for (let i = 0; i < this.colNum; i++) {
      this.randomValSum += (this.randomInc * i);
      this.coOrdinates[i] = [];
      for (let ii = 0; ii < this.rowNum; ii++) {
        this.randomVal = random(-this.randomValSum, this.randomValSum);
        this.randomVal2 = random(-this.randomValSum, this.randomValSum);
        this.x = this.canvasPadding + (this.tileSize / 2) + (i * (this.tileSize + this.padding));
        this.y = this.canvasPadding + (this.tileSize / 2) + (ii * (this.tileSize + this.padding));
        this.z = this.randomValSum;
        this.coOrdinates[i][ii] = createVector(this.x, this.y, this.z);
      }
    }
    this.randomValSum *= 0;
  }

  //RENDERS THE GRID MODULES
  updateModuleValues() {

    for (let i = 0; i < this.colNum; i++) {
      modules[i] = [];
      for (let ii = 0; ii < this.rowNum; ii++) {

        this.lerpAmount = map(i, 0, this.colNum, 0, 1);
        this.col1 = this.colorsLeft[ii];
        this.col2 = this.colorsRight[ii];
        this.interCol = lerpColor(this.col1, this.col2, this.lerpAmount);

        this.x = this.coOrdinates[i][ii].x;
        this.y = this.coOrdinates[i][ii].y;
        this.z = this.coOrdinates[i][ii].z;

        this.randomVal = random(-this.z, this.z);
        this.randomVal2 = random(-this.z, this.z);

        this.renderSize = abs(this.randomVal * this.damping) / 2 + this.tileSize;
        //move the offset rendersize length of the way from the centerpoint
        this.endOffset = this.renderSize;

        modules[i][ii] = new Module (this.x, this.y, this.z, this.renderSize, this.intercol);

        // push();
        // noFill();
        // strokeWeight(strokeThickness);
        // translate(this.x + (this.randomVal * this.damping), this.y + (this.randomVal2 * this.damping));
        // rotate(random(radians(-this.randomVal, this.randomVal)));
        // for (let iii = 0; iii < this.circleCount; iii++) {
        //   this.lerpAmount2 = map(iii, 0, this.circleCount, 0, 1);
        //
        //   //the hardcoded color of the center point and the color that will be lerped to from the intercol calculated earlier
        //   this.col3 = color(5, 80, 83);
        //   this.interCol2 = lerpColor(this.interCol, this.col3, this.lerpAmount2);
        //
        //   this.diameter = map(iii, 0, this.circleCount, this.renderSize, this.endSize);
        //   this.offset = map(iii, 0, this.circleCount, 0, this.endOffset);
        //   stroke(this.interCol2, alphaValue);
        //
        //   // use the background color values to alphafill the first circle of each module
        //   if (iii === 0) fill(color(bgH, bgS, bgB, 50));
        //   ellipse(this.offset, 0, this.diameter, this.diameter);
        // }
        //
        // pop();
      }
    }
  }


  populateGridColorArrays() {
    for (let i = 0; i < this.colNum; i++) {

      this.hVal = 195;
      this.sVal = 55;
      this.bVal = 64;
      this.colorsLeft[i] = color(this.hVal, this.sVal, this.bVal, alphaValue);

      this.hVal2 = 18;
      this.sVal2 = 75;
      this.bVal2 = 85;
      this.colorsRight[i] = color(this.hVal2, this.sVal2, this.bVal2, alphaValue);

    }
  }

} //END OF THE CLASS
