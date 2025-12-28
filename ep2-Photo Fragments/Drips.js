class Pixel {
	constructor(x, y, c, id) {
		this.x = x;
		this.y = -300;
		this.yvel = 0;
		this.basex = x;
		this.basey = y;
		this.c = c;
		this.id = id;
		this.falling = true;
	}
	move() {
		this.y += this.yvel;
		if (this.y < this.basey) {
			this.yvel += 0.5;
		} else {
			this.y -= this.yvel;
			this.yvel *= -0.3;
			let d = dist(this.x, this.y, mouseX, mouseY);
			if (d < 100) {
				this.yvel -= 1000 / (d + 10);
			}
		}
	}
	show() {
		push();
		fill(this.c);
		translate(this.x, this.y);
		rotate(this.y - this.basey);
		rectMode(CENTER);
		rect(0, 0, 1.1 * interval);
		pop();
	}
}