import $ from "jquery";

$(".logo-designer__btn-reload").click(function(){
	$(".logo-design").addClass("logo-design--scale-up");
	$(".logo-design").load(" .logo-design");
	$(".logo-designer__btn-reload").addClass( "logo-designer__btn-reload--hidden" );
	showReloadButton();
});


function showReloadButton() {
	setTimeout(function(){ 

		$(".logo-designer__btn-reload").removeClass( "logo-designer__btn-reload--hidden" ); 
	
	}, 
	8500);
}