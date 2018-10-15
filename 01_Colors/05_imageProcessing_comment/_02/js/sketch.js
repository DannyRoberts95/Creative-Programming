'use strict'

let img;
let colors = [];
let tilecount;

function preload(){
  img = loadImage('../data/pic1.jpg');
}

function setup(){
  createCanvas(img.width,img.height);
  noStroke();
}

function draw(){

  tilecount = 10;
  let rectSize = width/tilecount;

  let colors = [];

  img.loadPixels();

  for (let gridX = 0; gridX < tilecount; gridX ++){
    for(let gridY = 0; gridY < tilecount; gridY++){
      let posX = int(gridX*rectSize);
      let posY = int(gridY*rectSize);
      var index = (posY*img.width+posX)*4;
      var col = color(img.pixels[index],img.pixels[index+1],img.pixels[index+2],img.pixels[index+3]);
      colors.push(col);
    }
  }
  //create an external counter for loop
  let i = 0;
  //iterate through the grid
  for (let gridX = 0; gridX < tilecount; gridX++){
    for(let gridY = 0; gridY < tilecount; gridY++){
      //fill this rect with the corresponding value in the colors array
      fill(colors[i]);
      //draw rect
      rect(gridX*rectSize,gridY*rectSize,rectSize,rectSize);
      // increment the counter
      i++;
    }
  }

}//end of draw
