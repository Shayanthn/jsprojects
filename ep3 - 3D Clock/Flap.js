class Flap {
	constructor(pos, dim, front, back, val) {
		this.pos = pos;
		this.dim = dim;
		this.front = front;
		this.back = back;
		this.ang = 0;
		this.tang = 0;
		this.val = val;
	}
	show() {
		this.tang = map(this.val, 0, 9, 0, PI);
		if (this.tang > this.ang) this.ang += TAU;
		this.ang = map(q, 0, 1, this.ang, this.tang);
		noStroke();
		push();
		translate(this.pos);
		rotateX(this.ang);
		translate(0, -this.dim.y / 1.9, 0);
		fill(cmode);
		specularMaterial(100);
		box(this.dim.x, this.dim.y, this.dim.z);
		push();
		translate(0, 0, this.dim.z / 1.99);
		texture(this.front);
		plane(this.front.width, this.front.height);
		pop();
		push();
		translate(0, 0, -this.dim.z / 1.99);
		scale(1, -1)
		texture(this.back);
		plane(this.back.width, this.back.height);
		pop();
		pop();
	}
}