var ctx;
var game = {
    player: {
	x: 225,
	y: 255,
	size: 50,
	speed: 4
    },
    keys: {}
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
