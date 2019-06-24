import $ from "jquery";

// why it doesn't work on firefox?
var card = $(".business-card");

$(document).on("mousemove",function(e) {  
  var ax = -($(window).innerWidth() / 2 - e.pageX) / 20;
  var ay = ($(window).innerHeight() / 1.12 - e.pageY) / 20;
  card.attr("style", "transform: rotateY("+ax+"deg) rotateX("+ay+"deg);-webkit-transform: rotateY("+ax+"deg) rotateX("+ay+"deg);-moz-transform: rotateY("+ax+"deg) rotateX("+ay+"deg)");
});