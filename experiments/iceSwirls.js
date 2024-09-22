// This code is inspired by the code "coding-projects/Flow field script.js" by [Colorful Coding] (Published: 2020-12-21). URL: https://github.com/colorful-coding/coding-projects/commits/main/Flow%20field/script.js
let points = [];

function setup() {
  createCanvas(innerWidth, innerHeight);
  pixelDensity(2);
  angleMode(DEGREES);
  noiseDetail(1);

  let density = 50;

  for (let x = 0; x <= width; x += width / density) {
    for (let y = 0; y <= height; y += width / density) {
      let p = createVector(x + random(-20, 20), y + random(-20, 20));
      points.push(p);
    }
  }

  background("#0077B6");
}

function draw() {
  noStroke();

  let mult = 0.02;

  //COLOR
  //"COLOR" assisted by ChatGPT
  let colors = [
    color("#0077B6"),
    color("#ADE8F4"),
    color("#00B4D8"),
    color("#0096C7"),
    color("#FFFFFF"),
  ];
  for (let i = 0; i < points.length; i++) {
    let t = map(points[i].x, 0, width, 0, 0.7);

    let blendedColor;
    if (t <= 0.25) {
      blendedColor = lerpColor(colors[0], colors[1], t * 4);
    } else if (t <= 0.5) {
      blendedColor = lerpColor(colors[1], colors[2], (t - 0.25) * 4);
    } else if (t <= 0.75) {
      blendedColor = lerpColor(colors[2], colors[3], (t - 0.5) * 4);
    } else {
      blendedColor = lerpColor(colors[3], colors[4], (t - 0.75) * 4);
    }
    blendedColor.setAlpha(50);
    fill(blendedColor);
    //END COLOR

    let angle = map(
      noise(points[i].x * mult, points[i].y * mult),
      0,
      1,
      0,
      720
    );

    points[i].add(createVector(cos(angle), sin(angle)));

    ellipse(points[i].x, points[i].y, 2);

    if (points[i].x > width) points[i].x = 1;
    if (points[i].x < 0) points[i].x = width;
    if (points[i].y > height) points[i].y = 1;
    if (points[i].y < 0) points[i].y = height;
  }
}
