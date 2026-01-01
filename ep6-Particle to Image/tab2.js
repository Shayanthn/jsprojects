class Particle{
	
	constructor(){
		
		colorMode(RGB, 255);
		

		this.rand = random(1);
			
			
		this.pos = createVector(0, random(height));
		//this.pos = createVector(random(width), random(height));
		this.vel = createVector(1, 0);
		//this.vel.rotate(random(TWO_PI));
		
		this.c = color(0);
	}
	
	update(velocity){
		
		this.past = createVector(this.pos.x, this.pos.y);
		
		this.pos.add(p5.Vector.mult(this.vel, velocity));
		this.c = 0;
		
		let ratio = brightness(img.get(int(this.pos.x), int(this.pos.y))) / 255;

		this.vel.rotate(random(-HALF_PI * pow(ratio, 3-curliness), HALF_PI * pow(ratio, 3-curliness)));
		
		
		this.c = color(map(ratio, 0, 1, 0, red(edgeColour)),  
											 map(ratio, 0, 1, 0, green(edgeColour)),
											 map(ratio, 0, 1, 0, blue(edgeColour)),
										   200 - ratio * 255);
											 
	}
	
	show(){
		
		
		stroke(this.c);
		
		line(this.pos.x, this.pos.y, this.past.x, this.past.y);
	}
	
}