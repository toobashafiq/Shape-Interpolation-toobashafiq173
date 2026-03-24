let shapeA = [], shapeB = [];
let drawingA = true, animating = false;
let t = 0, speed = 0.01;
let animationStartTime = 0;

function setup() {
  const canvas = createCanvas(900, 500);
  canvas.parent('canvas-container');
  textSize(16);
}

function draw() {
  background(245);

  fill(0);
  noStroke();
  text("1. LEFT CLICK: Draw Shape A", 20, 30);
  text("2. Press SPACEBAR: Switch to Shape B", 20, 50);
  text("3. Press S: Animate | R: Reset", 20, 70);

  // Draw shapes
  drawPoints(shapeA, "blue");
  drawPoints(shapeB, "red");

  // Animate interpolation
  if (animating && shapeA.length === shapeB.length) {
    stroke("green");
    strokeWeight(4);
    noFill();
    beginShape();

    for (let i = 0; i < shapeA.length; i++) {
      const x = lerp(shapeA[i].x, shapeB[i].x, t);
      const y = lerp(shapeA[i].y, shapeB[i].y, t);
      vertex(x, y);
    }

    endShape();

    t += speed;

    // Time display
    const elapsedTime = ((millis() - animationStartTime) / 1000).toFixed(2);
    noStroke();
    fill(0);
    text(`Animation Time: ${elapsedTime} sec`, 700, 30);

    if (t > 1 || t < 0) speed *= -1;
  }
}

function mousePressed() {
  if (animating) return;

  const point = { x: mouseX, y: mouseY };

  if (drawingA) {
    shapeA.push(point);
  } else if (shapeB.length < shapeA.length) {
    shapeB.push(point);
  }
}

function keyPressed() {
  if (key === " " && shapeA.length > 2) {
    drawingA = false;
  }

  if ((key === "s" || key === "S") && shapeA.length === shapeB.length) {
    animating = !animating;
    if (animating) animationStartTime = millis();
  }

  if (key === "r" || key === "R") {
    shapeA = [];
    shapeB = [];
    drawingA = true;
    animating = false;
    t = 0;
    speed = Math.abs(speed);
  }
}

function drawPoints(points, color) {
  stroke(color);
  strokeWeight(2);
  noFill();
  beginShape();

  points.forEach(pt => vertex(pt.x, pt.y));

  endShape();
}