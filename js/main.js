function appendClass(_class, obj) {
	obj.addClass(_class);
	console.log("Added " + _class + "to object");
}
$(document).ready(function() {
	$(".hatch-label").on("click", function() {
	    $(this).toggleClass("open");
	});
	for (var i = 1; i <= 5; i++) {
		if(i <= 4) {
			$(".anim-3-square-" + i).css("animation-delay", "0." + i + "s");
		}
		$(".anim-2-bar-" + i).css("animation-delay", "0." + i + "s");
	}
});
