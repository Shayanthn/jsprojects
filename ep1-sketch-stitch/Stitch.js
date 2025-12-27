class Stitch {
	constructor(pos, ang, len, f, row, col) {
		let startx = -pos.x / 2;
		this.pos = createVector(startx, height / 2);
		this.tpos = pos;
		this.ang = 0;
		this.tang = ang;
		this.len = len;
		this.f = f;
		this.row = row;
		this.col = col;
		this.counter = 0;
		this.alive = true;
		this.t = 0;
		this.q = 0;
		this.id = row * cols + col;
	}
	show() {
		let dang = map(this.pos.y, height/2, this.tpos.y, 0, PI);
		let mult = 1 + 3*sin(dang);
		push();
		translate(this.pos.x, this.pos.y);
		rotate(this.ang);
		strokeWeight(1)
		fill(this.f);
		ellipse(0, 0, this.len / 2.5, mult * this.len);
		pop();
	}
	stamp() {
		finished.push();
		finished.translate(width / 2, height / 2);
		finished.translate(this.pos);
		finished.strokeWeight(random(1, 2));
		finished.scale(random(0.8, 1.1), 1); // A little variation adds texture!
		finished.rotate(this.ang);
		finished.fill(this.f);
		finished.ellipse(0, 0, this.len / 2.5, this.len);
		finished.pop();
	}
	move() {
		let q = ease['maclaurinCosine'](this.t);
		this.t += 0.01;
		this.t = constrain(this.t, 0.0, 1.0);
		this.counter += 1;
		this.pos.lerp(this.tpos, q);
		if (this.counter > 25) this.ang = lerp(this.ang, this.tang, 0.2);
		else this.ang = HALF_PI + atan2(this.tpos.y - this.pos.y, this.tpos.x - this.pos.x);
		if (this.counter > 35) {
			this.stamp();
			this.alive = false;
		}
	}
}