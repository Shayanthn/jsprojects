//Coded By Shayan IG: Coding1dea
let pos, tpos, orient;
let dip, tdip, bend;
let cmode;

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	pos = createVector(-2 * width, -height / 4, 0);
	tpos = createVector(0, -height / 4, -height);
	orient = createVector(0, PI, 0);
	dip = HALF_PI;
	tdip = HALF_PI;
	cmode = 0;
}

function draw() {
	background(0);
	noStroke();
	if (cmode == 0) {
		specularMaterial(200);
		ambientLight(20);
		pointLight(120, 0, 0, height, -height, height);
		pointLight(0, 120, 0, -height, -height, height);
		pointLight(0, 0, 120, 0, height, -height);

	} else {
		normalMaterial();
	}

// 		push();
// 		translate(0, 46 * height / 200, 0);
// 		rotateX(HALF_PI);
// 		plane(width, width);
// 		pop();
	
	if (!mouseIsPressed) {
		tpos.x = (mouseX - width / 2);
		tpos.z = 1.5 * (mouseY - 3 * height / 4);
		orient.x -= 5 * movedY / height;
		orient.z += 5 * movedX / width;
	}
	orient.y = map(mouseX, 0, width, -PI, PI);
	tpos.y = (-height / 4);
	orient.mult(0.8);
	pos.lerp(tpos, 0.1);
	dip = lerp(dip, tdip, 0.2);
	bend = map(dip, PI / 8, HALF_PI, 0, 1);
	if (mouseIsPressed) tdip = PI / 8;
	else tdip = HALF_PI;
	drawBody();
	drawLegs();
}

function drawBody() {
	translate(pos);
	rotateX(orient.x);
	rotateY(orient.y);
	rotateZ(orient.z);
	sphere(height / 12 + bend*(height/120), 7, 3);
	translate(0, height / 10, 0);
	cylinder(height / 80, height / 10);
	translate(0, height / 20, 0);
	cylinder(height / 28, height / 96);
	rotateX(HALF_PI);
	torus(height / 28, height / 180);
	for (let i = 0; i < 15; i++) {
		if (!mouseIsPressed) {
			rotateY(-orient.z / 10);
			rotateX(-orient.x / 10);
		}
		translate(0, 0, -height / 80 - (height / 120) * (1 - bend));
		push();
		rotateX(HALF_PI);
		cylinder(height / 40, height / 20);
		pop();
		torus(height / 40, height / 120);
	}
	translate(0, 0, -height / 100);
	rotateX(-HALF_PI);
	cylinder(height / 22, height / 80);
	rotateX(HALF_PI);
	torus(height / 22, height / 160);
	push();
	translate(0, 0, -height / 20);
	rotateX(-HALF_PI);
	cone(height / 40, height / 12);
	pop();
}

function drawLegs() {
	for (let i = 0; i < 6; i += 1) {
		push();
		rotateZ(i * TAU / 6);
		rotateX(HALF_PI);
		translate(height / 22, 0, 0);
		sphere(height / 120);
		let az = dip + (PI / 8) * (bend * sin((i * (TAU / 3)) + (abs(pos.x) + abs(pos.z)) / (20))) - PI/16;
		let ax = (PI / 8) * (bend * cos((i % 3) + (abs(pos.x) + abs(pos.z)) / (20)));
		rotateZ(-az);
		rotateX(ax);
		translate(0, height / 16, 0);
		cylinder(height / 192, height / 8);
		translate(0, height / 16, 0);
		sphere(height / 120);
		rotateX(-ax);
		rotateZ(az);
		translate(0, -height / 16, 0);
		cylinder(height / 192, height / 8);
		translate(0, -height / 16, 0);
		cylinder(height / 80, height / 192);
		pop();
	}
}

function keyPressed() {
	if (keyCode != 32) return;
	cmode = 1 - cmode;
}