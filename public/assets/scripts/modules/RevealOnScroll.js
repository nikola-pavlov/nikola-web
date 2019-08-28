import $ from "jquery";
import waypoints from "../../../../node_modules/waypoints/lib/noframework.waypoints";

class RevealOnScroll {
	constructor(els, offset, addedclass, hiddenclass) {
		this.itemsToReveal = els;
		this.offsetPercentage = offset;
		this.classToAdd = addedclass;
		this.classToHide = hiddenclass;
		this.hideInitially();
		this.createWaypoints();
	}

	hideInitially() {
		var that = this;
		this.itemsToReveal.addClass(that.classToHide);
	}

	createWaypoints() {
		var that = this;
		this.itemsToReveal.each(function() {
			var currentItem = this;
			new Waypoint({
				element: currentItem,
				handler: function() {
					$(currentItem).addClass(that.classToAdd);
				},
				offset: that.offsetPercentage
			});
		});
	}
}

export default RevealOnScroll;