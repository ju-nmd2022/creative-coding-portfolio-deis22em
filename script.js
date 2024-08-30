function setup() {
  createCanvas(400, 400, WEBGL);
  angleMode(DEGREES);
}

function draw() {
  background(30);

  noFill();
  stroke(255);
  rotateX(60);

  for (let i = 1; i <= 100; i++) {
    beginShape();
    for (let j = 0; j < 360; j += 10) {
      let rad = i * 30;
      let x = rad * cos(j);
      let y = rad * sin(j);

      vertex(x, y);
    }
    endShape(CLOSE);
  }
}
