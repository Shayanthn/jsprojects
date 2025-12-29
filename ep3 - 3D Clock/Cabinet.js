///Coded by Shayan Taherkhani IG : Coding1dea
function makeCabinet() {
	fill(cmode);
	cabinet = csg(() => box(1.55 * height, height / 1.8, height / 4)).union(() => {
		for (let x of [-height / 1.65, height / 1.65]) {
			for (let z of [-height / 15, height / 15]) {
				push();
				translate(x, height / 3.6 + height / 72, z);
				cylinder(height / 24, height / 36);
				pop();
			}
		}
	}).subtract(() => {
		push();
		translate(-0.5*height, 0, height / 15);
		box(0.48 * height, height / 2.2, height / 3);
		translate(0.5*height, 0, height / 15);
		box(0.48 * height, height / 2.2, height / 3);
		translate(0.5*height, 0, height / 15);
		box(0.48 * height, height / 2.2, height / 3);
		pop();
	}).done();
}





















