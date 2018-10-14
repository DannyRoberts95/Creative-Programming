# CreativeComputing

## Step 1

```js
'use strict'

//state the number of tile along the X and Y axis
let tileCountX = 50;
let tileCountY = 10;

// create arrays to store each tile's H,S and B values
let hueVals = [];
let satVals = [];
let brightVals = [];

function setup() {
  //create a canvas to fill the entire browser window
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB,360,100,100);
  noStroke();

  //populate the HSB arrays with random values
  for (let i = 0; i < tileCountX; i++) {
    hueVals[i] = random(360);
    satVals[i] = random(100);
    brightVals[i] = random(100);
  }
}
```

## Step 2

```js
function draw() {
  //white background
  background(0,0,100);

  // defining the tile W and H based on the number of tiles
  let currentTileCountX = tileCountX;
  let currentTileCountY = tileCountY;
  let tileWidth = width/currentTileCountX;
  let tileHeight = height/currentTileCountY;

  //the counter var will be used to decide the fill of each tile
  let counter = 0;

  //render the tiles
  for(let gridY = 0; gridY < currentTileCountY; gridY++){
    for(let gridX = 0; gridX < currentTileCountX; gridX++){
      let posX = gridX*tileWidth;
      let posY = gridY*tileHeight;

      let index = counter % tileCountX;

      //choose the fill from the HSB arrays, and increment counter
      fill(hueVals[index],satVals[index], brightVals[index]);
      rect(posX,posY,tileWidth,tileHeight);
      counter++;
    }
  }
}
```
