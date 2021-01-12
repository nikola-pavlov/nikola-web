import $ from "jquery";

var latestWorkSwitchButton = $(".latest-work__switch-btn");
var latestWorkSwitchButtonIcon = $(".latest-work__switch-btn__icon");
var latestWorkSwitchButton2 = $(".latest-work__switch-btn2");
var latestWorkSwitchButton2Icon = $(".latest-work__switch-btn__icon2");
var latestWorkFrontSide = $(".latest-work__figure");
var latestWorkBackSide = $(".latest-work__back-side");
var latestWorkCaption = $(".latest-work__figure__caption");
var latestWorkContainer = $(".latest-work__figure__container");


// latestWorkSwitchButton.click(function(){
// 	latestWorkBackSide.first().toggleClass("latest-work__back-side--is-visible");
// 	latestWorkFrontSide.first().toggleClass("latest-work__figure--is-visible");
// });

// WHOLE FRONT SIDE ROTATE ON CLICK

latestWorkFrontSide.on( "click", function( event ) {
	if (event.target !== this)
		return;

	$( event.target ).closest( ".latest-work__figure" ).toggleClass( "latest-work__figure--is-visible" );
	$( event.target ).siblings().toggleClass( "latest-work__back-side--is-visible" );
  // event.stopPropagation()
});

// WHOLE BACK SIDE ROTATE ON CLICK

// latestWorkBackSide.on( "click", function( event ) {
// 	if (event.target !== this)
// 		return;

// 	$( event.target ).closest( ".latest-work__back-side" ).toggleClass( "latest-work__back-side--is-visible" );
// 	$( event.target ).siblings().toggleClass( "latest-work__figure--is-visible" );
//   // event.stopPropagation();
// });

// ROTATE SWITCH BUTTONS FOR EACH SIDE

// FRONT SWITCH BUTTON

latestWorkSwitchButton.on( "click", function( event ) {
	if (event.target !== this)
		return;

	// $( event.target ).closest( ".latest-work__back-side" ).toggleClass( "latest-work__back-side--is-visible" );
	$( event.target ).parent().toggleClass( "latest-work__figure--is-visible" );
	$( event.target ).parent().siblings().toggleClass( "latest-work__back-side--is-visible" );
  // event.stopPropagation();
});

// CAPTION SWITCH BUTTON

latestWorkCaption.on( "click", function( event ) {
	if (event.target !== this)
		return;

	// $( event.target ).closest( ".latest-work__back-side" ).toggleClass( "latest-work__back-side--is-visible" );
	$( event.target ).parent().toggleClass( "latest-work__figure--is-visible" );
	$( event.target ).parent().siblings().toggleClass( "latest-work__back-side--is-visible" );
  // event.stopPropagation();
});

// CONTAINER SWITCH BUTTON

latestWorkContainer.on( "click", function( event ) {
	if (event.target !== this)
		return;

	// $( event.target ).closest( ".latest-work__back-side" ).toggleClass( "latest-work__back-side--is-visible" );
	$( event.target ).parent().toggleClass( "latest-work__figure--is-visible" );
	$( event.target ).parent().siblings().toggleClass( "latest-work__back-side--is-visible" );
  // event.stopPropagation();
});


// FRONT SWITCH BUTTON ICON

latestWorkSwitchButtonIcon.on( "click", function( event ) {
	if (event.target !== this)
		return;

	// $( event.target ).closest( ".latest-work__back-side" ).toggleClass( "latest-work__back-side--is-visible" );
	$( event.target ).parent().parent().toggleClass( "latest-work__figure--is-visible" );
	$( event.target ).parent().parent().siblings().toggleClass( "latest-work__back-side--is-visible" );
  // event.stopPropagation();
});

// BACK SWITCH BUTTON

latestWorkSwitchButton2.on( "click", function( event ) {
	if (event.target !== this)
		return;

	// $( event.target ).closest( ".latest-work__back-side" ).toggleClass( "latest-work__back-side--is-visible" );
	$( event.target ).parent().toggleClass( "latest-work__back-side--is-visible" );
	$( event.target ).parent().siblings().toggleClass( "latest-work__figure--is-visible" );
  // event.stopPropagation();
});

// BACK SWITCH BUTTON ICON

latestWorkSwitchButton2Icon.on( "click", function( event ) {
	if (event.target !== this)
		return;

	// $( event.target ).closest( ".latest-work__back-side" ).toggleClass( "latest-work__back-side--is-visible" );
	$( event.target ).parent().parent().toggleClass( "latest-work__back-side--is-visible" );
	$( event.target ).parent().parent().siblings().toggleClass( "latest-work__figure--is-visible" );
  // event.stopPropagation();
});

