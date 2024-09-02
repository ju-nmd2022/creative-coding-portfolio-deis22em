// This code is inspired by the YouTube video "Sine wave structures in p5.js | Coding Project #1" by [Colorful Coding] (Published: 2020-10-28). URL: https://www.youtube.com/watch?v=vmhRlDyPHMQ

function setup() {
  createCanvas(innerWidth, innerHeight, WEBGL);
  angleMode(DEGREES);
}

function draw() {
  background(30);

  //The following 8 lines of code are inspired by Garrit Schaap example "noise_03.js"
  noFill();
  let time = frameCount * 0.3;
  let numRows = 6;
  let numCols = 6;
  let gap = 150;

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      let x = (col - numCols / 2) * gap;
      let y = (row - numRows / 2) * gap;

      push();

      translate(x, y, 0);
      rotateX(time);
      rotateY(time);

      for (let i = 1; i <= 1; i++) {
        let r = map(sin(time + i * 10), -1, 1, 0, 255);
        let g = map(sin(time + i * 10 + 120), -1, 1, 0, 255);
        let b = map(sin(time + i * 10 + 240), -1, 1, 0, 255);

        stroke(r, g, b);

        beginShape();
        for (let j = 0; j < 360; j += 550) {
          let rad = i * 10;
          let x = rad * cos(j);
          let y = rad * sin(j);

          let z = sin(i * 10 + j + time) * 500;

          rect(x, y, z);
        }
        endShape(CLOSE);
      }

      pop();
    }
  }
}
