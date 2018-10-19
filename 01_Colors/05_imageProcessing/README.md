# Color_02_colorGrid


## Step 1

```js
let img;

function preload(){
  //loads an image from a path and creates a p5.js image from it
  img = loadImage('../data/pic1.jpg');
}

function setup(){
  createCanvas(600,600);
  noCursor();
  noStroke();
  //Causes the draw function to only execute once
  noLoop();
}

function draw(){
  //loads the pixel data for this image into the [pixels] array
  img.loadPixels();
  //console.log the img object to make sure it has loaded correctly
  console.log(img);

}

```

## Step 2

```js
function setup() {
  //make the canvas size equal to the image size
  createCanvas(img.width, img.height);
  noStroke();
}
```

```js
function draw() {
  //define how many tiles across the X & Y
  tilecount = 10;
  //define the tile size
  let rectSize = width / tilecount;
  // empty the color arrat each frame
  let colors = [];
  //load img pixels into an array
  img.loadPixels();
  //loop through the pixels array...
  for (let gridX = 0; gridX < tilecount; gridX++) {
    for (let gridY = 0; gridY < tilecount; gridY++) {
      // define the X any Y position
      let posX = int(gridX * rectSize);
      let posY = int(gridY * rectSize);
      //use the pixel array formulae to create an index value
      var index = (posY * img.width + posX) * 4;
      // store the color of the pixel at the index value
      var col = color(img.pixels[index], img.pixels[index + 1], img.pixels[index + 2], img.pixels[index + 3]);
      colors.push(col);
    }
  }
  //create an external counter for loop
  let i = 0;
  //iterate through the grid
  for (let gridX = 0; gridX < tilecount; gridX++) {
    for (let gridY = 0; gridY < tilecount; gridY++) {
      //fill this rect with the corresponding value in the colors array
      fill(colors[i]);
      //draw rect
      rect(gridX * rectSize, gridY * rectSize, rectSize, rectSize);
      // increment the counter
      i++;
    }
  }
} //end of draw
```

## Step 3

```js
// change the number of tiles to be the product
// of width/mouseX OR width/5 based on which is the larger value
var tileCount = floor(width / max(mouseX, 5));
var rectSize = width / tileCount;
```
## Step 4

```js
// add a variable to hold the current color sort mode
var sortMode = null;
```

```js
//call the GD library sort colors function to sort the colors array
//based on the sortMode variable
gd.sortColors(colors, sortMode);

var i = 0;
for (var gridY = 0; gridY < tileCount; gridY++) {
  for (var gridX = 0; gridX < tileCount; gridX++) {
    fill(colors[i]);
    rect(gridX * rectSize, gridY * rectSize, rectSize, rectSize);
    i++;
  }
}
```

```js
//When the key is pressed...
function keyReleased() {

  //execute code based on the key pressed
  if (key == 'c' || key == 'C') writeFile([gd.ase.encode(colors)], gd.timestamp(), 'ase');
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');

  //load alternative images
  if (key == '1') img = loadImage('../data/pic1.jpg');
  if (key == '2') img = loadImage('../data/pic2.jpg');
  if (key == '3') img = loadImage('../data/pic3.jpg');
  if (key == '4') img = loadImage('../data/pic4.jpg');

  //change the value of the sortMode Var passed into the gd.sortcolor function
  if (key == '5') sortMode = null;
  // sort by HUE
  if (key == '6') sortMode = gd.HUE;
  // sort by SATURATION
  if (key == '7') sortMode = gd.SATURATION;
  // sort by BRIGHTNESS
  if (key == '8') sortMode = gd.BRIGHTNESS;
  // sort by GRAYSCALE
  if (key == '9') sortMode = gd.GRAYSCALE;
}
```
