// This code is inspired by the YouTube video "Sine wave structures in p5.js | Coding Project #1" by [Colorful Coding] (Published: 2020-10-28). URL: https://www.youtube.com/watch?v=vmhRlDyPHMQ

function setup() {
  createCanvas(500, 500, WEBGL);
  angleMode(DEGREES);
}

function draw() {
  background(30);

  noFill();
  stroke(255);
  rotateX(60);

  for (let i = 1; i <= 20; i++) {
    beginShape();
    for (let j = 0; j < 360; j += 10) {
      let rad = i * 15;
      let x = rad * cos(j);
      let y = rad * sin(j);

      let z = sin(i * 10 + j) * -100;

      vertex(x, y, z);
    }
    endShape(CLOSE);
  }
}
