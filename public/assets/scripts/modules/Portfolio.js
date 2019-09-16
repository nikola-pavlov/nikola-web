import $ from "jquery";

var portfolioGridBtn = $(".portfolio__header__grid");
var portfolioListBtn = $(".portfolio__header__list");
var portfolioItem = $(".portfolio__item");

portfolioGridBtn.on( "click", function( event ) {
	// if (event.target !== this)
	// 	return;

	$(portfolioItem).removeClass('portfolio__item--is-list');
	$(portfolioItem).addClass('portfolio__item--is-grid');

	$(portfolioListBtn).removeClass('portfolio__header__list--is-active');
	$(portfolioGridBtn).addClass('portfolio__header__grid--is-active');

	// $(mobileReadyExtraContent).removeClass("mobile-ready__box__extra-content--is-visible");
	// $( event.target ).siblings('.mobile-ready__box__extra-content').addClass( 'mobile-ready__box__extra-content--is-visible' );
	// if ($( mobileReadyExtraContent ).hasClass("mobile-ready__box__extra-content--is-visible")) {
	// 	$( mobileReadyExtraContent ).siblings(".mobile-ready__box__more").text("+");
	// 	$( event.target ).siblings(".mobile-ready__box__more").text("-");
	// }
	
});

portfolioListBtn.on( "click", function( event ) {
	// if (event.target !== this)
	// 	return;

	$(portfolioItem).removeClass('portfolio__item--is-grid');
	$(portfolioItem).addClass('portfolio__item--is-list');

	$(portfolioGridBtn).removeClass('portfolio__header__grid--is-active');
	$(portfolioListBtn).addClass('portfolio__header__list--is-active');
	
});


