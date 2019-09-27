var express = require("express");
var router = express.Router({mergeParams: true});
var passport = require("passport");
var Project	= require("../models/project");
var Comment	= require("../models/comment");

// ============
// COMMENTS ROUTES
// ============

// Comments New

router.get("/new", isLoggedIn, function(req, res){
	// find project by id
	Project.findById(req.params.id, function(err, project){
		if(err) {
			console.log(err);
		} else {
			res.render("comments/new-comment", {project: project});
		}
	});
});

// Comments Create

router.post("/", isLoggedIn, function(req, res){
	// lookup project using ID
	Project.findById(req.params.id, function(err, project) {
		if(err) {
			console.log(err);
			res.redirect("/portfolio");
		} else {
			Comment.create(req.body.comment, function(err, comment){
				if(err) {
					console.log(err);
				} else {
					// Add username and ID to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					// Save comment
					comment.save();
					project.comments.push(comment);
					project.save();
					console.log(comment);
					res.redirect("/portfolio/" + project._id);
				}
			});
		}
	});
});

// Middleware

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

module.exports = router;