'use strict'

let colorCount = 60;

let hueVals = [];
let satVals = [];
let brightVals = [];

function setup() {
  colorMode(HSB, 360, 100, 100);

  //A "tick tock" modulus sequence to create contrasting colors inside of the HSB arrays
  for (let i = 0; i < colorCount; i++) {
    //if the number is even, do this..
    if (i % 2 === 0) {
      hueVals[i] = int(random(180, 360));
      satVals[i] = 100;
      brightVals[i] = int(random(25, 75));
      //else do this...
    } else {
      hueVals[i] = int(random(0, 180));
      satVals[i] = 100;
      brightVals[i] = int(random(50, 100));
    }
  }
  console.log(hueVals);
  console.log(satVals);
  console.log(brightVals);
}


function draw() {

}
