
// Main canvas width and height
let w, h;

// Get the canvas context for drawing
const ctx = canvas.getContext("2d");

// Math shortcuts for easier use
const { sin, cos, PI, hypot, min, max } = Math;




// This function creates a new spider object
function spawn() {
    // Create many random points for the web
    const pts = many(333, () => {
        return {
            x: rnd(innerWidth),
            y: rnd(innerHeight),
            len: 0,
            r: 0
        };
    });

    // Points for spider legs (circle around the body)
    const pts2 = many(9, (i) => {
        return {
            x: cos((i / 9) * PI * 2),
            y: sin((i / 9) * PI * 2)
        };
    });

    // Spider movement and random seeds
    let seed = rnd(100)
    let tx = rnd(innerWidth); // target x
    let ty = rnd(innerHeight); // target y
    let x = rnd(innerWidth)   // current x
    let y = rnd(innerHeight)  // current y
    let kx = rnd(0.5, 0.5)
    let ky = rnd(0.5, 0.5)
    let walkRadius = pt(rnd(50,50), rnd(50,50))
    let r = innerWidth / rnd(100, 150);

    // Draw one web point and its legs
    function paintPt(pt){
        pts2.forEach((pt2) => {
            if (!pt.len )
                return
            drawLine(
                lerp(x + pt2.x * r, pt.x, pt.len * pt.len),
                lerp(y + pt2.y * r, pt.y, pt.len * pt.len),
                x + pt2.x * r,
                y + pt2.y * r
            );
        });
        drawCircle(pt.x, pt.y, pt.r);
    }

    // Return the spider object with follow and tick methods
    return {
        // Move spider target to mouse
        follow(x,y) {
            tx = x;
            ty = y;
        },

        // Update spider and web animation
        tick(t) {
            // Spider's own random walk
            const selfMoveX = cos(t*kx+seed)*walkRadius.x        
            const selfMoveY = sin(t*ky+seed)*walkRadius.y      
            let fx = tx + selfMoveX;         
            let fy = ty + selfMoveY; 

            // Move spider smoothly
            x += min(innerWidth/100, (fx - x)/10)
            y += min(innerWidth/100, (fy - y)/10)

            // Animate web points
            let i = 0
            pts.forEach((pt) => {
                const dx = pt.x - x,
                    dy = pt.y - y;
                const len = hypot(dx, dy);
                let r = min(2, innerWidth / len / 5);
                pt.t = 0;
                const increasing = len < innerWidth / 10 
                    && (i++) < 8;
                let dir = increasing ? 0.1 : -0.1;
                if (increasing) {
                    r *= 1.5;
                }
                pt.r = r;
                pt.len = max(0, min(pt.len + dir, 1));
                paintPt(pt)
            });
        } 
    }
}


// Create two spiders
const spiders = many(2, spawn)


// Move spiders when mouse moves
addEventListener("pointermove", (e) => {
    spiders.forEach(spider => {
        spider.follow(e.clientX, e.clientY)
    })
});


// Main animation loop
requestAnimationFrame(function anim(t) {
    // Resize canvas if needed
    if (w !== innerWidth) w = canvas.width = innerWidth;
    if (h !== innerHeight) h = canvas.height = innerHeight;
    // Draw black background
    ctx.fillStyle = "#000";
    drawCircle(0, 0, w * 10);
    // Set color for spider and web
    ctx.fillStyle = ctx.strokeStyle = "#fff";
    t/=1000
    // Update and draw each spider
    spiders.forEach(spider => spider.tick(t))
    requestAnimationFrame(anim);
});


// (Unused) Helper to recalculate target
function recalc(X, Y) {
    tx = X;
    ty = Y;
}


// Get a random number between dx and x+dx
function rnd(x = 1, dx = 0) {
    return Math.random() * x + dx;
}


// Draw a filled circle (used for spider body and web points)
function drawCircle(x, y, r, color) {
    ctx.beginPath();
    ctx.ellipse(x, y, r, r, 0, 0, PI * 2);
    ctx.fill();
}


// Draw a wavy line (used for spider legs and web)
function drawLine(x0, y0, x1, y1) {
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    many(100, (i) => {
        i = (i + 1) / 100;
        let x = lerp(x0, x1, i);
        let y = lerp(y0, y1, i);
        let k = noise(x/5+x0, y/5+y0) * 2;
        ctx.lineTo(x + k, y + k);
    });
    ctx.stroke();
}


// Create an array of n items using function f
function many(n, f) {
    return [...Array(n)].map((_, i) => f(i));
}


// Linear interpolation between a and b
function lerp(a, b, t) {
    return a + (b - a) * t;
}


// Simple noise function for wavy lines
function noise(x, y, t = 101) {
    let w0 = sin(0.3 * x + 1.4 * t + 2.0 + 
                 2.5 * sin(0.4 * y + -1.3 * t + 1.0));
    let w1 = sin(0.2 * y + 1.5 * t + 2.8 + 
                 2.3 * sin(0.5 * x + -1.2 * t + 0.5));
    return w0 + w1;
}


// Create a point object
function pt(x,y){
    return {x,y}
}