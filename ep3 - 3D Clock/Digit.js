///shayantaherkhani.ir
class Digit {
	constructor(pos, num) {
		this.pos = pos;
		this.num = num;
		this.tabs = [];
		for (let i = 0; i < 20; i += 2) {
			let pos = this.pos;
			let dim = createVector(0.45 * height / 2, height / 5, 2);
			let front = flaps[i % 20];
			let back = flaps[(i + 3) % 20];
			let tab = new Flap(pos, dim, front, back, ((i / 2) + (10 - num)) % 10);
			this.tabs.push(tab);
		}
		this.ticker = new p5.Noise('white');
		this.env = new p5.Envelope(0.005, 0.5, 0.01, 0);
		this.ticker.pan(map(this.pos.x, -0.62*height, 0.62*height, -0.5, 0.5));
		this.ticker.start();
		this.ticker.amp(0);
	}
	show() {
		push();
		translate(this.pos);
		rotateZ(HALF_PI);
		noStroke(0);
		specularMaterial(100);
		fill(155);
		cylinder(height / 300, 0.46 * height / 2);
		fill(cmode);
		for (let x of [-0.45 * height / 6, 0, 0.45 * height / 6]) {
			push();
			translate(0, x, 0);
			cylinder(height / 150, 0.45 * height / 7);
			pop();
		}
		pop();
		for (let i = 0; i < this.tabs.length; i++) {
			this.tabs[i].val = (i + this.num) % 10;
		//	if (this.tabs[i].val <= 1 || this.tabs[i].val >= 8) 
				this.tabs[i].show(); //showing only a few flaps keeps the animation smooth
		}
	}
	flip() {
		setTimeout(this.flap, 250);
		for (let i = 0; i < this.tabs.length; i++) {
			this.tabs[i].val = (i + this.num) % 10;
		}
	}
	flap() {
		env.play(this.ticker);
	}
}