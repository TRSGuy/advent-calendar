var hatches = [
	{
		"hatch-content": {
			"animation": {
				"objects": [[4, "ball"]]
			}
		}
	}, {
		"hatch-content": {
			"animation": {
				"delay": 0.1,
				"objects": [[5, "bar"]]
			}
		}
	}, {
		"hatch-content": {
			"animation": {
				"delay": 0.1,
				"objects": [[4, "square"]]
			}
		}
	}, {
		"hatch-content": {
			"animation": {
				"delay": 0.1,
				"objects": [[4, "bar"]]
			}
		}
	}
];
var hatchElements = [];
$(document).ready(function() {
	for (var hatchIter = 0; hatchIter < hatches.length; hatchIter++) { // For each hatch
		var hatch = hatches[hatchIter];
		var hatchElement = $("<div/>").addClass("hatch col-3");
		hatchElement.append($("<div/>").addClass("hatch-face").text(hatchIter + 1));
		hatchElement.append($("<div/>").addClass("hatch-content"));
		if(hatch["hatch-content"]["animation"]) { // It is an animation
			var animationContainer = $("<div/>").addClass("animation-container");
			var animation = hatch["hatch-content"]["animation"];
			for (var objectTypeIter = 0; objectTypeIter < animation["objects"].length; objectTypeIter++) { // For each type of object in animation
				for (var objectCountIter = 0; objectCountIter < animation["objects"][objectTypeIter][0]; objectCountIter++) { // For each object of that type
					var animationElementClass = "anim-obj " + "anim-" + hatchIter + "-" + animation["objects"][objectTypeIter][1] + "-" + objectCountIter;
					var animationElement = $("<div/>").addClass(animationElementClass).css("animation-delay", animation["delay"] * objectCountIter+"s");
					animationContainer.append(animationElement);
					hatchElement.children().eq(1).append(animationContainer);
				}
			}
		}
		$("#hatches-container").append(hatchElement);
	}
	$(".hatch-face").on("click", function() {
	    $(this).toggleClass("open");
	});
});
