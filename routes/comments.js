var express = require("express");
var router = express.Router({mergeParams: true});
var passport = require("passport");
var Project	= require("../models/project");
var Comment	= require("../models/comment");
var middleware	= require("../public/assets/scripts/middleware");

// NEW ROUTE

router.get("/new", middleware.isLoggedIn, function(req, res){
	// find project by id
	Project.findById(req.params.id, function(err, project){
		if(err || !project) {
			req.flash("error", "Project not found.");
			res.redirect("/portfolio");
		} else {
			res.render("comments/new-comment", {project: project});
		}
	});
});

// CREATE ROUTE

router.post("/", middleware.isLoggedIn, function(req, res){
	// lookup project using ID
	Project.findById(req.params.id, function(err, project) {
		if(err) {
			console.log(err);
			res.redirect("/portfolio");
		} else {
			Comment.create(req.body.comment, function(err, comment){
				if(err) {
					req.flash("error", "Something went wrong");
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
					req.flash("success", "Your comment has been posted!");
					res.redirect("/portfolio/" + project._id);
				}
			});
		}
	});
});

// EDIT ROUTE

router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
	Project.findById(req.params.id, function(err, foundProject){
		if(err || !foundProject) {
			req.flash("error", "Error: Project not found.");
			return res.redirect("/portfolio");
		}
		Comment.findById(req.params.comment_id, function(err, foundComment){
			if(err) {
				res.redirect("back");
			} else {
				res.render("comments/edit-comment", {project_id: req.params.id, comment: foundComment});
			}
		});
	});
});

// UPDATE ROUTE 

router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if(err) {
			res.redirect("back");
		} else {
			req.flash("success", "Your comment has been edited.");
			res.redirect("/portfolio/" + req.params.id);
		}
	});
});

// DESTROY ROUTE

router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
	// Find by ID and Remove
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err) {
			res.redirect("back");
		} else {
			req.flash("success", "Your comment has been removed.");
			res.redirect("/portfolio/" + req.params.id);
		}
	});
});



module.exports = router;