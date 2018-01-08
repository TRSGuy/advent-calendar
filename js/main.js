var animations = [
	{
		"name": "anim-0",
		"objects": [[4, "ball"]]
	}
];
function appendClass(_class, obj) {
	obj.addClass(_class);
	console.log("Added " + _class + "to object");
}
$(document).ready(function() {
	$(".hatch-face").on("click", function() {
	    $(this).toggleClass("open");
	});
	for (var i = 1; i <= 5; i++) {
		if(i <= 4) {
			$(".anim-2-square-" + i).css("animation-delay", "0." + i + "s");
			$(".anim-3-bar-" + i).css("animation-delay", "0." + (i + 2) + "s");
		}
		$(".anim-1-bar-" + i).css("animation-delay", "0." + i + "s");
	}
});
