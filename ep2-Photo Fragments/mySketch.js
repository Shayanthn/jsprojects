///Photo Fragments by Shayan IG : Coding1dea
var img;
var drips = [];
var interval;
let counter = 0;

function preload() {
	img = loadImage("Monroe-Square.png");
}

function setup() {
	img.resize(windowHeight, 0);
	createCanvas(img.height, img.width);
	interval = img.height / 50;
	angleMode(DEGREES);
	noStroke();
	for (let y = interval / 2; y <= img.height; y += interval) {
		for (let x = interval / 2; x <= img.width; x += interval) {
			let c = img.get(x, y);
			c[3] = 200;
			let id = c[0] + c[1] + c[2];
			if (id > 0) {
				drips.push(new Pixel(x, y, c, id));
			}
		}
	}
}

function draw() {
	counter += 2;
	background(0);
	for (let d of drips) {
		if (d.id < counter) {
			d.move();
			if (d.y > 0) {
				d.show();
			}
		}
	}
}






































