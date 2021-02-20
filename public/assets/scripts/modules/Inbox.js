import $ from "jquery";
var messageItem = $(".inbox__messages__item");

messageItem.on( "click", function( event ) {

		$(messageItem).children(".inbox__messages__item__main").removeClass("inbox__messages__item__main--is-visible");
		$(this).children(".inbox__messages__item__main").toggleClass("inbox__messages__item__main--is-visible");

	
});




