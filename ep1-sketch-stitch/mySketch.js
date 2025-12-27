let imgs = [];
let stitches = [];
let finished;
const rows = 120;
const cols = 120;
let zoom = 1;
let tzoom = 1;
let ease;
let pattern = 1;
let cx, tcx;

function preload() {
	imgs.push(loadImage('pattern1.jpg'));
	imgs.push(loadImage('pattern2.jpg'));
	imgs.push(loadImage('pattern3.jpg'));
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	finished = createGraphics(width, height);
	for (let i of imgs) i.resize(cols, 0);
	makeStitches();
	ease = new p5.Ease();
	imageMode(CENTER);
}

function makeStitches() {
	cx = width;
	tcx = width/2;
	finished.background(0);
	for (let row = 0; row < rows; row++) {
		for (let col = 0; col < cols; col++) {
			let x = map(col, 0, cols - 1, -height / 2.05, height / 2.05);
			let y = map(row, 0, rows - 1, -height / 2.05, height / 2.10);
			let pos = createVector(x, y);
			let ang = -PI / 8 + (col % 2) * PI / 4;
			let len = 1.66 * height / rows;
			let f = color(imgs[pattern].get(col, row));
			f.setAlpha(200);
			let scol = col;
			if (row % 2) scol = cols - col;
			let stitch = new Stitch(pos, ang, len, f, row, scol);
			stitches.push(stitch);
		}
	}
	stroke(255, 30);
	strokeWeight(2);
	finished.stroke(255, 30);
	finished.strokeWeight(2);
}

function draw() {
	background(0);
	cx = lerp(cx, tcx, 0.1);
	stitches = stitches.filter(s => s.alive);
	translate(cx, zoom * height / 2 - (zoom - 1) * min(frameCount / 6, height));
	zoom = lerp(zoom, tzoom, 0.1);
	scale(zoom);
	image(finished, 0, 0);
	for (let s of stitches) {
		if (frameCount * 4 > s.id) {
			s.move();
			s.show();
		}
	}
}

function mouseWheel(event) {
	tzoom += event.delta / 500;
	tzoom = constrain(tzoom, 1, 4)
}

function mousePressed() {
	pattern = (pattern + 1) % imgs.length;
	stitches = [];
	frameCount = -60;
	tzoom = 1;
	tcx = -width;
	setTimeout(makeStitches, 1000);
}