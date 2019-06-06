import $ from "jquery";
import waypoints from "../../../../node_modules/waypoints/lib/noframework.waypoints";

class StickyHeader {
	constructor() {
		this.siteHeader = $(".header-main");
		this.siteTopHeader = $(".nav-top");
		this.siteTopHeaderUl = $(".nav-top ul");
		this.headerTriggerElement = $(".hero__title");
		this.languageNavSubMenu = $(".nav-sub");
		this.createHeaderWaypoint();
		this.createTopHeaderWaypoint();
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

	createTopHeaderWaypoint() {
		var that = this;
		new Waypoint({
			element: this.headerTriggerElement[0],
			handler: function(direction) {
				if (direction == "down") {
					that.siteTopHeader.addClass("nav-top--invisible");
					that.siteTopHeaderUl.addClass("nav-top-ul--invisible");
					that.languageNavSubMenu.removeClass("nav-sub--is-visible");
				} else {
					that.siteTopHeader.removeClass("nav-top--invisible");
					that.siteTopHeaderUl.removeClass("nav-top-ul--invisible");
				}
			}
		});
	}

}

export default StickyHeader;