import $ from "jquery";

var showRepliesBtn = $(".reply__show");
var reply = $(".reply");

showRepliesBtn.on( "click", function( event ) {

	if (event.target !== this)
		return;
	$( event.target ).parent().siblings(reply).toggleClass( "reply--is-visible" );

	if ($( reply ).hasClass("reply--is-visible")) {
			$( event.target ).text("Hide Replies");
		} else {
			$( event.target ).text("Show Replies");
		}
});