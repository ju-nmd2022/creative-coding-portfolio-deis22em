// This code is inspired by the YouTube video "Sine wave structures in p5.js | Coding Project #1" by [Colorful Coding] (Published: 2020-10-28). URL: https://www.youtube.com/watch?v=vmhRlDyPHMQ

function setup() {
  createCanvas(550, 550, WEBGL);
  angleMode(DEGREES);
}

function draw() {
  background(30);

  noFill();
  rotateX(60);
  let time = frameCount * 0.7;
  translate(0, 0, 15);

  //COLORS
  for (let i = 1; i <= 20; i++) {
    let r = map(sin(time + i * 10), -1, 1, 0, 255);
    let g = map(sin(time + i * 10 + 120), -1, 1, 0, 255);
    let b = map(sin(time + i * 10 + 240), -1, 1, 0, 255);

    stroke(r, g, b);

    //SHAPE
    beginShape();
    for (let j = 0; j < 360; j += 10) {
      let rad = i * 10;
      let x = rad * cos(j);
      let y = rad * sin(j);

      //ROTATION
      let z = sin(i * 10 + j + time) * -100;

      vertex(x, y, z);
    }
    endShape(CLOSE);
  }
}
