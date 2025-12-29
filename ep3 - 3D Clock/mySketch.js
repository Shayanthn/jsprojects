let flaps = [];
let tabs = [];
let ease;
let q = 0;
let t = 0;
let tick, env;
let digits = [];
let lsec = 0;
let timeon = false;
let cmode = 0; //0 = dark mode; //255 = light mode

function preload() {
	font = loadFont('BebasNeue-Regular.ttf');
}

function setup() {
	createCanvas(windowWidth-1, windowHeight-1, WEBGL);
	makePanels();
	makeCabinet();
	imageMode(CENTER);
	ease = new p5.Ease()
	tick = new p5.Noise('white');
	env = new p5.Envelope(0.005, 0.5, 0.01, 0);
	let xpos = [-0.62 * height, -0.385 * height, -0.1175 * height, 0.1175 * height, 0.385 * height, 0.62 * height];
	for (let x of xpos) {
		let d = new Digit(createVector(x, 0, 0), 0);
		digits.push(d);
	}
	tick.start();
	tick.amp(0);

	describe('A 3D digital clock in a retro style with a flip-digit display.');
}

function makePanels() {
	let panels = [];
	for (let i = 0; i < 10; i++) {
		let p = createGraphics(0.225 * height, height / 2.5);
		p.textAlign(CENTER, CENTER);
		p.textSize(height / 2);
		p.textFont(font);
		p.clear();
		p.fill(255 - cmode);
		p.text(i, p.width / 2, p.height / 2.7);
		panels.push(p);
	}
	for (let p of panels) {
		upper = p.get(0, 0, p.width, 0.49 * p.height);
		lower = p.get(0, 0.5 * p.height, p.width, 0.49 * p.height);
		let f = createGraphics(p.width, p.height / 2);
		f.image(upper, 0, 0.01 * p.height);
		flaps.push(f);
		f = createGraphics(p.width, p.height / 2);
		f.image(lower, 0, -0.01 * p.height);
		flaps.push(f);
	}
}

function draw() {
	background(cmode / 1.5);
	orbitControl();
	ambientLight(120);
	pointLight(120, 120, 120, height / 2, -height / 2, height);
	t += 0.05;
	t = constrain(t, 0, 1);
	q = ease['cubicOut'](t);
	scale(0.9);
	specularMaterial(100);
	model(cabinet);
	translate(0, 0, height / 12)
	specularMaterial(cmode);
	for (let d of digits) {
		d.show();
	}
	if (timeon && lsec != second()) {
		updateDisplay();
	}
}

function updateDisplay() {
	t = 0;
	digits[5].num = (10 - second() % 10);
	digits[5].flip();
	digits[4].num = 10 - floor(second() / 10);
	digits[4].flip();
	digits[3].num = (10 - minute() % 10);
	digits[3].flip();
	digits[2].num = 10 - floor(minute() / 10);
	digits[2].flip();
	let h = hour();
	if (h > 12) h -= 12;
	digits[1].num = (10 - h % 10);
	digits[1].flip();
	digits[0].num = 10 - floor(h / 10);
	digits[0].flip();
	lsec = second();
}

function makeTick(pan) {
	tick.start();
	tick.pan(pan)
	env.play(tick);
}

function mousePressed() {
	if (timeon) return;
	lsec = second();
	userStartAudio();
	setH1();
	setTimeout(setH2, 100);
	setTimeout(setM1, 200);
	setTimeout(setM2, 300);
	setTimeout(setS1, 400);
	setTimeout(setS2, 500);
}

function setH1() {
	t = 0;
	setTimeout(makeTick, 200, -0.5);
	let h = hour();
	if (h > 12) h -= 12;
	digits[0].num = 10 - floor(h / 10);
	digits[0].flip();
}

function setH2() {
	t = 0;
	setTimeout(makeTick, 200, -0.25)
	let h = hour();
	if (h > 12) h -= 12;
	digits[1].num = (10 - h % 10);
	digits[1].flip();
}

function setM1() {
	t = 0;
	setTimeout(makeTick, 200, -0.15)
	digits[2].num = 10 - floor(minute() / 10);
	digits[2].flip();
}

function setM2() {
	t = 0;
	setTimeout(makeTick, 200, 0.15)
	digits[3].num = (10 - minute() % 10);
	digits[3].flip();
}

function setS1() {
	t = 0;
	setTimeout(makeTick, 200, 0.25)
	digits[4].num = 10 - floor(second() / 10);
	digits[4].flip();
}

function setS2() {
	t = 0;
	setTimeout(makeTick, 200, 0.5)
	digits[5].num = (10 - second() % 10);
	digits[5].flip();
	timeon = true;
}