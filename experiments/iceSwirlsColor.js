// This code is inspired by the code "coding-projects/Flow field script.js" by [Colorful Coding] (Published: 2020-12-21). URL: https://github.com/colorful-coding/coding-projects/commits/main/Flow%20field/script.js
let points = [];
let currentColor, targetColor;
let lerpAmount = 0;

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

  currentColor = color(random(255), random(255), random(255));
  targetColor = color(random(255), random(255), random(255));

  background("#000000");
}

function draw() {
  noStroke();
  let mult = 0.02;

  //COLOR
  //Inspiration from previous code and assisted by ChatGPT
  let blendedColor = lerpColor(currentColor, targetColor, lerpAmount);

  lerpAmount += 0.01;
  if (lerpAmount >= 1) {
    currentColor = targetColor;
    targetColor = color(random(255), random(255), random(255));
    lerpAmount = 0;
  }

  for (let i = 0; i < points.length; i++) {
    fill(
      blendedColor.levels[2],
      blendedColor.levels[1],
      blendedColor.levels[3],
      20
    );
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
