import $ from "jquery";

var warningCancelBtn = $(".warning__button--cancel");
var profileDeleteBtn = $(".profile__delete__button");
var warningBox = $(".warning");


profileDeleteBtn.on( "click", function( event ) {

	$(warningBox).addClass('warning--is-visible');
	
});

warningCancelBtn.on( "click", function( event ) {

	$(warningBox).removeClass('warning--is-visible');
	
});