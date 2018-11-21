//----------------------------------------------------------------------------------------------------------------------------------------
//GRID OBJECT
//----------------------------------------------------------------------------------------------------------------------------------------
class Grid {
  constructor(tileSize, padding, cols, rows, canvasPadding){
    this.tileSize = tileSize;
    this.padding = padding;
    this.colNum = cols;
    this.rows = rows;
    this.canvasPadding = canvasPadding;
    this.coOrds = [];
  }

  updateGrid(){
    for (let i = 0; i < this.colNum; i++) {
      this.randomValSum += (randomInc * i);
      this.coOrds[i] = [];
      for (let ii = 0; ii < this.rowNum; ii++) {
        this.randomVal = random(-this.randomValSum, this.randomValSum);
        this.randomVal2 = random(-this.randomValSum, this.randomValSum);
        this.x = this.canvasPadding + (this.tileSize / 2) + (i * (this.tileSize + this.padding));
        this.y = this.canvasPadding + (this.tileSize / 2) + (ii * (this.tileSize + this.padding));
        this.z = this.randomValSum;
        this.coOrds[i][ii] = createVector(this.x, this.y, this.z);
      }
    }
    this.randomValSum *= 0;
  }
}
