class FlowField {

  //initiating the variables for the flow field

  //flowfield is initalised as a 2D array;
  PVector[][] flowField;
  int res;
  float xInc, yInc, zInc;
  float magSet;
  float xOff, yOff, zOff;
  PImage skin;


  FlowField(int _r, float _xInc, float _yInc, float _zInc, float _magSet) {

    xInc = _xInc;
    yInc = _yInc;
    zInc = _zInc;
    res = _r;
    magSet = _magSet;

    skin = loadImage("data/spot.png");
    zOff = 0;
    //define the 2d array size
    flowField = new PVector[cols][rows];
    // initialises the flow field 
    init();
  }

  void init() {
    // randomise the perlin noise seed each time the function is called
    noiseSeed((int)random(10000));
    xOff = 0;
    zOff = 0;
    // for every column 
    for (int i=0; i<cols; i++) {
      yOff = 0;
      // for every row within that column 
      for (int j=0; j<rows; j++) {
        // generates an angle between 0 and (180*4) degrees
        float theta = map(noise(xOff, yOff, zOff), 0, 1, 0, PI*2);
        //generates an angle from the theta var
        PVector angle = PVector.fromAngle(theta);
        //normalise the vector
        angle.normalize();
        //set the mag of each vector force in the field
        angle.mult(magSet);
        //pass it into the flow field
        flowField[i][j] = angle;
        //increment the nose values      
        xOff += xInc;
      }

      yOff += yInc;
      zOff += zInc;
    }
  }

  void updateFlowfield() {
    yOff = 0;
    // for every column 
    for (int i=0; i<cols; i++) {
      xOff = 0;
      // for every row within that column 
      for (int j=0; j<rows; j++) {
        // generates an angle between 0 and (180*4) degrees
        float theta = map(noise(xOff, yOff, zOff), 0, 1, 0, PI*4);
        //generates an angle from the theta var
        PVector angle = PVector.fromAngle(theta);
        //normalise the vector
        angle.normalize();
        //set the mag of each vector force
        angle.mult(magSet);
        //pass it into the flow field
        flowField[i][j] = angle;

        //increment the nose values
        xOff += xInc;
      }
      yOff += yInc;
      zOff += zInc;
    }
  }

  // draws a vector for each element in the flowField array using the drawVector function
  void displayFlowField() {
    
    for (int i=0; i<cols; i++) {
      for (int j=0; j<rows; j++) {  
        drawVector(flowField[i][j], canvasPadding+(i*(res+padding)), canvasPadding+(j*(res+padding)));
      }
    }

    for (int i=0; i<cols; i++) {
      stroke(0);
      strokeWeight(1);

      for (int j=0; j<rows; j++) {
      }
    }
  }

  // takes in a vector, location and a length to draw a line using the data passed in
  void drawVector(PVector vectorToBeDrawn, float x, float y) {
    
    color col1 = color(45,65,0);
    color col2 = color(-15,100,65);
       
    float lerpAmm = map(vectorToBeDrawn.x+vectorToBeDrawn.y, -2, 2, 0, 1);
    color interCol = lerpColor(col1,col2,lerpAmm);

    float radius = map(vectorToBeDrawn.x+vectorToBeDrawn.y, -2, 2, res*.5, res*2.5);
    float alpha = map(vectorToBeDrawn.x+vectorToBeDrawn.y, -2, 2, 75,100);
    int offset = res*2;   
    float noiseOffsetX = map(vectorToBeDrawn.x, -1, 1, -offset, offset);
    float noiseOffsetY = map(vectorToBeDrawn.y, -1, 1, -offset, offset);
 
    pushMatrix();
    translate(x, y);

    
    //fill(0);
    //strokeWeight(1);
    //stroke(0,0,100,alpha);
    noStroke();
    fill(interCol,alpha);
    ellipse(noiseOffsetX, noiseOffsetY,radius,radius);  
    popMatrix();
  }

  PVector flowFieldLookup(PVector location) {
    //divide particls x and y location by scale and constrains it within the flowfield
    // the value is constrained so as to avoid an array out of bound exception
    int colum = int(constrain(location.x/res, 1, cols-1));
    int row = int(constrain(location.y/res, 1, rows-1));
    //return the 2D array location of particle
    return flowField[colum][row];
  }
}//END OF CLASS
