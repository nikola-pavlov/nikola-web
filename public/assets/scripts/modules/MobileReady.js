import $ from "jquery";

var mobileReadyMoreButton = $(".mobile-ready__box__more");
var mobileReadyExtraContent = $(".mobile-ready__box__extra-content");
var mobileReadyTitle = $(".mobile-ready__box__title");

mobileReadyTitle.on( "click", function( event ) {
	if (event.target !== this)
		return;

	// $( mobileReadyTitle ).siblings(".mobile-ready__box__extra-content").removeClass( "mobile-ready__box__extra-content--is-visible" );
	// $( event.target ).siblings('.mobile-ready__box__extra-content').addClass( 'mobile-ready__box__extra-content--is-visible' );
		$(mobileReadyExtraContent).removeClass("mobile-ready__box__extra-content--is-visible");

	// $( mobileReadyTitle ).siblings(".mobile-ready__box__extra-content").not($( event.target ).siblings('.mobile-ready__box__extra-content')).removeClass( "mobile-ready__box__extra-content--is-visible" );
	// setTimeout(function(){
		$( event.target ).siblings('.mobile-ready__box__extra-content').addClass( 'mobile-ready__box__extra-content--is-visible' );
		if ($( mobileReadyExtraContent ).hasClass("mobile-ready__box__extra-content--is-visible")) {
			$( mobileReadyExtraContent ).siblings(".mobile-ready__box__more").text("+");
			$( event.target ).siblings(".mobile-ready__box__more").text("-");
		} 

	// }, 270);

	// if ($( event.target ).siblings(".mobile-ready__box__more").text() === "+") {
	// 	$( event.target ).siblings(".mobile-ready__box__more").text("-");
	// } else {
	// 	$( event.target ).siblings(".mobile-ready__box__more").text("+");
	// }

	
});


