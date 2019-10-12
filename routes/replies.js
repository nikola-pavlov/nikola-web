var express = require("express");
var router = express.Router({mergeParams: true});
var passport = require("passport");
var Project	= require("../models/project");
var Comment	= require("../models/comment");
var Reply	= require("../models/reply");
var middleware	= require("../public/assets/scripts/middleware");

// NEW ROUTE

router.get("/new", function(req, res){
	Project.findById(req.params.id, function(err, project){
		if(err) {
			console.log(err);
		} else {
			Comment.findById(req.params.comment_id, function(err, comment){
				if(err) {
					console.log(err);
				} else {
					res.render("replies/new-reply", {comment: comment, project: project});
				}
			});
		}
	});
});

// CREATE ROUTE

router.post("/", function(req, res){
	Project.findById(req.params.id, function(err, project){
		if(err) {
			console.log(err);
		} else {


			Comment.findById(req.params.comment_id, function(err, comment){
		if(err) {
			console.log(err);
			res.redirect("/portfolio");
		} else {
			Reply.create(req.body.reply, function(err, reply){
				if(err) {
					console.log("SECOND ERROR: " + err);
				} else {
					// Add username and ID to reply
					reply.author.id = req.user._id;
					reply.author.username = req.user.username;
					reply.commentID = comment._id;
					console.log("THIS IS COMMENT ID: " + reply.commentID);
					console.log("THIS IS PROJECT ID: " + project._id);
					// Save reply
					reply.save();
					comment.replies.push(reply);
					comment.save();
					console.log("THIS IS VALID REPLY" + reply);
					req.flash("success", "Your reply has been posted!");
					res.redirect("/portfolio/" + project._id);
				}
			});
		}
	});

		}
	});
});



// router.get("/new", middleware.isLoggedIn, function(req, res){
// 	// find project by id
// 	Project.findById(req.params.id, function(err, project){
// 		if(err || !project) {
// 			req.flash("error", "Project not found.");
// 			res.redirect("/portfolio");
// 		} else {
// 			res.render("replies/new-reply", {project: project});
// 		}
// 	});
// });


module.exports = router;