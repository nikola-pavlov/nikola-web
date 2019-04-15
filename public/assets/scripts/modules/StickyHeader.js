import $ from "jquery";
import waypoints from "../../../../node_modules/waypoints/lib/noframework.waypoints";

class StickyHeader {
	constructor() {
		this.siteHeader = $(".header-main");
		this.headerTriggerElement = $(".hero__title");
		this.createHeaderWaypoint();
	}

	createHeaderWaypoint() {
		var that = this;
		new Waypoint({
			element: this.headerTriggerElement[0],
			handler: function(direction) {
				if (direction == "down") {
					that.siteHeader.addClass("header-main--opacity");
				} else {
					that.siteHeader.removeClass("header-main--opacity");
				}
			}
		});
	}
}

export default StickyHeader;