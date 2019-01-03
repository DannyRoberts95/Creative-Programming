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
  
  void countDown(){
    time-= 1/frameRate;
  }
}
