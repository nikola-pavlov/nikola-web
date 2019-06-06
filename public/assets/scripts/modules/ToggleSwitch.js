import $ from "jquery";



var toggleBackground = $(".toggle__background");
var toggleSwitch = $(".toggle__switch");
var choiceOne = $(".toggle__choice--off")
var choiceTwo = $(".toggle__choice--on");
var titleChoiceOne = $(".toggle__button__title--one");
var titleChoiceTwo = $(".toggle__button__title--two");

toggleSwitch.removeClass("toggle__switch--is-on");
titleChoiceOne.addClass("toggle__button__title--one--is-on");
titleChoiceTwo.removeClass("toggle__button__title--two--is-on");

$(".skills__designer").addClass("skills__designer--selected");
$(".skills__developer").removeClass("skills__developer--selected");

toggleBackground.click(function(){
	toggleSwitch.toggleClass("toggle__switch--is-on");
	titleChoiceOne.toggleClass("toggle__button__title--one--is-on");
	titleChoiceTwo.toggleClass("toggle__button__title--two--is-on");

	$(".skills__designer").toggleClass("skills__designer--selected");
	$(".skills__developer").toggleClass("skills__developer--selected");
});

choiceOne.click(function(){
	toggleSwitch.removeClass("toggle__switch--is-on");
	titleChoiceOne.addClass("toggle__button__title--one--is-on");
	titleChoiceTwo.removeClass("toggle__button__title--two--is-on");

	$(".skills__designer").addClass("skills__designer--selected");
	$(".skills__developer").removeClass("skills__developer--selected");
});

choiceTwo.click(function(){
	toggleSwitch.addClass("toggle__switch--is-on");
	titleChoiceOne.removeClass("toggle__button__title--one--is-on");
	titleChoiceTwo.addClass("toggle__button__title--two--is-on");

	$(".skills__designer").removeClass("skills__designer--selected");
	$(".skills__developer").addClass("skills__developer--selected");
});