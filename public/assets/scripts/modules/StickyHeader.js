import $ from "jquery";
import waypoints from "../../../../node_modules/waypoints/lib/noframework.waypoints";
import smoothScroll from "jquery-smooth-scroll";

class StickyHeader {
	constructor() {
		this.siteHeader = $(".header-main");
		this.siteTopHeader = $(".nav-top");
		this.siteTopHeaderUl = $(".nav-top ul");
		this.headerTriggerElement = $(".trigger");
		this.languageNavSubMenu = $(".nav-sub");
		this.contactButton = $(".contact__button");
		this.backToTopButton = $(".back-to-top__container");
		this.createHeaderWaypoint();
		this.createTopHeaderWaypoint();
		this.createContactButtonWaypoint();
		this.createBackToTopWaypoint();
		this.pageSections = $(".section");
		this.headerLinks = $(".nav-primary a");
		this.topPageLink = $(".back-to-top__link");
		this.createPageSectionWaypoints();
		this.addSmoothScrolling();
	}

	addSmoothScrolling() {
		this.headerLinks.smoothScroll();
		this.topPageLink.smoothScroll();
	}

	createContactButtonWaypoint() {
		var that = this;
		new Waypoint({
			element: this.headerTriggerElement[0],
			handler: function(direction) {
				if (direction == "down") {
					that.contactButton.addClass("contact__button--visible");
				} else {
					that.contactButton.removeClass("contact__button--visible");
				}
			}
		});
	}

	createBackToTopWaypoint() {
		var that = this;
		new Waypoint({
			element: this.headerTriggerElement[0],
			handler: function(direction) {
				if (direction == "down") {
					that.backToTopButton.addClass("back-to-top__container--visible");
				} else {
					that.backToTopButton.removeClass("back-to-top__container--visible");
				}
			}
		});
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

	createPageSectionWaypoints() {
		var that = this;
		this.pageSections.each(function(){
			var currentPageSection = this;
			new Waypoint({
				element: currentPageSection,
				handler: function(direction) {
					if (direction == "down") {
						var matchingHeaderLink = currentPageSection.getAttribute("data-matching-link");
						that.headerLinks.removeClass("is-current-link");
						$(matchingHeaderLink).addClass("is-current-link");
					}
					
				},
				offset: "20%"
			});

			new Waypoint({
				element: currentPageSection,
				handler: function(direction) {
					if (direction == "up") {
						var matchingHeaderLink = currentPageSection.getAttribute("data-matching-link");
						that.headerLinks.removeClass("is-current-link");
						$(matchingHeaderLink).addClass("is-current-link");
					}
					
				},
				offset: "-40%"
			});
		});
	}
}

export default StickyHeader;