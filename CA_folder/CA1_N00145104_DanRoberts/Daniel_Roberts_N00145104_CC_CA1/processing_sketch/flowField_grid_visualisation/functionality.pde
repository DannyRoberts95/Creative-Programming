//controls for the application triggered via key events
void reset() {
  clear();
  background(255);
  setup();
}
void saveSketchFrame() {
  //saves the sketch screen as a PNG with a timestamp
  int s = second();  // Values from 0 - 59
  int m = minute();  // Values from 0 - 59
  int h = hour();    // Values from 0 - 23
  save("images/mk3_img_"+ h + m + s + width + height + ".png");
}
