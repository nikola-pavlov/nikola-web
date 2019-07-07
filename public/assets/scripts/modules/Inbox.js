import $ from "jquery";

var messageViewMoreButton = $(".inbox__message__view-more");
var messageOpenMessage = $(".inbox__open-message");
var messageOpenMessageIsVisible = $(".inbox__open-message--is-visible");

messageViewMoreButton.on( "click", function( event ) {
	if (event.target !== this)
		return;

	// messageOpenMessage.toggleClass("inbox--is-visible");
	// alert("test");
	// $( event.target ).parent().toggleClass( "latest-work__figure--is-visible" );
	$( event.target ).parent().siblings(".inbox__open-message").removeClass( "inbox__open-message--is-visible" );
	$( event.target ).parent().next(".inbox__open-message").addClass( "inbox__open-message--is-visible" );
	// $( event.target ).parent().addClass( "inbox__open-message--is-read" );
});

// alert("test");

