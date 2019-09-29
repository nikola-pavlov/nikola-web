import $ from "jquery";

var flashErrorCloseBtn = $(".flash-message-error__error__close");
var flashError = $(".flash-message-error");

var flashSuccessCloseBtn = $(".flash-message-success__success__close");
var flashSuccess = $(".flash-message-success");


flashErrorCloseBtn.on( "click", function( event ) {

	$(flashError).addClass('flash-message-error--is-closed');
	
});

flashSuccessCloseBtn.on( "click", function( event ) {

	$(flashSuccess).addClass('flash-message-success--is-closed');
	
});


