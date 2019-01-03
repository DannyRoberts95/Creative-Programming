//storing the selected font in the font variable
let font = `sans-serif`;
let spacing;

function setup(){
  createCanvas(windowWidth, windowHeight);
  background(255);
  fill(0)

  //set the font to the font variable
  textFont(font);
  // align the text to the center both horizontally and vertically
  textAlign(CENTER, CENTER);
  //spacing is set to the hight of the current font multipled by 1.5
  spacing = textAscent()*1.5;
}

function draw(){

}
