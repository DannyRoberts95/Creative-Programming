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
  minStrokeCol = color(90,90,90);
  minStrokeCap = SQUARE;
  hourStrokeCol = color(90,90,90);
  hourStrokeCap = SQUARE;

  aor = degrees(TAU/60);

}

function draw() {


translate(width/2,height/2);

//ticks
for(let i=0; i<60; i++){
  let x1, x2, y1, y2;
  if(i%5==0){
    x1 = sin(aor*i)*(clockRad-hourStrokeLength);
    y1 = cos(aor*i)*(clockRad-hourStrokeLength);
    x2 = sin(aor*i)*(clockRad);
    y2 = cos(aor*i)*(clockRad);
    stroke(hourStrokeCol);
    strokeWeight(hourStrokeWeight);
    strokeCap(hourStrokeCap);
    push();
    line(x1,y1,x2,y2);
    pop();
  }else{
    x1 = sin(aor*i)*(clockRad-minStrokeLength);
    y1 = cos(aor*i)*(clockRad-minStrokeLength);
    x2 = sin(aor*i)*(clockRad);
    y2 = cos(aor*i)*(clockRad);
    stroke(minStrokeCol);
    strokeWeight(minStrokeWeight);
    strokeCap(minStrokeCap);
    stroke(minStrokeCol);
    strokeWeight(minStrokeWeight);
    strokeCap(hourStrokeCap);
    push();
    line(x1,y1,x2,y2);
    pop();
  }
}

let x1, x2, x3, x4, y1, y2, y3, y4;

//hour hand
let hourHandTipX = sin(0)*hourHandLength;
let hourHandTipY = cos(0)*hourHandLength;
let hourHandBottomX = -sin(0)*hourHandOffset;
let hourHandBottomY = -cos(0)*hourHandOffset;

x1 = hourHandBottomX - hourHandStartWidth/2;
y1 = hourHandBottomY;
x2 = hourHandTipX - (hourHandStartWidth/2-hourHandsTaper);
y2 = hourHandTipY;
x3 = hourHandTipX + (hourHandStartWidth/2-hourHandsTaper);
y3 = hourHandTipY;
x4 = hourHandBottomX + hourHandStartWidth/2;
y4 = hourHandBottomY;

push();
rotate(216);
noStroke();
fill(0);
line(hourHandTipX,hourHandTipY,hourHandBottomX,hourHandBottomY);
beginShape();
vertex(x1,y1);
vertex(x2,y2);
vertex(x3,y3);
vertex(x4,y4);
endShape();
pop();

//Min hand
let minHandTipX = sin(0)*minHandLength;
let minHandTipY = cos(0)*minHandLength;
let minHandBottomX = -sin(0)*minHandOffset;
let minHandBottomY = -cos(0)*minHandOffset;

x1 = minHandBottomX - minHandStartWidth/2;
y1 = minHandBottomY;
x2 = minHandTipX - (minHandStartWidth/2-minHandsTaper);
y2 = minHandTipY;
x3 = minHandTipX + (minHandStartWidth/2-minHandsTaper);
y3 = minHandTipY;
x4 = minHandBottomX + minHandStartWidth/2;
y4 = minHandBottomY;

push();
rotate(350);
noStroke();
fill(0);
line(minHandTipX,minHandTipY,minHandBottomX,minHandBottomY);
beginShape();
vertex(x1,y1);
vertex(x2,y2);
vertex(x3,y3);
vertex(x4,y4);
endShape();
pop();

//second hand
let secondHandTipX = sin(0)*secondHandLength;
let secondHandTipY = cos(0)*secondHandLength;
let secondHandBottomX = -sin(0)*secondHandOffset;
let secondHandBottomY = -cos(0)*secondHandOffset;

x1 = secondHandBottomX - secondHandStartWidth/2;
y1 = secondHandBottomY;
x2 = secondHandTipX - (secondHandStartWidth/2-secondHandsTaper);
y2 = secondHandTipY;
x3 = secondHandTipX + (secondHandStartWidth/2-secondHandsTaper);
y3 = secondHandTipY;
x4 = secondHandBottomX + secondHandStartWidth/2;
y4 = secondHandBottomY;

push();
rotate(250);
noStroke();
fill(255,0,0);
line(secondHandTipX,secondHandTipY,secondHandBottomX,secondHandBottomY);
beginShape();
vertex(x1,y1);
vertex(x2,y2);
vertex(x3,y3);
vertex(x4,y4);
endShape();
ellipse(0,0,15,15);
ellipse(secondHandTipX,secondHandTipY,25,25);
pop();

}
