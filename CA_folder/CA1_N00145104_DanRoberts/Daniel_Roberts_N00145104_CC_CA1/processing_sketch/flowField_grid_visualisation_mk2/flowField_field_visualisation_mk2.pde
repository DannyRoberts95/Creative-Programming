
boolean circle = false;
boolean hideVectors= true;

FlowField flowField;
Timer timer; 

int cols = 20;
int rows = 20;

float xInc;
float yInc;
float zInc;

float magSet;
float maxParticleSpeed;
float population;
int resolution;
int canvasPadding; 
int padding;

int w;
int h;

void settings() {
  cols = 40;
  rows = 40;
  resolution = 10;
  padding = 5;

  xInc = 0.03;
  yInc = 0.03;
  zInc = 0.00025;

  magSet = 1;
  maxParticleSpeed = 1;
  population = 10000;
  canvasPadding = resolution*8; 
  w = canvasPadding*2 + ((resolution+padding)*cols);
  h = canvasPadding*2 + ((resolution+padding)*rows);

  size(w, h, P2D);
}

void setup() {
  colorMode(HSB, 360, 100, 100, 100);
  timer = new Timer(0, 60);
  flowField = new FlowField(resolution, xInc, yInc, zInc, magSet);
}

void draw() {

  fill(0, 0, 100);
  rect(0,0,width,height);

  flowField.updateFlowfield();
  flowField.displayFlowField();
}

void mousePressed() {
  reset();
}
