var express = require("express");
var router = express.Router();
var passport = require("passport");
var Message = require("../models/message");
var middleware = require("../public/assets/scripts/middleware");

router.get("/contact", function (req, res) {
	res.render("messages/contact");
});

router.post("/contact", function (req, res) {
	var firstName = req.body.firstName;
	var lastName = req.body.lastName;
	var email = req.body.email;
	var subject = req.body.subject;
	var message = req.body.message;
	var color = '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
	var newMessage = { firstName: firstName, lastName: lastName, email: email, subject: subject, message: message, color: color };
	console.log(newMessage);
	Message.create(newMessage, function (err, newCreatedMessage) {
		if (err) {
			console.log(err);
		} else {
			console.log(newCreatedMessage);
			res.redirect("/contact");
		}
	});
});

router.get("/inbox", middleware.isLoggedIn, function (req, res) {
	var perPage = 16;
	var pageQuery = parseInt(req.query.page);
	var page = pageQuery ? pageQuery : 1;
	Message.find({}).skip((perPage * page) - perPage).limit(perPage).exec(function (err, allMessages) {
		Message.count({}).exec(function (err, count) {
			if (err) {
				console.log(err);
			} else {
				res.render("messages/inbox", { 
					messages: allMessages,
					current: page,
					pages: Math.ceil(count / perPage)
				});
			}
		});
	});
});





















module.exports = router;