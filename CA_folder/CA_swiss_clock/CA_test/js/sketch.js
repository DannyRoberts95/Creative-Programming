let tickNumber;
let radius;
let aor;

function setup() {
  createCanvas(500, 500);
  background(255);
  rectMode(CENTER);
  strokeCap(SQUARE);

  tickNumber = 60;
  radius = 200;
  aor = TAU / tickNumber;

  translate(width / 2, height / 2);

  stroke(0);
  strokeWeight(2.5);
  noFill();
  ellipse(0,0,radius*2.25,radius*2.25);

  for (let i = 0; i < tickNumber; i++) {
    
    let x = cos(aor * i) * radius;
    let y = sin(aor * i) * radius;

    push();
    translate(x, y);
    rotate(atan2(y, x) + PI / 2);
    fill(0);

    if (i % 5 == 0) {
      rect(0, 0, 7.5, 30);
    } else rect(0, 0, 2.5, 15);
    pop();
  }

  stroke(50);
  strokeWeight(20);
  line(cos(PI) * radius * -0.2, sin(PI) * radius * -0.2, cos(PI) * radius, sin(PI) * radius);
  strokeWeight(25);
  line(cos(PI / 3) * radius * -0.2, sin(PI / 3) * radius * -0.2, cos(PI / 3) * radius * 0.66, sin(PI / 3) * radius * 0.66);
  stroke(255, 0, 0);
  strokeWeight(4);
  line(cos(PI * 4) * radius * -0.2, sin(PI * 4) * radius * -0.2, cos(PI * 4) * radius / 1.2, sin(PI * 4) * radius / 1.2);
  fill(255, 0, 0);
  ellipse(cos(PI * 4) * radius / 1.2, sin(PI * 4) * radius / 1.2, 25, 25);

}

function draw() {
  noLoop();
}
