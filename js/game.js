/*
* KeyCodes: [[LEFT, 37], [UP, 38], [RIGHT, 39], [DOWN, 40]]
* Thanks to: http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/ for helping me figure out the timing and the inputs (since I'm so horrible at maths)
*/
var ctx;
var game = {
    keys: {}
}
function generatePlayer() {
    this.x = 225;
    this.y = 255;
    this.size = 50;
    this.speed = 4;
    this.updatePosition = function (keyCodes, modifier) {
	if(37 in keyCodes) { // move:left
	    this,x =- this.speed * modifier;
	} if(38 in keyCodes) { // move:up
	    this.y =- this.speed * modifier;
	} if(39 in keyCodes) { // move:right
	    this.x =+ this.speed * modifier;
	} if(40 in keyCodes) { // move:down
	    this.y =+ this.speed * modifier;
	}
    }
}
function loop() {
    ctx.clearRect(0, 0, 500, 500);
    ctx.fillRect(game.player.x, player.y, 50, 50);
}
$(document).ready(function() {
    var canvas = $("#canvas");
    var ctx = document.getElementById("canvas").getContext("2d");
    addEventListener("keydown", function(event) {
	game.keys[event.keyCode] = true;
	console.log(game.keys);
    });
    addEventListener("keyup", function(event) {
	delete game.keys[event.keyCode];
	console.log(game.keys);
    });
});
function update() {
}
function render() {
}
function loop() {
    update();
    render();
}
