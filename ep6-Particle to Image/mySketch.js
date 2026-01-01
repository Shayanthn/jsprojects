///Coded by Shayan Taherkhani
///IG : Coding1dea

OPC.slider('curliness', 1, 0, 3);
OPC.slider('velocity', 1, 0.1, 10);
OPC.toggle('screenshot', false);

let img;
let particles = [];
let edgeColour;

function preload(){
	img = loadImage("shayan.JPG");
}

function setup() {
	createCanvas(1112, 834);
	img.resize(width, 0);
	background(255);

	
	colorMode(HSB, 255);
	
	edgeColour = color(random(255), 255, 255, 10);
	
	for(let i = 0; i < 600; i++){
		particles[i] = new Particle(edgeColour, curliness);
	}
}



function draw() {
	if (screenshot == true){
    save("img_" + month() + '-' + day() + '_' + hour() + '-' + minute() + '-' + second() + ".jpg");
		screenshot = false;
	}

	for(let i = 0; i < particles.length; i++){
      
      
    if(particles[i].pos.y < 0 || particles[i].pos.y > height 
			                        || particles[i].pos.x < 0 
			                        || particles[i].pos.x > width)
		{
			
      particles[i] = new Particle(edgeColour);
    }
    
    particles[i].update(velocity);
    particles[i].show();
  }
}























































