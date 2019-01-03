class Timer {

  float time;
  float countTo;

  Timer (float _set, float _countTo) {
    time = _set;
    countTo = _countTo;
  }

  float getTime() {
    return time;
  }

  void setTime(float set) {
    time = set;
  }

  void countUp() {
    time += 1/frameRate;
  }

  void countDown() {
    time-= 1/frameRate;
  }
}

void update() {
  timer.countUp();
  if (timer.getTime() >= timer.countTo) {
    saveSketchFrame();
    reset();
    timer.setTime(0);
  }
}
