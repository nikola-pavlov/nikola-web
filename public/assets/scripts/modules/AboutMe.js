import $ from "jquery";

var designerSection = $(".aboutme__designer");
var designerImg = $(".aboutme__designer__img");
var designerTitle = $(".aboutme__designer__title");
var designerDesc = $(".aboutme__designer__description");
var designerBtn = $(".aboutme__designer__expand-btn");
var designerBtnIcon = $(".aboutme__designer__expand-btn__icon");

var developerSection = $(".aboutme__developer");
var developerImg = $(".aboutme__developer__img");
var developerTitle = $(".aboutme__developer__title");
var developerDesc = $(".aboutme__developer__description");
var developerBtn = $(".aboutme__developer__expand-btn");
var developerBtnIcon = $(".aboutme__developer__expand-btn__icon");


// designerSection.on( "click", function( event ) {
// 	// if (event.target !== this)
// 	// 	return;

// 	$( event.target ).addClass( 'aboutme__designer--is-expanded' );


// 	// alert("test");
	
// });

designerSection.click(function(){

	designerSection.toggleClass( 'aboutme__designer--is-expanded' );
	developerSection.css({"z-index": "0"});
	developerTitle.css({"z-index": "0"});
	developerBtn.css({"z-index": "0"});
	designerSection.css({"z-index": "1"});
	designerTitle.css({"z-index": "1"});
	designerBtn.css({"z-index": "1"});

	designerImg.toggleClass( 'aboutme__designer__img--is-expanded');
	designerTitle.toggleClass( 'aboutme__designer__title--is-expanded');
	designerDesc.toggleClass( 'aboutme__designer__description--is-expanded');
	designerBtn.toggleClass( 'aboutme__designer__expand-btn--is-expanded');
	designerBtnIcon.toggleClass( 'aboutme__designer__expand-btn__icon--is-expanded');
});

designerTitle.click(function(){

	designerSection.toggleClass( 'aboutme__designer--is-expanded' );
	developerSection.css({"z-index": "0"});
	developerTitle.css({"z-index": "0"});
	developerBtn.css({"z-index": "0"});
	designerSection.css({"z-index": "1"});
	designerTitle.css({"z-index": "1"});
	designerBtn.css({"z-index": "1"});

	designerImg.toggleClass( 'aboutme__designer__img--is-expanded');
	designerTitle.toggleClass( 'aboutme__designer__title--is-expanded');
	designerDesc.toggleClass( 'aboutme__designer__description--is-expanded');
	designerBtn.toggleClass( 'aboutme__designer__expand-btn--is-expanded');
	designerBtnIcon.toggleClass( 'aboutme__designer__expand-btn__icon--is-expanded');
});

designerDesc.click(function(){

	designerSection.toggleClass( 'aboutme__designer--is-expanded' );
	developerSection.css({"z-index": "0"});
	developerTitle.css({"z-index": "0"});
	developerBtn.css({"z-index": "0"});
	designerSection.css({"z-index": "1"});
	designerTitle.css({"z-index": "1"});
	designerBtn.css({"z-index": "1"});

	designerImg.toggleClass( 'aboutme__designer__img--is-expanded');
	designerTitle.toggleClass( 'aboutme__designer__title--is-expanded');
	designerDesc.toggleClass( 'aboutme__designer__description--is-expanded');
	designerBtn.toggleClass( 'aboutme__designer__expand-btn--is-expanded');
	designerBtnIcon.toggleClass( 'aboutme__designer__expand-btn__icon--is-expanded');
});

designerBtn.click(function(){

	designerSection.toggleClass( 'aboutme__designer--is-expanded' );
	developerSection.css({"z-index": "0"});
	developerTitle.css({"z-index": "0"});
	developerBtn.css({"z-index": "0"});
	designerSection.css({"z-index": "1"});
	designerTitle.css({"z-index": "1"});
	designerBtn.css({"z-index": "1"});

	designerImg.toggleClass( 'aboutme__designer__img--is-expanded');
	designerTitle.toggleClass( 'aboutme__designer__title--is-expanded');
	designerDesc.toggleClass( 'aboutme__designer__description--is-expanded');
	designerBtn.toggleClass( 'aboutme__designer__expand-btn--is-expanded');
	designerBtnIcon.toggleClass( 'aboutme__designer__expand-btn__icon--is-expanded');
});















developerSection.click(function(){

	developerSection.toggleClass( 'aboutme__developer--is-expanded' );
	designerSection.css({"z-index": "0"});
	designerTitle.css({"z-index": "0"});
	designerBtn.css({"z-index": "0"});
	developerSection.css({"z-index": "1"});
	developerTitle.css({"z-index": "1"});
	developerBtn.css({"z-index": "1"});


	developerImg.toggleClass( 'aboutme__developer__img--is-expanded');
	developerTitle.toggleClass( 'aboutme__developer__title--is-expanded');
	developerDesc.toggleClass( 'aboutme__developer__description--is-expanded');
	developerBtn.toggleClass( 'aboutme__developer__expand-btn--is-expanded');
	developerBtnIcon.toggleClass( 'aboutme__developer__expand-btn__icon--is-expanded');
});

developerTitle.click(function(){

	developerSection.toggleClass( 'aboutme__developer--is-expanded' );
	designerSection.css({"z-index": "0"});
	designerTitle.css({"z-index": "0"});
	designerBtn.css({"z-index": "0"});
	developerSection.css({"z-index": "1"});
	developerTitle.css({"z-index": "1"});
	developerBtn.css({"z-index": "1"});

	developerImg.toggleClass( 'aboutme__developer__img--is-expanded');
	developerTitle.toggleClass( 'aboutme__developer__title--is-expanded');
	developerDesc.toggleClass( 'aboutme__developer__description--is-expanded');
	developerBtn.toggleClass( 'aboutme__developer__expand-btn--is-expanded');
	developerBtnIcon.toggleClass( 'aboutme__developer__expand-btn__icon--is-expanded');
});

developerDesc.click(function(){

	developerSection.toggleClass( 'aboutme__developer--is-expanded' );
	designerSection.css({"z-index": "0"});
	designerTitle.css({"z-index": "0"});
	designerBtn.css({"z-index": "0"});
	developerSection.css({"z-index": "1"});
	developerTitle.css({"z-index": "1"});
	developerBtn.css({"z-index": "1"});

	developerImg.toggleClass( 'aboutme__developer__img--is-expanded');
	developerTitle.toggleClass( 'aboutme__developer__title--is-expanded');
	developerDesc.toggleClass( 'aboutme__developer__description--is-expanded');
	developerBtn.toggleClass( 'aboutme__developer__expand-btn--is-expanded');
	developerBtnIcon.toggleClass( 'aboutme__developer__expand-btn__icon--is-expanded');
});

developerBtn.click(function(){

	developerSection.toggleClass( 'aboutme__developer--is-expanded' );
	designerSection.css({"z-index": "0"});
	designerTitle.css({"z-index": "0"});
	designerBtn.css({"z-index": "0"});
	developerSection.css({"z-index": "1"});
	developerTitle.css({"z-index": "1"});
	developerBtn.css({"z-index": "1"});

	developerImg.toggleClass( 'aboutme__developer__img--is-expanded');
	developerTitle.toggleClass( 'aboutme__developer__title--is-expanded');
	developerDesc.toggleClass( 'aboutme__developer__description--is-expanded');
	developerBtn.toggleClass( 'aboutme__developer__expand-btn--is-expanded');
	developerBtnIcon.toggleClass( 'aboutme__developer__expand-btn__icon--is-expanded');
});




