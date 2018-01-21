/*
* A Breakout clone built in HTML5
* TODO: Utilize something like a render queue (an Array that contains class
* instance of everything that needs to be rendered, so we can loop through the
* array in our game.draw() function to make adding new visual elements easier)
* TODO: Create three parts of the paddle that makes the ball bounce at different
* angles depending on which part you hit (to give the player some more control)
* TODO: Change the ball's velocity on impact with the paddle depeding on if the
* paddle is moving, and in which direction
*/
var game;
function randRange(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
function Game(width, height, canvasID) { // Constructor function for the game
	this.width = width;
	this.height = height;
	this.canvas = $("#" + canvasID).attr("width", this.width).attr("height", this.height);
	this.ctx = this.canvas[0].getContext("2d");
	this.paddle = new Paddle(50, 10, 10, "#0DD", this);
	this.ball = new Ball(this);
	this.framerate = 60;
	this.renderQueue = [];
	this.totalBlockRows = 6;
	this.colorPreference = randRange(1, 3);
	this.blockRows = [];
	this.speedChangeFactor = 0.9;
	this.inputHandler = new InputHandler();
	this.score = 0;
	this.lives = 3;
	this.reset = function() {
		this.ball = new Ball(this);
	}
	this.generateBlockRows = function() {
		for (var i = 0; i < this.totalBlockRows; i++) {
			var row = new BlockRow(this, i, this.colorPreference);
			this.blockRows.push(row);
			row.generateBlocks();
		}
	}
	this.drawBlockRows = function() {
		for (var i = 0; i < this.blockRows.length; i++) {
			this.blockRows[i].draw();
		}
	}
	this.setup = function() {
		this.bg = this.ctx.createLinearGradient(0, 0, this.height, this.width);
		this.bg.addColorStop(0, "#111");
		this.bg.addColorStop(1, "#AAA");
		this.generateBlockRows();
		this.draw();
	}
	this.draw = function() {
		this.ctx.fillStyle = this.bg;
		this.ctx.font = "30px Arial";
		this.ctx.fillRect(0, 0, this.width, this.height);
		this.drawBlockRows();
		this.ball.draw();
		this.paddle.draw();
		this.ctx.fillStyle = "#FFF";
		this.ctx.fillText("Lives: " + this.lives, 10, this.height - this.paddle.offset - this.paddle.height - 10);
		this.ctx.fillText("Score: " + this.score, this.width - 10 - this.ctx.measureText("Score: " + this.score).width, this.height - this.paddle.offset - this.paddle.height - 10);
	}
	this.loop = function() {
		if(this.inputHandler.pressed[this.inputHandler.Key.A]) {
			this.paddle.move(this.paddle.Direction.LEFT);
			this.paddle.isMoving = this.paddle.Direction.LEFT;
		} else if(this.inputHandler.pressed[this.inputHandler.Key.D]) {
			this.paddle.move(this.paddle.Direction.RIGHT);
			this.paddle.isMoving = this.paddle.Direction.RIGHT;
		} else {
			this.paddle.isMoving = false;
		}
		if(this.ball.x + this.ball.radius * 2 > this.width || this.ball.x < 0) {
			this.ball.bounce(this.ball.Axis.X);
		} else if(this.ball.x > this.paddle.x && this.ball.x < this.paddle.x + this.paddle.width && this.ball.y + this.ball.radius * 2 > this.paddle.y && this.ball.y + this.ball.radius * 2 < this.paddle.y + this.paddle.height || this.ball.y < 0) {
			if(this.paddle.isMoving) {
				console.log(this.paddle.isMoving);
				if(this.paddle.isMoving == this.paddle.Direction.RIGHT && this.ball.currentDirection == "DOWN_RIGHT") {
					this.ball.speed /= this.speedChangeFactor;
				} else if(this.paddle.isMoving == this.paddle.Direction.LEFT && this.ball.currentDirection == "DOWN_LEFT") {
					this.ball.speed /= this.speedChangeFactor;
				} else if(this.paddle.isMoving == this.paddle.Direction.RIGHT && this.ball.currentDirection == "DOWN_LEFT") {
					this.ball.speed *= this.speedChangeFactor;
				} else if(this.paddle.isMoving == this.paddle.Direction.LEFT && this.ball.currentDirection == "DOWN_RIGHT") {
					this.ball.speed *= this.speedChangeFactor;
				}

				console.log(this.score);
			}
		this.ball.bounce(this.ball.Axis.Y);
		}
		if(this.ball.y > this.height) {
			if(this.lives < 0) {
			} else {
				this.lives--;
				this.reset();
			}
		}
		for (var row = 0; row < this.blockRows.length; row++) {
			for (var block = 0; block < this.blockRows[row].blocks.length; block++) {
				var currentBlock = this.blockRows[row].blocks[block];
				if(this.ball.x > currentBlock.x && this.ball.x < currentBlock.x + currentBlock.width) { // Hit a side on the Y axis
					if(this.ball.y == currentBlock.y) { // Hit from above
						this.ball.bounce(this.ball.Axis.X);
						this.blockRows[row].blocks.splice(block, 1);
						this.score++;
					} else if(this.ball.y == currentBlock.y + currentBlock.height) { // Hit from below
						this.ball.bounce(this.ball.Axis.Y);
						this.blockRows[row].blocks.splice(block, 1);
						this.score++;
					}
				}
				else if(this.ball.y > currentBlock.y && this.ball.y < currentBlock.y + currentBlock.height) { // Hit a side on the X Axis
					if(this.ball.x + this.ball.radius * 2 == currentBlock.x) { // Hit left side
						this.ball.bounce(this.ball.Axis.X);
						this.blockRows[row].blocks.splice(block, 1);
						this.score++;
					} else if(this.ball.x == currentBlock.x + currentBlock.width) { // Hit right side
						this.ball.bounce(this.ball.Axis.X);
						this.blockRows[row].blocks.splice(block, 1);
						this.score++;
					}
				} if(this.ball.y > currentBlock.y && this.ball.y < currentBlock.y + currentBlock.height && this.ball.x > currentBlock.x && this.ball.x < currentBlock.x + currentBlock.width) { // Got stuck due to poor collision detection
					this.ball.bounce(this.ball.Axis.X);
					this.ball.bounce(this.ball.Axis.Y);
					this.blockRows[row].blocks.splice(block, 1);
					this.score++;
				}
			}
		}
		this.ball.move();
		this.draw();
	}
}
function InputHandler() {
	this.Key = {
		LEFT: 37,
		RIGHT: 93,
		A: 65,
		D: 68
	}
	this.pressed = {}
	this.onKeyDown = function(event) {
		this.pressed[event.keyCode] = (new Date()).getTime();
	}
	this.onKeyUp = function(event) {
		delete this.pressed[event.keyCode];
	}
}
function BlockRow(game, rowNumber, colorPreference) {
	this.colorPreference = colorPreference;
	this.blockMinWidth = 20;
	this.blockMaxWidth = 80;
	this.rowNumber = rowNumber;
	this.xMargin = 10;
	this.yMargin = 7;
	this.rowHeight = 50;
	this.blocks = [];
	this.draw = function() {
		for (var i = 0; i < this.blocks.length; i++) {
			this.blocks[i].draw();
		}
	}
	this.generateBlocks = function() {
		var startX = this.xMargin;
		while(startX < game.width) {
			if(startX + this.blockMaxWidth + this.xMargin < game.width) {
				var width = randRange(this.blockMinWidth, this.blockMaxWidth);
			} else {
				var width = game.width - startX - this.xMargin;
			}
			var block = new Block(startX, (this.rowNumber * this.rowHeight + this.yMargin * 2 * this.rowNumber) + this.yMargin, width, this.rowHeight + this.yMargin, this.colorPreference, game);
			block.generateColor();
			this.blocks.push(block);
			startX += width + this.xMargin;
		}
		console.log(this.blocks);
	}
}
function Block(x, y, width, height, colorPreference, game) {
	this.x = x;
	this.colorPreference = colorPreference;
	this.y = y;
	this.rgb = [];
	this.generateColor = function() {
		for (var i = 0; i < 4; i++) {
			if(i+1 == this.colorPreference) {
				this.rgb.push(randRange(125, 255));
			} else {
				this.rgb.push(randRange(1, 125));
			}
		}
	}
	this.width = width;
	this.height = height;
	this.draw = function() {
		game.ctx.fillStyle = "rgb(" + this.rgb[0] + ", " + this.rgb[1] + ", " + this.rgb[2] + ")"
		game.ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}
function Ball(game) {
	this.Axis = {
		X: 0,
		Y: 1
	}
	this.Direction = {
		"1,1": "DOWN_RIGHT",
		"-1,1": "DOWN_LEFT",
		"-1,-1": "UP_LEFT",
		"1,-1": "UP_RIGHT"
	}
	this.currentDirection = "DOWN_RIGHT";
	this.speed = 1;
	this.dx = 1;
	this.dy = 1;
	this.radius = 4;
	this.x = game.width / 2 - this.radius;
	this.y = game.height / 2 - this.radius;
	this.draw = function() {
		game.ctx.fillStyle = "#000";
		game.ctx.beginPath();
		game.ctx.arc(this.x + this.radius, this.y + this.radius, this.radius, 0, 2 * Math.PI);
		game.ctx.fill();
		game.ctx.closePath();
	}
	this.bounce = function(face) {
		if(face == this.Axis.X) {
			this.dx = -this.dx;
		} else if(face == this.Axis.Y) {
			this.dy = -this.dy;
		}
		this.currentDirection = this.Direction[this.dx + "," + this.dy];
		console.log(this.Direction[this.dx + "," + this.dy]);
	}
	this.move = function() {
		this.x += this.dx * this.speed;
		this.y += this.dy * this.speed;
	}
}
function Paddle(width, height, bottomOffset, color, game) { // Constructor function for the player paddle
	this.speed = 1;
	this.width = width;
	this.height = height;
	this.color = color;
	this.offset = bottomOffset;
	this.Direction = {
		LEFT: 1,
		RIGHT: 2
	}
	this.x = game.width / 2 - this.width / 2; // Set the initial x position of the paddle to the middle
	this.y = game.height - this.height - this.offset; // Set the paddle bottom facing side `bottomOffset` px from the bottom
	this.draw = function() {
		game.ctx.globalAlpha = 0.5;
		game.ctx.fillStyle = this.color;
		game.ctx.fillRect(this.x, this.y, this.width, this.height);
		game.ctx.globalAlpha = 1;
	}
	this.move = function(direction) {
		if(direction == this.Direction.LEFT && this.x - this.speed > 0) {
			this.x -= this.speed;
		} else if(direction == this.Direction.RIGHT && this.x + this.speed < game.width - this.width) {
			this.x += this.speed;
		}
	}
}
var loop;
$(document).ready(function() {
	game = new Game(500, 800, "canvas");
	game.setup();
	window.addEventListener("keyup", function(event) {
		game.inputHandler.onKeyUp(event);
	});
	window.addEventListener("keydown", function(event) {
		game.inputHandler.onKeyDown(event);
	});
	loop = setInterval(function() {
		game.loop()
	}, 1000 / this.framerate);
});
