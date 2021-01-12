import $ from "jquery";




var copyClipBtn = $("button#copyButton");
var copyClipBtn2 = $("button#copyButton2");
var copyClipInput = $(".share-link__input");
var copyClipInput2 = $(".share-link__input2");
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
    copyClipInput2.select();

    copyClipPopupMsg.removeClass( 'popup-message--is-visible');
    setTimeout(function(){ 
        copyClipPopupMsg.addClass('popup-message--is-visible');
    }, 
    50);
});

copyClipInput.focus(function(){
    this.select();
});

copyClipInput2.focus(function(){
    this.select();
});