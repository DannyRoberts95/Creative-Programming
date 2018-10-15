'use strict'

let img;

let colors = [];

function preload(){
  img = loadImage('../data/pic1.jpg');
}

function setup(){
  createCanvas(img.width,img.height);
  // noCursor();
  noStroke();
  noLoop();

}

function draw(){

  let tilecount = 25;
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

  let i = 0;
  for (let gridX = 0; gridX < tilecount; gridX ++){
    for(let gridY = 0; gridY < tilecount; gridY++){
      fill(colors[i]);
      rect(gridX*rectSize,gridY*rectSize,rectSize,rectSize);
      i++;
    }
  }

}//end of draw
