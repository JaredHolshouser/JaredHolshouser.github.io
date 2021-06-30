(function() {
	// Obtain a reference to the canvas element using its id.
	var canvas = document.getElementById("headPic");
			
	// Obtain a graphics context on the canvas element for drawing.
	var ctx = canvas.getContext("2d");		
				
	// The colors for the squares
	var colors = new Array("#6A558C","#E85A4F","#8E8D8A");
		
	// Setting the colors randomly
	var leftTriangle = new Array(4);
	for(y=0;y<4;y++) {
		leftTriangle[y] = new Array(y+1);
		for(x=0;x<=y;x++) {
			leftTriangle[y][x] = colors[getRandomInt(0,2)];
		}
	}
	var rightTriangle = new Array(4);
	for(y=0;y<4;y++) {
		rightTriangle[y] = new Array(4-y);
		for(x=0;x<4-y;x++) {
			rightTriangle[y][x] = colors[getRandomInt(0,2)];
		}
	} 
	// Start listening to resize events and draw canvas.
	initialize();
 
	function initialize() {
		// Register an event listener to call the resizeCanvas() function each time the window is resized.
		window.addEventListener("resize", resizeCanvas, false);			
		// Draw canvas border for the first time.
		resizeCanvas();
	}
				
	// Display custom canvas.				
	function redraw() {
		// Getting dimensions for the drawing
		var incr = canvas.height/4;
		var boxDim = incr;				
		// Drawing the left triangle
		for(y=0;y<4;y++){
			for(x=0;x<=y;x++){
				//alert("Draw left tri at x-pos "+ x + " and y-pos " + y + " with fill color " + leftTriangle[y][x]);
				ctx.fillStyle = leftTriangle[y][x];
				ctx.fillRect(x*incr,y*incr,boxDim,boxDim);
			}
		}	
		// Drawing my name
		ctx.fillStyle = "black";
		ctx.font = boxDim + "px Arial";
		ctx.textAlign = "center";
		ctx.fillText("Jared Holshouser", canvas.width/2, canvas.height/4);	
		// Drawing my title
		ctx.font = boxDim/2 + "px Arial";
		ctx.fillText("professor of Mathematics", canvas.width/2, 3*canvas.height/4);	
		// Drawing the right triangle
		for(y=0;y<4;y++){
			for(x=0;x<4-y;x++){
				ctx.fillStyle = rightTriangle[y][x];
				ctx.fillRect(ctx.canvas.width-((x+1)*incr),y*incr,boxDim,boxDim);
			}
		}
	}
		
	// Runs each time the DOM window resize event fires. Resets the canvas dimensions to match window, then draws the new borders accordingly.
	function resizeCanvas() {
		// Obtain a reference for the body
		var body = document.getElementsByTagName("BODY")[0];
		// If the body is cell-phone size, hardcode the width of the canvas
		if(body.clientWidth == 600) {
			ctx.canvas.width = 600-36;
		}
		// If the body is not cell-phone size, dynamically set the width of the canvas
		else {
			ctx.canvas.width = window.innerWidth - 70;
		}
		// The canvas height is a fixed proportion of the width
		ctx.canvas.height = ctx.canvas.width/5;
		// Actually draw now
		redraw();
		}
			
	// Returns a random integer between min (inclusive) and max (inclusive). Using Math.round() will give you a non-uniform distribution!
	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
})();
