import $ from "jquery";

var filterCloseBtn = $(".portfolio__nav__filter__header");
var filterGroup = $(".portfolio__nav__group");
var filterCloseIcon = $(".portfolio__nav__filter__icon");
var filterCloseTitle = $(".portfolio__nav__filter__title");


filterCloseBtn.on( "click", function( event ) {

	if (event.target !== this)
		return;

	$( event.target ).siblings().toggleClass( "portfolio__nav__group--is-closed" );
	$( event.target ).children(".portfolio__nav__filter__icon").toggleClass("portfolio__nav__filter__icon--is-closed")
	
});

filterCloseIcon.on( "click", function( event ) {

	if (event.target !== this)
		return;

	$( event.target ).parent().siblings().toggleClass( "portfolio__nav__group--is-closed" );
	$( event.target ).toggleClass("portfolio__nav__filter__icon--is-closed")
	
});

filterCloseTitle.on( "click", function( event ) {

	if (event.target !== this)
		return;

	$( event.target ).parent().siblings().toggleClass( "portfolio__nav__group--is-closed" );
	$( event.target ).siblings().toggleClass("portfolio__nav__filter__icon--is-closed")
	
});