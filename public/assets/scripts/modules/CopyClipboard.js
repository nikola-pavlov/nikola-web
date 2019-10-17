import $ from "jquery";




var copyClipBtn = $("button#copyButton");
var copyClipBtn2 = $("button#copyButton2");
var copyClipInput = $(".share-link__input");
var copyClipPopupMsg = $(".popup-message");


copyClipBtn.on( "click", function( event ) {

    var copyText = document.getElementById("copyClipInput");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");

    copyClipInput.select();

    copyClipPopupMsg.removeClass( 'popup-message--is-visible');
    setTimeout(function(){ 
        copyClipPopupMsg.addClass('popup-message--is-visible');
    }, 
    50);
});

copyClipBtn2.on( "click", function( event ) {
    copyClipInput.select();

    copyClipPopupMsg.removeClass( 'popup-message--is-visible');
    setTimeout(function(){ 
        copyClipPopupMsg.addClass('popup-message--is-visible');
    }, 
    50);
});

$(".share-link__input").focus(function(){
    this.select();
});