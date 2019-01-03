class FlowField {

  //initiating the variables for the flow field

  //flowfield is initalised as a 2D array;
  PVector[][] flowField;
  int cols, rows;
  int res;
  float xInc, yInc, zInc;
  float magSet;
  float xOff, yOff, zOff;
  

  FlowField(int _r, float _xInc, float _yInc, float _zInc, float _magSet) {

    xInc = _xInc;
    yInc = _yInc;
    zInc = _zInc;
    res = _r;
    cols = width/res;
    rows = height/res;
    magSet = _magSet;

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
        println(flowField[i][j]);
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
       
        stroke(0);
        fill(100,100,0,5);
        float mapVal = flowField[i][j].heading();     
        drawVector(flowField[i][j], i*res, j*res, res*2);
      }
    }
  }

  // takes in a vector, location and a length to draw a line using the data passed in
  void drawVector(PVector vectorToBeDrawn, float x, float y, float scaleL) {
    //pushMatrix();
    //translate(x, y);
    //strokeWeight(1.5);
    //stroke(0);
    ////set vector mag to 1
    //vectorToBeDrawn.normalize();
    ////rotate according to the vectors direction
    //rotate(vectorToBeDrawn.heading());
    //float lineLength = vectorToBeDrawn.mag()*scaleL;
    ////draws a line the same length as the vectors mag*scaleL
    //line(0, 0, lineLength, 0);
    //popMatrix();
    
    pushMatrix();
    translate(x, y);
    float radius1 = map(vectorToBeDrawn.x,-1,1,0,res);
    float radius2 = map(vectorToBeDrawn.y,-1,1,0,res);
    ellipse(0,0,radius1, radius1);
    rotate(vectorToBeDrawn.heading());
    popMatrix();
  }

  // finds out which square of the flow field the particle is in and returns the value
  PVector flowFieldLookup(PVector location) {
    //divide particls x and y location by scale and constrains it within the flowfield
    // the value is constrained so as to avoid an array out of bound exception
    int colum = int(constrain(location.x/res, 1, cols-1));
    int row = int(constrain(location.y/res, 1, rows-1));
    //return the 2D array location of particle
    return flowField[colum][row];
  }
}//END OF CLASS
