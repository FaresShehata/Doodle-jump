let doodler;
let platforms = [];
let score = 0;
let doodlerRight;
let doodlerLeft;
let n = 30;


function setup() {
	createCanvas(400, 500);
	rectMode(CENTER);
	imageMode(CENTER);

	doodlerRight = loadImage("images/doodler_right.png");
	doodlerLeft = loadImage("images/doodler_left.png");

	doodler = new Doodler(width / 2, height - 150);

	for (let i = 0; i < n; i++) {
		platforms.push(
			new Platform(random(35, width - 35), random(-height, height))
		);
	}
}

function draw() {
	background(158, 216, 255);
	drawGrid();

	doodler.render();

	if (doodler.y < 50) {
		score += 10;
		scroll();
	}

	if (score % 400 == 0 && score != 0 && platforms.length < n) {
		for (let i = 0; i < 6; i++) {
			platforms.push(
				new Platform(random(35, width - 35), random(-height + 100, 0))
			);
		}
	}

	if (score % 10000 == 0 && score != 0) {
		n -= 5;
		n = constrain(n, 10, 30);
		console.log(n);
	}

	for (let i = platforms.length - 1; i >= 0; i--) {
		if (doodler.hits(platforms[i]) && doodler.yspeed > 0) {
			doodler.jump();
		}

		if (platforms[i].y - platforms[i].h / 2 > height) {
			platforms.splice(i, 1);
			break;
		}

		platforms[i].show();
	}


	if (doodler.y - doodler.h / 2 > height) gameOver();

	showScore();

}



function keyPressed() {
	if (key === "A") {
		doodler.moving = true;
		doodler.movingRight = false;
	} else if (key === "D") {
		doodler.moving = true;
		doodler.movingRight = true;
	}
}

function keyReleased() {
	if (key === "A" || key === "D")
		doodler.moving = false;
}

function drawGrid() {
	stroke(255, 100);
	for (let x = 0; x < width; x += 20)
		line(x, 0, x, height);
	for (let y = 0; y < height; y += 20)
		line(0, y, width, y);

}

function scroll() {
	doodler.y = 50;
	for (let p of platforms) p.y += abs(doodler.yspeed);
}

function showScore() {
	textSize(20);
	textAlign(LEFT, TOP);
	fill(255);
	stroke(0);
	text("Score: " + score, 10, 10);
}

function gameOver() {
	textSize(100);
	textAlign(CENTER, CENTER);
	fill(255, 10, 0);
	noStroke();
	text("GAME\nOVER", width / 2, height / 2);
	noLoop();
}