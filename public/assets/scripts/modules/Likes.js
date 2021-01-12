import $ from "jquery";

var likesDetail = $(".project__main__counter__details");
var likesPopup = $(".likes__popup");
var likesPopupCloseBtn = $(".likes__popup__header__close");


likesDetail.on( "click", function( event ) {

	$(likesPopup).addClass('likes__popup--is-visible');
	
});

likesPopupCloseBtn.on( "click", function( event ) {

	$(likesPopup).removeClass('likes__popup--is-visible');
	
});