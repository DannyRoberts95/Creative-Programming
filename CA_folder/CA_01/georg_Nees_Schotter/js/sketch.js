let columns;
let rows;
let sqrsize;
let rndStep;
let randsum;
let padding;
let dampen;

// “There it was, the great temptation for me, for once not to represent something
// technical with this machine but rather something "useless"

// Nees worked with the Siemens System 2002[17] to create aesthetic graphics, such as the graphic ″gravel ″
// (Schotter) in 1968.[18] This artwork is well known and can be seen on the website of the Victoria and
// Albert Museum, London.[19] When writing the program Nees introduced commands for random numbers,
// which produced from a designated point on the resulting chaos. This causes the graphic to develop
// from order to disorder or vice versa, if the graphic is turned through 180 degrees (upside down).

// Robert J. Krawczyk wrote in his text A Shattered Perfection: Crafting a Virtual Sculpture: ″Georg Nees’s Gravel Stones
// … What attracted me to this piece was the simplicity of the concept and the overall interpretation of
// transforming order into disorder. … What intrigues me with this "ancient" piece was the use of exact mathematical
// computations to model a chaotic image and the progression from the ordered to the disordered.″

function setup() {
  // assigning variable values
  columns = 12;
  rows = 22;
  sqrsize = 30;
  padding = 2 * sqrsize;
  //the rndStep and randsum store the values used that will distort the grid
  rndStep = .22;
  randsum = 0;
  dampen = 0.45;

  //create the canvas using the measurments of the tiles
  createCanvas((columns) * sqrsize + padding * 2, (rows) * sqrsize + padding * 2);
  background(255);
  stroke(0);
  noFill();
  rectMode(CENTER);

}

function draw() {
  noLoop();
  //nested for loop
  // for every row...
  for (let y = 1; y <= rows; y++) {
    //increment the randomness var based on the Y pos in the grid
    randsum += (y * rndStep);
    //for every column...
    for (let x = 1; x <= columns; x++) {
      //pushMatrix
      push();
      //the same random value is linked to both rotation and displacement
      let randval = random(-randsum, randsum);
      console.log(randval);

      //assign the x and y position for each tile
      let px = padding + (x * sqrsize) - (.5 * sqrsize) + (randval * dampen);
      let py = padding + (y * sqrsize) - (.5 * sqrsize) + (randval * dampen);
      //translate to the position
      translate(px, py);
      //rotate based on the randomVal
      rotate(radians(randval));
      //draw the tile
      rect(0, 0, sqrsize, sqrsize);
      //popMatrix
      pop();
    }
  }
}

function mousePressed() {
  clear();
  setup();
  loop();
}

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
}
