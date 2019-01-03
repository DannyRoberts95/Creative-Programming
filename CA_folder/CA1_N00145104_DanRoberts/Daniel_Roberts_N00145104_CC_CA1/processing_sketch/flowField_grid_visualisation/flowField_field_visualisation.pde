
boolean circle = false;
boolean hideVectors= true;

FlowField flowField;
ArrayList<Particle> particles;
Particle particleP;
Timer timer; 

color colors[] = new color[10];
float alphaVal;
float wBuffer;
float hBuffer;

void settings() {
  int a3Width = 3508;
  int a3Height = 4961;

  int a4Width = a3Width/2;
  int a4Height = a3Height/2;

  int a5Width = a4Width/2;
  int a5Height = a4Height/2;

  int w = 900;
  int h = 900;

  wBuffer = w*0.05;
  hBuffer = h*0.05;
  size(w, h, P2D);
}

void setup() {

  colorMode(HSB, 360, 100, 100, 100);
  background(100);

  float xInc = 0.05;
  float yInc = 0.05;
  float zInc = 0.00009;

  float magSet = 1;
  float maxParticleSpeed = 1;
  float population = 10000;
  int resolution = 25;

  float AOR = 0;
  float numSteps = 360/population;
  float incAngle = 360/numSteps;
  float radiusC = width/4;
  float radiusP = 1;

  timer = new Timer(0, 60);
  flowField = new FlowField(resolution, xInc, yInc, zInc, magSet);
}

void draw() {
  
  background(0,0,100,100);
  
  flowField.updateFlowfield();
  flowField.displayFlowField();

  //timer.countUp();
  //if (timer.getTime() >= timer.countTo) {
  //  saveSketchFrame();
  //  reset();
  //  timer.setTime(0);
  //}
}

void generateColorsArray() {
  for (int i=0; i < colors.length; i++) {
    int hVal;
    int sVal;
    int bVal;
    if (i%2==0) { 
      hVal = int(random(0, 60));
      sVal = int(random(100));
      bVal = 30;
    } else {
      hVal = int(random(180, 240));
      sVal = int(random(100));
      bVal = int(random(75, 100));
    }
    color col = color(hVal, sVal, bVal, alphaVal);
    colors[i] = col;
  }
}

void mousePressed() {
  reset();
}
