let minStrokeLength = 10;
let minStrokeWeight = 4;
let minStrokeCap;
let minStrokeCol;

let hourStrokeLength = 30;
let hourStrokeWeight = 10;
let hourStrokeCap;
let hourStrokeCol;

let clockRad = 200;

let hourHandsTaper = 6;
let hourHandLength = 195;
let hourHandOffset = 80;
let hourHandStartWidth = 20;

let minHandsTaper = 6;
let minHandLength = 155;
let minHandOffset = 80;
let minHandStartWidth = 20;

let secondHandsTaper = 2;
let secondHandLength = 155;
let secondHandOffset = 80;
let secondHandStartWidth = 10;

let aor;

function setup() {
  createCanvas(500, 500);
  background(360);
  noLoop();
  angleMode(DEGREES);

  minStrokeCol = color(30);
  minStrokeCap = SQUARE;
  hourStrokeCol = color(30);
  hourStrokeCap = SQUARE;

}

function draw() {

aor = TAU/360;

//ticks

for(let i=0; i<60; i++){
  translate(width/2,height/2);
  let x1, x2, y1, y2;
  if(i%5==0){
    x1 = sin(aor*i)*(clockRad-hourStrokeLength);
    y1 = cos(aor*i)*(clockRad-hourStrokeLength);
    x2 = sin(aor*i)*(clockRad);
    y2 = cos(aor*i)*(clockRad);
    stroke(hourStrokeCol);
    strokeWeight(hourStrokeWeight);
    strokeCap(hourStrokeCap);
  }else{
    x1 = sin(aor*i)*(clockRad-minStrokeLength);
    y1 = cos(aor*i)*(clockRad-minStrokeLength);
    x2 = sin(aor*i)*(clockRad);
    y2 = cos(aor*i)*(clockRad);
    stroke(minStrokeCol);
    strokeWeight(minStrokeWeight);
    strokeCap(minStrokeCol);
  }
  push();
  translate(x2,y2);
  rotate(degrees(atan2((y2,x2)+(PI/2))));
  line(x1,y1,x2,y2);
  pop();
}

//second hand

let x1, x2, x3, x4, y1, y2, y3, y4;

x1 = -(sin(30)*(secondHandOffset))-secondHandStartWidth/2;
y1 = -(sin(30)*(secondHandOffset));

x2 = (sin(30)*(secondHandLength))-(secondHandStartWidth/2-secondHandsTaper);
y2 = (sin(30)*(secondHandLength));

x3 = (sin(30)*(secondHandLength))+(secondHandStartWidth/2-secondHandsTaper);
y3 = (sin(30)*(secondHandLength));

x4 = -(sin(30)*(secondHandOffset))+secondHandStartWidth/2;
y4 = -(sin(30)*(secondHandOffset));

fill(255,0,0);

beginShape();
vertex(x1,y1);
vertex(x2,y2);
vertex(x3,y3);
vertex(x4,y4);
endShape();

ellipse(0,0,15,15);
ellipse((x3-secondHandStartWidth/2),y3,25,25);

//Ran out of time.
//Code for rendering the clock hands is the same except for
//variable names, rotation angle, and color
}
