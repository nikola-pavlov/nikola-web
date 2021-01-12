import $ from "jquery";

var languageMenuItem = $(".nav-top__item__language");
var languageNavSubMenu = $(".nav-sub");


languageMenuItem.click(function(e){


	// clicking on children elements doesnt trigger the event
	if (e.target !== this)
    return;

	languageNavSubMenu.toggleClass("nav-sub--is-visible");
});