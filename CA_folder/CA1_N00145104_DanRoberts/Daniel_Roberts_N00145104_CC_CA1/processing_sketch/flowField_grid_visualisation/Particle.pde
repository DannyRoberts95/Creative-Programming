class Particle {
  PVector vel;
  PVector acc;
  PVector loc;
  PVector prevloc; 
  float r; 
  float h;
  float maxSpeed;
  color col;
  boolean isDead = false;

  Particle(PVector _l, float _r, float _ms, color _c) {
    loc = _l;
    prevloc = loc.copy();
    r = _r;
    col = _c;
    maxSpeed = _ms;
    acc = new PVector(0, 0);
    vel = new PVector(0, 0);
  }  

  //contains all fucntions responsible for running the particle class
  void run() {
    followField(flowField);
    updatelocition();
    bordersKill();
    display();
  }

  // the function that finds the force in the field to apply to the particle
  // the flow field object is passed intot he function
  void followField(FlowField flow) {
    PVector gridLocation = flow.flowFieldLookup(loc);
    PVector force = PVector.sub(gridLocation, vel);
    applyForce(force);
  }

  //updates the particles location on the screen
  void updatelocition() {
    //add acc to velocity
    vel.add(acc);
    //limit velocity to a specified number
    vel.limit(maxSpeed);
    //add velocity to locition to move the particle
    loc.add(vel);
    //reset acceleration to avoid accumulation 
    acc.mult(0);
  }
  //displpays the particle 
  void display() {
    stroke(col);
    strokeWeight(r);
    line(loc.x,loc.y,prevloc.x,prevloc.y);
    updatePrev();
  }

  //wraps the particles around the screen if they leave and updates their last locition
  void bordersKill() {
    if (loc.x < - wBuffer) {
      isDead = true;
    }
    if (loc.y < -hBuffer) {
      isDead = true;
    }
    if (loc.x > width+wBuffer) {
      isDead = true;
    }
    if (loc.y > height+hBuffer) {
      isDead = true;
    }
  }

  void borders() {
    if (loc.x < - wBuffer) {
      loc.x = width+r*2;
    }
    if (loc.y < -hBuffer) {
      loc.y = height+r*2;
    }
    if (loc.x > width+wBuffer) {
      loc.x = -r*2;
    }
    if (loc.y > height+hBuffer) {
      loc.y = -r*2;
    }
  }

  // defines the previous locition of a particle so that a line acan be dra between the two points
  void updatePrev() {
    prevloc.x = loc.x;
    prevloc.y = loc.y;
  }

  //applys a force passes into the fuction to the acceleration of the particle
  void applyForce(PVector force) {
    acc.add(force);
  }
}//END OF CLASS
