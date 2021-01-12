var express = require("express");
var router = express.Router();
var passport = require("passport");
var Message = require("../models/message");
var middleware	= require("../public/assets/scripts/middleware");

router.get("/contact", function(req, res){
	res.render("messages/contact");
});

router.post("/contact", function(req, res){
	var firstName = req.body.firstName;
	var lastName = req.body.lastName;
	var email = req.body.email;
	var subject = req.body.subject;
	var message = req.body.message;
	var newMessage = {firstName: firstName, lastName: lastName, email: email, subject: subject, message: message};
	console.log(newMessage);
	Message.create(newMessage, function(err, newCreatedMessage){
		if(err) {
			console.log(err);
		} else {
			console.log(newCreatedMessage);
			res.redirect("/contact");
		}
	});
});

router.get("/inbox", middleware.isLoggedIn, function(req, res){
	Message.find({}, function(err, allMessages){
		if(err) {
			console.log(err);
		} else {
			res.render("messages/inbox", {messages: allMessages});
		}
	});
});

module.exports = router;