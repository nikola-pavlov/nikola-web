import $ from "jquery";

class MobileMenu {
	constructor() {
		this.siteHeader = $(".header-main");
		this.menuIcon = $(".header-main__menu-icon");
		this.menuContent = $(".header-main__menu-content");
		this.events();
	}

	events() {
		this.menuIcon.click(this.toggleTheMenu.bind(this));
	}

	toggleTheMenu() {
		this.menuContent.toggleClass("header-main__menu-content--is-visible");
		this.siteHeader.toggleClass("header-main--is-expanded");
	}
}

export default MobileMenu;